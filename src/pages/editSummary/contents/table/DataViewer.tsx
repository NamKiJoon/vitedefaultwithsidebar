import { AddHighlight } from "../Contents.styles";

interface DataViewerProps {
  selectedData: any | null;
  previewData: any[];
  placeholder: string;
  isEditing?: boolean;
}

export const DataViewer = ({
  selectedData,
  previewData,
  placeholder,
  isEditing = false,
}: DataViewerProps) => {
  const isModified =
    selectedData && previewData.some((item) => item.id === selectedData.id);

  return (
    <div
      style={{
        borderRadius: "4px",
        backgroundColor: "#f8f8f8",
        ...(isModified
          ? {
              borderLeft: "4px solid #ffc107",
              backgroundColor: "#fff8e1",
            }
          : {}),
      }}
    >
      <div
        style={{
          padding: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        {selectedData ? (
          <>
            <strong>ID: {selectedData.id}</strong>
            <br />
            <strong>제목: {selectedData.title}</strong>
            {isModified && <AddHighlight>수정됨</AddHighlight>}
          </>
        ) : (
          <p>{placeholder}</p>
        )}
      </div>

      <div
        style={{
          padding: "10px",
          height: "150px",
          overflow: "auto",
        }}
      >
        {selectedData ? (
          <p>{selectedData.body || "내용 없음"}</p>
        ) : (
          <p>{placeholder}</p>
        )}
      </div>
    </div>
  );
};
