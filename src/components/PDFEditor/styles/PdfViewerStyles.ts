// /src/components/PDFEditor/styles/PdfViewerStyles.ts
import styled from "styled-components";

// 메인 컨테이너 - 좌우 패널 분할
export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 150px);
  gap: 20px;
`;

// 좌측 패널 - PDF 및 전체 영역 표시
export const LeftPanel = styled.div`
  flex: 1;
  border: 1px solid #ccc;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

// 우측 패널 - 영역 목록 표시
export const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  overflow: auto;
`;

// PDF 컨테이너
export const PdfContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

// 캔버스 - PDF 렌더링용
export const Canvas = styled.canvas`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

// 선택된 영역 표시 박스
interface RegionBoxProps {
  isSelected?: boolean;
}

export const RegionBox = styled.div<RegionBoxProps>`
  position: absolute;
  border: 2px solid ${(props) => (props.isSelected ? "#ff0000" : "#2196F3")};
  background-color: ${(props) =>
    props.isSelected ? "rgba(255, 0, 0, 0.1)" : "rgba(33, 150, 243, 0.1)"};
  cursor: pointer;
`;

// 각 영역 카드
interface RegionCardProps {
  isSelected?: boolean;
}

export const RegionCard = styled.div<RegionCardProps>`
  padding: 15px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: ${(props) => (props.isSelected ? "#f0f8ff" : "#fff")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

// 영역 프리뷰
export const RegionPreview = styled.div`
  position: relative;
  height: 200px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  overflow: hidden;
`;

// 버튼 그룹
export const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

// 기본 버튼
export const Button = styled.button`
  padding: 8px 12px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0b7dda;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

// 삭제 버튼
export const DeleteButton = styled(Button)`
  background-color: #f44336;

  &:hover {
    background-color: #d32f2f;
  }
`;

// 컨트롤 컨테이너
export const ControlsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px;
  align-items: center;
`;

// 플로팅 버튼
export const FloatingButton = styled(Button)`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 100;
  padding: 12px 20px;
  font-size: 16px;
`;

// 툴바
export const Toolbar = styled.div`
  display: flex;
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  justify-content: space-between;
`;

// 확대/축소 컨트롤
export const ZoomControls = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 4px;
  padding: 5px;
  display: flex;
  gap: 5px;
  z-index: 100;
  align-items: center;
`;

// 페이지 점프 입력 스타일
export const PageInput = styled.input`
  width: 50px;
  padding: 4px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin: 0 5px;
`;
