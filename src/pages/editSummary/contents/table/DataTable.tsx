import { Paper } from "@mui/material";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { AddData } from "../Contents.styles";
import { tableStyles } from "../tableStyles";
import { forwardRef, useImperativeHandle, useRef } from "react";

interface DataTableProps {
  data: any[];
  title: string;
  onRowClick: (params: any) => void;
  getRowClassName: (params: any) => string;
  tableClickDisabled: boolean;
}

export interface DataTableHandle {
  scrollToRow: (id: number) => void;
}

export const DataTable = forwardRef<DataTableHandle, DataTableProps>(
  ({ data, title, onRowClick, getRowClassName, tableClickDisabled }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);

    // 자동 스크롤 함수
    useImperativeHandle(ref, () => ({
      scrollToRow: (id: number) => {
        if (containerRef.current && data && data.length > 0) {
          setTimeout(() => {
            try {
              const targetRow = containerRef.current?.querySelector(
                `[data-id="${id}"]`
              );
              if (targetRow) {
                targetRow.scrollIntoView({
                  behavior: "instant",
                  block: "center",
                });
              }
            } catch (error) {
              // alert("")
              console.log("스크롤 에러:", error);
            }
          }, 100);
        }
      },
    }));

    const columns: GridColDef[] = [
      { field: "id", headerName: "ID", width: 80, sortable: true },
      { field: "userId", headerName: "User ID", width: 100, sortable: true },
      {
        field: "title",
        headerName: "제목",
        width: 400,
        sortable: true,
      },
    ];

    // 데이터가 없거나 빈 배열일 때 안전 처리
    const safeData = data || [];

    return (
      <div style={{ width: "50%" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>{title}</h3>
        <div
          style={{
            marginBottom: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <AddData></AddData>
          <small>수정 테이블에 추가된 데이터</small>
        </div>
        <Paper
          ref={containerRef}
          sx={{ maxHeight: 300, width: "100%", overflowY: "scroll" }}
        >
          <DataGrid
            rows={safeData}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 100, page: 0 },
              },
            }}
            style={{
              pointerEvents: tableClickDisabled ? "none" : "auto",
            }}
            disableColumnSelector
            onRowClick={onRowClick}
            sx={tableStyles}
            getRowClassName={getRowClassName}
            rowHeight={50}
            density="compact"
            // MUI 선택 기능 비활성화
            disableRowSelectionOnClick={true}
            hideFooterSelectedRowCount={true}
            checkboxSelection={false}
            onRowSelectionModelChange={() => {}}
            // 페이지네이션 설정
            pageSizeOptions={[100]}
            hideFooter={true}
          />
        </Paper>
      </div>
    );
  }
);

DataTable.displayName = "DataTable";
