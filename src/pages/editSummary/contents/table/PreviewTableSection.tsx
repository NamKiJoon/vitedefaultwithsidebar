import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { TitleStyles, SaveBtn, CopyBtn } from "../Contents.styles";
import { previewTableStyles } from "../tableStyles";

interface PreviewTableSectionProps {
  previewData: any[];
  isSaving: boolean;
  onSaveAll: () => void;
  onRemove: (id: number) => void;
}

export const PreviewTableSection = ({
  previewData,
  isSaving,
  onSaveAll,
  onRemove,
}: PreviewTableSectionProps) => {
  // 미리보기 테이블 컬럼
  const previewColumns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "userId", headerName: "User ID", width: 100 },
    { field: "title", headerName: "제목", width: 400 },
    {
      field: "actions",
      headerName: "작업",
      width: 150,
      renderCell: (params) => (
        <CopyBtn
          onClick={() => onRemove(params.row.id)}
          style={{ background: "red" }}
        >
          제거
        </CopyBtn>
      ),
    },
  ];

  if (previewData.length === 0) return null;

  return (
    <div>
      <TitleStyles style={{ marginTop: "20px" }}>
        <h3 style={{ margin: 0 }}>
          수정된 데이터 미리보기 ({previewData.length}개 항목)
        </h3>
        <SaveBtn
          onClick={onSaveAll}
          disabled={isSaving}
          style={{ opacity: isSaving ? 0.5 : 1 }}
        >
          {isSaving ? "변경 중..." : "최종 변경 적용"}
        </SaveBtn>
      </TitleStyles>

      <Paper sx={{ width: "100%" }}>
        <DataGrid
          rows={previewData}
          columns={previewColumns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5, page: 0 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          disableColumnSelector
          disableRowSelectionOnClick
          autoHeight
          sx={previewTableStyles}
          rowHeight={50}
        />
      </Paper>
    </div>
  );
};
