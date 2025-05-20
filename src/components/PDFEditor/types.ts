export interface RegionData {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  page: number;
}

// PDF 뷰어 props 인터페이스
export interface PdfViewerProps {
  pdfUrl: string;
}

// PDF 에디터 앱 props 인터페이스
export interface PDFEditorAppProps {
  // 필요한 경우 추가 props 정의
}
