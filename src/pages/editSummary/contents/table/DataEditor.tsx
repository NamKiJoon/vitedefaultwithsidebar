import { useState, useEffect } from "react";
import { CopyBtn } from "../Contents.styles";

interface DataEditorProps {
  editingData: any;
  onEditChange: (field: string, value: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

export const DataEditor = ({
  editingData,
  onEditChange,
  onCancel,
  onApply,
}: DataEditorProps) => {
  // 로컬 상태로 편집 중인 데이터 관리
  const [localData, setLocalData] = useState({
    title: editingData?.title || "",
    body: editingData?.body || "",
  });

  // editingData가 변경될 때 로컬 상태 업데이트
  useEffect(() => {
    setLocalData({
      title: editingData?.title || "",
      body: editingData?.body || "",
    });
  }, [editingData]);

  // 로컬 상태 변경 핸들러
  const handleLocalChange = (field: string, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // 부모 컴포넌트에도 변경사항 전달
    onEditChange(field, value);
  };

  // 수정하기 버튼 클릭 시 최종 데이터로 적용
  const handleApply = () => {
    // 최종 로컬 데이터를 다시 한 번 부모에 전달
    onEditChange("title", localData.title);
    onEditChange("body", localData.body);
    onApply();
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>제목:</label>
        <input
          type="text"
          value={localData.title}
          onChange={(e) => handleLocalChange("title", e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #28a745",
            backgroundColor: "#f0fff0",
          }}
        />
      </div>

      <div>
        <label style={{ display: "block", marginBottom: "5px" }}>내용:</label>
        <textarea
          value={localData.body}
          onChange={(e) => handleLocalChange("body", e.target.value)}
          style={{
            width: "100%",
            height: "150px",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #28a745",
            backgroundColor: "#f0fff0",
            resize: "vertical",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <CopyBtn onClick={onCancel}>취소</CopyBtn>
        <CopyBtn onClick={handleApply}>수정하기</CopyBtn>
      </div>
    </div>
  );
};
