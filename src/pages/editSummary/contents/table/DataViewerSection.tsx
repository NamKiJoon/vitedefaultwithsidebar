import { CopyBox, CopyWrap, TitleStyles, CopyBtn } from "../Contents.styles";
import { DataEditor } from "./DataEditor";
import { DataViewer } from "./DataViewer";

interface DataViewerSectionProps {
  selectedRawPost: any | null;
  selectedCleanedPost: any | null;
  previewData: any[];
  isEditing: boolean;
  editingData: any | null;
  onTitleCopy: () => void;
  onBodyCopy: () => void;
  onAllCopy: () => void;
  onEditChange: (field: string, value: string) => void;
  onCancel: () => void;
  onApply: () => void;
}

export const DataViewerSection = ({
  selectedRawPost,
  selectedCleanedPost,
  previewData,
  isEditing,
  editingData,
  onTitleCopy,
  onBodyCopy,
  onAllCopy,
  onEditChange,
  onCancel,
  onApply,
}: DataViewerSectionProps) => {
  return (
    <CopyBox>
      {/* 원본 데이터 내용 (왼쪽) */}
      <CopyWrap>
        <TitleStyles>
          <h4>데이터 내용</h4>
          {selectedRawPost && selectedCleanedPost && !isEditing && (
            <div style={{ display: "flex", gap: "5px" }}>
              <CopyBtn onClick={onTitleCopy}>제목 가져오기</CopyBtn>
              <CopyBtn onClick={onBodyCopy}>본문 가져오기</CopyBtn>
              <CopyBtn onClick={onAllCopy}>모두 가져오기</CopyBtn>
            </div>
          )}
        </TitleStyles>

        {isEditing && editingData ? (
          <DataEditor
            editingData={editingData}
            onEditChange={onEditChange}
            onCancel={onCancel}
            onApply={onApply}
          />
        ) : (
          <DataViewer
            selectedData={selectedRawPost}
            previewData={previewData}
            placeholder="왼쪽 테이블에서 행을 선택하세요"
          />
        )}
      </CopyWrap>

      {/* 정제된 데이터 내용 (오른쪽) */}
      <CopyWrap>
        <TitleStyles>
          <h4>원본 테이블</h4>
        </TitleStyles>

        <DataViewer
          selectedData={selectedCleanedPost}
          previewData={previewData}
          placeholder="오른쪽 테이블에서 행을 선택하세요"
        />
      </CopyWrap>
    </CopyBox>
  );
};
