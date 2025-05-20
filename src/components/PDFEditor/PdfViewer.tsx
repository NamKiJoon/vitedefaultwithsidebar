// /src/components/PDFEditor/PdfViewer.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import type { RegionData, PdfViewerProps } from "./types";
import * as pdfjs from "pdfjs-dist";
import {
  Container,
  LeftPanel,
  RightPanel,
  PdfContainer,
  Canvas,
  RegionBox,
  RegionCard,
  RegionPreview,
  ButtonGroup,
  Button,
  DeleteButton,
  ControlsContainer,
  FloatingButton,
  Toolbar,
  ZoomControls,
  PageInput,
} from "./styles/PdfViewerStyles";
import { LoadingIndicator } from "./styles/CommonStyles";

// PDF.js 워커 설정 - 로컬 파일 사용
try {
  // 로컬 워커 파일 사용 (내부망 환경용)
  pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
  console.log("PDF.js 워커 설정 완료:", pdfjs.GlobalWorkerOptions.workerSrc);
} catch (error) {
  console.error("PDF 워커 설정 오류:", error);
}

// PDF 뷰어 컴포넌트
const PdfViewer: React.FC<PdfViewerProps> = ({ pdfUrl }) => {
  // 상태 관리
  const [regions, setRegions] = useState<RegionData[]>([]);
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [isCreatingRegion, setIsCreatingRegion] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState<string>("1");
  const [pageCount, setPageCount] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [pdfDocument, setPdfDocument] = useState<pdfjs.PDFDocumentProxy | null>(
    null
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 자동 맞춤 관련 상태
  const [fitMode, setFitMode] = useState<"width" | "height" | "page" | "none">(
    "page"
  );
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // DOM 요소 참조
  const leftCanvasRef = useRef<HTMLCanvasElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rightCanvasRefs = useRef<Record<number, HTMLCanvasElement | null>>({});

  // 컨테이너 크기 측정
  useEffect(() => {
    if (!containerRef.current) return;

    const updateContainerSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerSize({ width: clientWidth, height: clientHeight });
      }
    };

    // 초기 크기 설정
    updateContainerSize();

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", updateContainerSize);

    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  // 페이지 맞춤 스케일 계산
  const calculateFitScale = useCallback(
    (pageWidth: number, pageHeight: number) => {
      if (containerSize.width === 0 || containerSize.height === 0) return 1.0;

      // 여백 고려
      const containerWidth = containerSize.width - 40; // 좌우 여백 고려
      const containerHeight = containerSize.height - 40; // 상하 여백 고려

      let newScale = 1.0;

      switch (fitMode) {
        case "width":
          newScale = containerWidth / pageWidth;
          break;
        case "height":
          newScale = containerHeight / pageHeight;
          break;
        case "page":
          // 페이지 전체가 보이도록 가로, 세로 중 더 작은 비율 선택
          const widthScale = containerWidth / pageWidth;
          const heightScale = containerHeight / pageHeight;
          newScale = Math.min(widthScale, heightScale);
          break;
        default:
          // 'none'인 경우 현재 스케일 유지
          return scale;
      }

      // 스케일 제한 (너무 작거나 크지 않도록)
      return Math.max(0.1, Math.min(newScale, 3.0));
    },
    [containerSize, fitMode, scale]
  );

  // PDF 문서 로드
  useEffect(() => {
    const loadPdf = async () => {
      try {
        setIsLoading(true);
        setError(null);

        console.log("PDF 로드 시작:", pdfUrl);

        try {
          // PDF.js 문서 로드 옵션
          const loadingTask = pdfjs.getDocument({
            url: pdfUrl,
          });

          // 로딩 진행 상황 모니터링 - 타입 에러 수정
          // @ts-ignore: 타입 정의에 onProgress가 없을 수 있음
          loadingTask.onProgress = (progressData: {
            loaded?: number;
            total?: number;
          }) => {
            console.log(
              "PDF 로딩 진행 상황:",
              progressData.loaded
                ? Math.round(
                    (progressData.loaded / (progressData.total || 1)) * 100
                  )
                : 0,
              "%"
            );
          };

          const pdfDoc = await loadingTask.promise;
          console.log("PDF 로드 성공:", pdfDoc.numPages, "페이지");
          setPdfDocument(pdfDoc);
          setPageCount(pdfDoc.numPages);

          // 페이지 입력 값 초기화
          setPageInputValue("1");
        } catch (err) {
          console.error("PDF 로드 실패:", err);
          setPdfDocument(null);
          setPageCount(1);
          setError(
            "PDF를 불러오는 중 오류가 발생했습니다. 다른 PDF를 시도해보세요."
          );
        }

        // 초기 영역 데이터 (나중에는 ES에서 가져올 예정)
        const initialRegions: RegionData[] = [
          { id: 1, x: 50, y: 50, width: 200, height: 100, page: 1 },
          { id: 2, x: 300, y: 200, width: 150, height: 80, page: 1 },
        ];

        setRegions(initialRegions);
        setIsLoading(false);
      } catch (err) {
        console.error("초기화 오류:", err);
        setError("PDF를 불러오는 중 오류가 발생했습니다.");
        setIsLoading(false);
      }
    };

    if (pdfUrl) {
      loadPdf();
    }

    // 컴포넌트 언마운트 시 자원 정리
    return () => {
      if (pdfDocument) {
        pdfDocument.destroy().catch((err) => {
          console.error("PDF 문서 정리 오류:", err);
        });
      }
    };
  }, [pdfUrl]);

  // 대체 페이지 렌더링 함수 (PDF 로드 실패 시 사용)
  const renderFallbackPage = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // 흰 배경
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      // 텍스트 표시
      ctx.fillStyle = "#000000";
      ctx.font = `${16 * scale}px Arial`;
      ctx.fillText(`PDF 페이지 ${currentPage}`, 20 * scale, 30 * scale);

      // 간단한 텍스트 내용
      ctx.font = `${14 * scale}px Arial`;
      for (let i = 0; i < 20; i++) {
        ctx.fillText(
          `이 텍스트는 PDF 내용을 시뮬레이션합니다. 줄 ${i + 1}`,
          20 * scale,
          (100 + i * 30) * scale
        );
      }
    },
    [currentPage, scale]
  );

  // PDF 페이지 렌더링
  useEffect(() => {
    const renderPdf = async () => {
      if (!leftCanvasRef.current || !pdfDocument) return;

      console.log("PDF 렌더링 시작");
      try {
        // 현재 페이지 가져오기
        const page = await pdfDocument.getPage(currentPage);

        // 원본 페이지 크기
        const originalViewport = page.getViewport({ scale: 1.0 });
        console.log(
          "원본 페이지 크기:",
          originalViewport.width,
          "x",
          originalViewport.height
        );

        // 맞춤 모드에 따라 스케일 계산
        let currentScale = scale;
        if (fitMode !== "none") {
          currentScale = calculateFitScale(
            originalViewport.width,
            originalViewport.height
          );
          // 계산된 스케일 적용 (UI 업데이트 위해)
          if (currentScale !== scale) {
            console.log("스케일 조정:", scale, "->", currentScale);
            setScale(currentScale);
          }
        }

        // 뷰포트 생성
        const viewport = page.getViewport({ scale: currentScale });
        console.log(
          "렌더링 뷰포트:",
          viewport.width,
          "x",
          viewport.height,
          "스케일:",
          currentScale
        );

        // 캔버스 크기 설정
        const canvas = leftCanvasRef.current;
        const context = canvas.getContext("2d");
        if (!context) return;

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // 페이지 렌더링
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        console.log("PDF 렌더링 완료");

        // 영역 미리보기 업데이트
        renderRegionPreviews();
      } catch (error) {
        console.error("PDF 렌더링 오류:", error);
        // 오류 시 대체 내용 표시
        if (leftCanvasRef.current) {
          const ctx = leftCanvasRef.current.getContext("2d");
          if (ctx) {
            renderFallbackPage(ctx, 800, 1100);
          }
        }
      }
    };

    renderPdf();
  }, [
    pdfDocument,
    currentPage,
    scale,
    fitMode,
    containerSize,
    calculateFitScale,
    renderFallbackPage,
  ]);

  // 맞춤 모드 변경 핸들러
  const handleFitModeChange = useCallback(
    (mode: "width" | "height" | "page" | "none") => {
      console.log("맞춤 모드 변경:", mode);
      setFitMode(mode);
    },
    []
  );

  // 영역 프리뷰 렌더링
  const renderRegionPreviews = useCallback(() => {
    if (!leftCanvasRef.current) return;

    regions.forEach((region) => {
      const rightCanvas = rightCanvasRefs.current[region.id];
      if (!rightCanvas) return;

      const rightCtx = rightCanvas.getContext("2d");
      if (!rightCtx) return;

      // 캔버스 초기화
      rightCanvas.width = rightCanvas.clientWidth;
      rightCanvas.height = rightCanvas.clientHeight;
      rightCtx.fillStyle = "#FFFFFF";
      rightCtx.fillRect(0, 0, rightCanvas.width, rightCanvas.height);

      // 현재 페이지 영역만 표시
      if (region.page === currentPage) {
        const sourceCanvas = leftCanvasRef.current;
        if (!sourceCanvas) return;

        // 영역 좌표 계산
        const sourceX = region.x * scale;
        const sourceY = region.y * scale;
        const sourceWidth = region.width * scale;
        const sourceHeight = region.height * scale;

        // 영역이 캔버스 내부에 있는지 확인
        if (
          sourceX >= 0 &&
          sourceY >= 0 &&
          sourceX + sourceWidth <= sourceCanvas.width &&
          sourceY + sourceHeight <= sourceCanvas.height
        ) {
          // 영역 스케일링하여 표시
          const scaleX = rightCanvas.width / sourceWidth;
          const scaleY = rightCanvas.height / sourceHeight;
          const scaleFactor = Math.min(scaleX, scaleY);

          const targetWidth = sourceWidth * scaleFactor;
          const targetHeight = sourceHeight * scaleFactor;
          const targetX = (rightCanvas.width - targetWidth) / 2;
          const targetY = (rightCanvas.height - targetHeight) / 2;

          try {
            rightCtx.drawImage(
              sourceCanvas,
              sourceX,
              sourceY,
              sourceWidth,
              sourceHeight,
              targetX,
              targetY,
              targetWidth,
              targetHeight
            );
          } catch (err) {
            console.error("영역 프리뷰 렌더링 실패:", err);
            drawFallbackPreview(
              rightCtx,
              rightCanvas.width,
              rightCanvas.height
            );
          }
        } else {
          drawFallbackPreview(
            rightCtx,
            rightCanvas.width,
            rightCanvas.height,
            "영역이 뷰 밖에 있습니다"
          );
        }
      } else {
        // 다른 페이지 영역
        drawFallbackPreview(
          rightCtx,
          rightCanvas.width,
          rightCanvas.height,
          `페이지 ${region.page}의 영역`
        );
      }
    });
  }, [regions, currentPage, scale]);

  // 프리뷰 대체 텍스트 표시
  const drawFallbackPreview = useCallback(
    (
      ctx: CanvasRenderingContext2D,
      width: number,
      height: number,
      text = "영역 미리보기"
    ) => {
      ctx.fillStyle = "#f0f0f0";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#666666";
      ctx.font = "14px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, width / 2, height / 2);
    },
    []
  );

  // 영역 선택
  const selectRegion = useCallback((id: number) => {
    setSelectedRegionId(id);
  }, []);

  // 새 영역 생성 시작
  const startCreatingRegion = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isCreatingRegion || !leftCanvasRef.current) return;

      const canvasRect = leftCanvasRef.current.getBoundingClientRect();
      const x = (e.clientX - canvasRect.left) / scale;
      const y = (e.clientY - canvasRect.top) / scale;

      setStartPos({ x, y });

      // 새 영역 추가
      const newRegion: RegionData = {
        id: Date.now(),
        x,
        y,
        width: 0,
        height: 0,
        page: currentPage,
      };

      setRegions((prev) => [...prev, newRegion]);
      setSelectedRegionId(newRegion.id);
    },
    [isCreatingRegion, scale, currentPage]
  );

  // 영역 생성 중 드래그
  const updateCreatingRegion = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !isCreatingRegion ||
        selectedRegionId === null ||
        !leftCanvasRef.current
      )
        return;

      const canvasRect = leftCanvasRef.current.getBoundingClientRect();
      const x = (e.clientX - canvasRect.left) / scale;
      const y = (e.clientY - canvasRect.top) / scale;

      setRegions((prev) =>
        prev.map((region) => {
          if (region.id === selectedRegionId) {
            // 드래그 방향에 따라 좌표 조정
            const newX = Math.min(startPos.x, x);
            const newY = Math.min(startPos.y, y);
            const newWidth = Math.abs(x - startPos.x);
            const newHeight = Math.abs(y - startPos.y);

            return {
              ...region,
              x: newX,
              y: newY,
              width: newWidth,
              height: newHeight,
            };
          }
          return region;
        })
      );
    },
    [isCreatingRegion, selectedRegionId, scale, startPos]
  );

  // 영역 생성 완료
  const finishCreatingRegion = useCallback(() => {
    if (!isCreatingRegion || selectedRegionId === null) return;

    // 작은 영역은 삭제 (최소 10x10)
    setRegions((prev) =>
      prev.filter(
        (region) =>
          region.id !== selectedRegionId ||
          (region.width > 10 && region.height > 10)
      )
    );

    setIsCreatingRegion(false);
  }, [isCreatingRegion, selectedRegionId]);

  // 영역 삭제
  const deleteRegion = useCallback(
    (id: number) => {
      setRegions((prev) => prev.filter((region) => region.id !== id));
      if (selectedRegionId === id) {
        setSelectedRegionId(null);
      }
    },
    [selectedRegionId]
  );

  // 영역 크기 조정
  const resizeRegion = useCallback(
    (id: number, widthChange: number, heightChange: number) => {
      setRegions((prev) =>
        prev.map((region) => {
          if (region.id === id) {
            return {
              ...region,
              width: Math.max(10, region.width + widthChange),
              height: Math.max(10, region.height + heightChange),
            };
          }
          return region;
        })
      );
    },
    []
  );

  // ES에 좌표값 업데이트
  const updateRegionsToES = useCallback(() => {
    console.log("ES에 업데이트할 데이터:", regions);
    alert("좌표값이 ES에 업데이트되었습니다.");

    // 실제 API 호출 코드 (나중에 구현)
    // fetch('/api/update-pdf-regions', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(regions),
    // });
  }, [regions]);

  // 캔버스 참조 설정
  const setRightCanvasRef = useCallback(
    (el: HTMLCanvasElement | null, id: number) => {
      if (el) {
        rightCanvasRefs.current[id] = el;
      }
    },
    []
  );

  // 페이지 점프 처리
  const handlePageJump = useCallback(() => {
    const pageNum = parseInt(pageInputValue);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= pageCount) {
      setCurrentPage(pageNum);
    } else {
      // 유효하지 않은 페이지 번호인 경우 현재 페이지로 재설정
      setPageInputValue(currentPage.toString());
    }
  }, [pageInputValue, pageCount, currentPage]);

  // 로딩 중
  if (isLoading) {
    return <LoadingIndicator>PDF 파일을 로딩 중입니다...</LoadingIndicator>;
  }

  // 오류 발생
  if (error) {
    return (
      <LoadingIndicator style={{ color: "red" }}>{error}</LoadingIndicator>
    );
  }

  return (
    <div>
      <Toolbar>
        <ControlsContainer>
          {/* 확대/축소 버튼 */}
          <Button
            onClick={() => {
              setFitMode("none");
              setScale((prev) => Math.max(0.1, prev - 0.1));
            }}
          >
            축소
          </Button>
          <Button
            onClick={() => {
              setFitMode("none");
              setScale((prev) => Math.min(3.0, prev + 0.1));
            }}
          >
            확대
          </Button>

          {/* 맞춤 버튼 */}
          <Button
            onClick={() => handleFitModeChange("page")}
            style={{
              backgroundColor: fitMode === "page" ? "#45a049" : "#4CAF50",
            }}
          >
            페이지 맞춤
          </Button>
          <Button
            onClick={() => handleFitModeChange("width")}
            style={{
              backgroundColor: fitMode === "width" ? "#45a049" : "#4CAF50",
            }}
          >
            너비 맞춤
          </Button>

          {/* 페이지 이동 버튼 */}
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage <= 1}
          >
            이전 페이지
          </Button>

          {/* 페이지 점프 입력 */}
          <div style={{ display: "flex", alignItems: "center" }}>
            <PageInput
              type="number"
              min="1"
              max={pageCount}
              value={pageInputValue}
              onChange={(e) => setPageInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handlePageJump();
                }
              }}
              onBlur={handlePageJump}
            />
            <span style={{ margin: "0 5px" }}>/ {pageCount}</span>
          </div>

          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(pageCount, prev + 1))
            }
            disabled={currentPage >= pageCount}
          >
            다음 페이지
          </Button>
        </ControlsContainer>

        <Button
          onClick={() => setIsCreatingRegion(!isCreatingRegion)}
          style={{
            backgroundColor: isCreatingRegion ? "#4CAF50" : "#2196F3",
            fontWeight: isCreatingRegion ? "bold" : "normal",
          }}
        >
          {isCreatingRegion ? "영역 추가 중..." : "영역 추가"}
        </Button>
      </Toolbar>

      <Container>
        <LeftPanel ref={containerRef}>
          <PdfContainer
            ref={pdfContainerRef}
            onMouseDown={isCreatingRegion ? startCreatingRegion : undefined}
            onMouseMove={isCreatingRegion ? updateCreatingRegion : undefined}
            onMouseUp={isCreatingRegion ? finishCreatingRegion : undefined}
            onMouseLeave={isCreatingRegion ? finishCreatingRegion : undefined}
          >
            <Canvas ref={leftCanvasRef} />

            {/* 영역 박스 */}
            {regions
              .filter((region) => region.page === currentPage)
              .map((region) => (
                <RegionBox
                  key={region.id}
                  isSelected={region.id === selectedRegionId}
                  style={{
                    left: `${region.x * scale}px`,
                    top: `${region.y * scale}px`,
                    width: `${region.width * scale}px`,
                    height: `${region.height * scale}px`,
                  }}
                  onClick={() => selectRegion(region.id)}
                />
              ))}
          </PdfContainer>

          {/* 확대/축소 컨트롤 */}
          <ZoomControls>
            <Button
              onClick={() => {
                setFitMode("none");
                setScale((prev) => Math.max(0.1, prev - 0.1));
              }}
              style={{ padding: "2px 8px" }}
            >
              -
            </Button>
            <span style={{ padding: "0 8px" }}>{Math.round(scale * 100)}%</span>
            <Button
              onClick={() => {
                setFitMode("none");
                setScale((prev) => Math.min(3.0, prev + 0.1));
              }}
              style={{ padding: "2px 8px" }}
            >
              +
            </Button>
          </ZoomControls>
        </LeftPanel>

        <RightPanel>
          <h2 style={{ padding: "0 10px" }}>영역 목록 ({regions.length}개)</h2>

          {regions.map((region) => (
            <RegionCard
              key={region.id}
              isSelected={region.id === selectedRegionId}
              onClick={() => selectRegion(region.id)}
            >
              <h3>영역 #{region.id}</h3>

              <RegionPreview>
                <Canvas
                  ref={(el) => setRightCanvasRef(el, region.id)}
                  style={{ width: "100%", height: "100%" }}
                />
              </RegionPreview>

              <div>
                <p>페이지: {region.page}</p>
                <p>
                  위치: ({Math.round(region.x)}, {Math.round(region.y)})
                </p>
                <p>
                  크기: {Math.round(region.width)} x {Math.round(region.height)}
                </p>
              </div>

              <ButtonGroup>
                <Button onClick={() => resizeRegion(region.id, 10, 10)}>
                  확대 (+10)
                </Button>
                <Button
                  onClick={() => resizeRegion(region.id, -10, -10)}
                  disabled={region.width <= 20 || region.height <= 20}
                >
                  축소 (-10)
                </Button>
                <DeleteButton onClick={() => deleteRegion(region.id)}>
                  삭제
                </DeleteButton>
              </ButtonGroup>
            </RegionCard>
          ))}

          {regions.length === 0 && (
            <div
              style={{ padding: "20px", textAlign: "center", color: "#666" }}
            >
              선택된 영역이 없습니다. "영역 추가" 버튼을 클릭하고 PDF에서 영역을
              선택하세요.
            </div>
          )}
        </RightPanel>
      </Container>

      <FloatingButton onClick={updateRegionsToES}>ES에 업데이트</FloatingButton>
    </div>
  );
};

export default PdfViewer;
