// /src/components/PDFEditor/PdfEditorApp.tsx
import React, { useState } from "react";
import PdfViewer from "./PdfViewer";
import type { PDFEditorAppProps } from "./types";
import {
  AppContainer,
  Header,
  Title,
  Description,
  PdfUploadContainer,
  UploadButton,
  FileInput,
  ExampleButton,
  LoadingIndicator,
} from "./styles/CommonStyles";

// PDF 에디터 메인 컴포넌트 - PDF 업로드 및 뷰어 연결
const PdfEditorApp: React.FC<PDFEditorAppProps> = () => {
  // 상태 관리
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 샘플 PDF URL - 온라인 샘플 사용
  const hardcodedPdfUrl =
    "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  // PDF 파일 업로드 처리
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("파일 선택됨:", files);

    if (files && files[0]) {
      console.log("파일 타입:", files[0].type);
      console.log("파일 크기:", files[0].size);
      console.log("파일 이름:", files[0].name);

      if (
        files[0].type === "application/pdf" ||
        files[0].name.toLowerCase().endsWith(".pdf")
      ) {
        setPdfFile(files[0]);

        // 이전에 생성된 URL 해제
        if (pdfUrl && pdfUrl.startsWith("blob:")) {
          URL.revokeObjectURL(pdfUrl);
        }

        setIsLoading(true);

        try {
          // 파일 URL 생성
          const fileUrl = URL.createObjectURL(files[0]);
          console.log("생성된 파일 URL:", fileUrl);
          setPdfUrl(fileUrl);
        } catch (err) {
          console.error("파일 URL 생성 오류:", err);
          setError("PDF 파일을 처리하는 중 오류가 발생했습니다.");
        } finally {
          setIsLoading(false);
        }
      } else {
        alert(
          "PDF 파일만 업로드 가능합니다. 선택된 파일 타입: " + files[0].type
        );
      }
    }
  };

  // 샘플 PDF 사용
  const useHardcodedPdf = () => {
    setIsLoading(true);
    console.log("온라인 PDF URL 사용:", hardcodedPdfUrl);
    setPdfUrl(hardcodedPdfUrl);
    setIsLoading(false);
  };

  // 오류 발생 시 표시
  if (error) {
    return (
      <AppContainer>
        <Header>
          <Title>PDF 영역 편집 도구</Title>
        </Header>
        <LoadingIndicator style={{ color: "red" }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: "10px", padding: "5px 10px" }}
          >
            다시 시도
          </button>
        </LoadingIndicator>
      </AppContainer>
    );
  }

  return (
    <AppContainer>
      <Header>
        <Title>PDF 영역 편집 도구</Title>
        <Description>
          PDF 문서를 업로드하고 영역을 선택, 편집하여 좌표값을 관리할 수
          있습니다.
        </Description>
      </Header>

      {isLoading ? (
        <LoadingIndicator>PDF 파일을 처리 중입니다...</LoadingIndicator>
      ) : !pdfUrl ? (
        <PdfUploadContainer>
          <UploadButton htmlFor="pdf-upload">PDF 파일 선택</UploadButton>
          <FileInput
            id="pdf-upload"
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          <div>
            <ExampleButton onClick={useHardcodedPdf}>
              예제 PDF 사용
            </ExampleButton>
          </div>
          {pdfFile && <p>선택된 파일: {pdfFile.name}</p>}
        </PdfUploadContainer>
      ) : (
        <div>
          <div style={{ marginBottom: "10px" }}>
            <button
              onClick={() => {
                if (pdfUrl.startsWith("blob:")) {
                  URL.revokeObjectURL(pdfUrl);
                }
                setPdfUrl("");
                setPdfFile(null);
              }}
              style={{ padding: "5px 10px" }}
            >
              다른 PDF 선택
            </button>
            {pdfFile && (
              <span style={{ marginLeft: "10px" }}>
                현재 파일: {pdfFile.name}
              </span>
            )}
          </div>
          <PdfViewer pdfUrl={pdfUrl} />
        </div>
      )}
    </AppContainer>
  );
};

export default PdfEditorApp;
