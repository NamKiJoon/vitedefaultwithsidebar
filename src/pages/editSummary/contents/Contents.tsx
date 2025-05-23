import { SingleDatePicker } from "@/components/DatePicker/SingleDatePicker";
import "react-day-picker/dist/style.css";
import {
  ContentsWrap,
  SelectWrap,
  SelectButton,
  ButtonBox,
  DateSelectBox,
  DateSelectBtn,
  MatchingBtn,
} from "./Contents.styles";
import { DataTables } from "./table/DataTables";
import { Loading } from "@/components/loading";
import { Error } from "@/pages/Error/Error";
import { DataViewerSection } from "./table/DataViewerSection";
import { PreviewTableSection } from "./table/PreviewTableSection";

// 훅들 import
import {
  useDateRange,
  useContentsData,
  useTableSelection,
  useDataEditor,
  usePreviewData,
} from "./ContentsHook";

export const Contents = () => {
  const { range, setRange, isPickerOpen, setIsPickerOpen, format } =
    useDateRange();

  const isDateSelected = range?.from;

  const {
    leftTableData,
    rightTableData,
    selectedRawPost,
    selectedCleanedPost,
    isLoading,
    isError,
    setLeftTableData,
    setRightTableData,
    setSelectedRawPost,
    setSelectedCleanedPost,
  } = useContentsData(range?.from);

  const {
    isEditing,
    editingData,
    setIsEditing,
    setEditingData,
    startTitleEdit,
    startBodyEdit,
    startAllEdit,
    cancelEditing,
    handleEditChange,
  } = useDataEditor();

  const {
    previewData,
    isSaving,
    applyToPreview,
    removeFromPreview,
    saveAllChanges,
  } = usePreviewData(
    leftTableData,
    rightTableData,
    setLeftTableData,
    setRightTableData,
    selectedRawPost,
    selectedCleanedPost,
    setSelectedRawPost,
    setSelectedCleanedPost
  );

  const {
    tableClickDisabled,
    handleLeftClick,
    handleRightClick,
    isMatchingMode,
    toggleMatchingMode,
  } = useTableSelection(
    leftTableData,
    rightTableData,
    setSelectedRawPost,
    setSelectedCleanedPost,
    isEditing,
    setIsEditing,
    setEditingData
  );

  const handleApplyToPreview = () => {
    if (editingData) {
      applyToPreview(editingData);
      cancelEditing();
    }
  };

  // 단일 날짜를 포맷팅하는 함수
  const formatSelectedDate = () => {
    if (!range?.from) return "";
    return format(range.from);
  };

  return (
    <ContentsWrap>
      {/* 날짜 선택 영역 */}
      <DateSelectBox>
        <DateSelectBtn onClick={() => setIsPickerOpen((prev) => !prev)}>
          {isDateSelected ? formatSelectedDate() : "날짜 선택"}
        </DateSelectBtn>
      </DateSelectBox>

      {isPickerOpen && (
        <SelectWrap>
          <SingleDatePicker
            range={range}
            setRange={(newRange) => {
              setRange(newRange);
              if (newRange?.from) {
                setIsPickerOpen(false);
              }
            }}
          />
          {/* <ButtonBox>
            <SelectButton
              onClick={() => {
                setIsPickerOpen(false);
              }}
            >
              확인
            </SelectButton>
          </ButtonBox> */}
        </SelectWrap>
      )}

      {/* 날짜가 선택되지 않았을 때 메시지 */}
      {!isDateSelected && (
        <div
          style={{
            textAlign: "center",
            padding: "60px 20px",
            color: "#6c757d",
            fontSize: "16px",
            backgroundColor: "#f8f9fa",
            border: "1px dashed #dee2e6",
            borderRadius: "8px",
            margin: "20px 0",
          }}
        >
          날짜를 선택하면 해당 기간의 데이터를 확인할 수 있습니다.
        </div>
      )}

      {/* 날짜가 선택되었을 때만 테이블 및 관련 UI 표시 */}
      {isDateSelected && (
        <>
          {/* 선택된 날짜 표시 */}
          <div
            style={{
              padding: "12px 16px",
              backgroundColor: "#e3f2fd",
              border: "1px solid #90caf9",
              borderRadius: "6px",
              margin: "16px 0",
              fontSize: "14px",
              fontWeight: "500",
              color: "#1565c0",
            }}
          >
            선택된 날짜: {formatSelectedDate()}
          </div>

          {/* 매칭 모드 토글 UI */}
          <MatchingBtn>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              <input
                type="checkbox"
                checked={isMatchingMode}
                onChange={toggleMatchingMode}
                style={{ width: "18px", height: "18px" }}
              />
              <span>ID 매칭</span>
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "0.9em",
                  color: isMatchingMode ? "#28a745" : "#6c757d",
                  fontWeight: isMatchingMode ? "600" : "400",
                }}
              >
                {isMatchingMode ? "" : ""}
              </span>
            </label>
          </MatchingBtn>

          {/* 로딩/에러/데이터 표시 */}
          {isLoading ? (
            <Loading />
          ) : isError ? (
            <Error />
          ) : (
            <>
              <DataTables
                leftTableData={leftTableData}
                rightTableData={rightTableData}
                selectedRawPost={selectedRawPost}
                selectedCleanedPost={selectedCleanedPost}
                previewData={previewData}
                handleLeftClick={handleLeftClick}
                handleRightClick={handleRightClick}
                tableClickDisabled={tableClickDisabled}
                isMatchingMode={isMatchingMode}
              />

              <DataViewerSection
                selectedRawPost={selectedRawPost}
                selectedCleanedPost={selectedCleanedPost}
                previewData={previewData}
                isEditing={isEditing}
                editingData={editingData}
                onTitleCopy={() =>
                  startTitleEdit(selectedRawPost, selectedCleanedPost)
                }
                onBodyCopy={() =>
                  startBodyEdit(selectedRawPost, selectedCleanedPost)
                }
                onAllCopy={() =>
                  startAllEdit(selectedRawPost, selectedCleanedPost)
                }
                onEditChange={handleEditChange}
                onCancel={cancelEditing}
                onApply={handleApplyToPreview}
              />

              <PreviewTableSection
                previewData={previewData}
                isSaving={isSaving}
                onSaveAll={saveAllChanges}
                onRemove={removeFromPreview}
              />
            </>
          )}
        </>
      )}
    </ContentsWrap>
  );
};
