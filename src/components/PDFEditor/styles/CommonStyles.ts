// /src/components/PDFEditor/styles/CommonStyles.ts
import styled from "styled-components";

// 메인 컨테이너
export const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

// 헤더 영역
export const Header = styled.header`
  margin-bottom: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  color: #333;
`;

export const Description = styled.p`
  color: #666;
`;

// PDF 업로드 영역
export const PdfUploadContainer = styled.div`
  margin-bottom: 20px;
  padding: 20px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  text-align: center;
`;

export const UploadButton = styled.label`
  display: inline-block;
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #45a049;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const ExampleButton = styled.button`
  padding: 8px 16px;
  margin-top: 10px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0b7dda;
  }
`;

// 로딩 인디케이터
export const LoadingIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 18px;
  color: #666;
  padding: 40px 0;
`;
