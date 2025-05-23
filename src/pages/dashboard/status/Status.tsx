import { useEffect, useState } from "react";
import { type DateRange } from "react-day-picker";
import { DatePicker } from "@/components/DatePicker/DatePicker";
import "react-day-picker/dist/style.css";
import {
  StatusWrap,
  SelectWrap,
  SelectButton,
  ButtonBox,
  Select,
} from "./Status.styles";
import { DataTableWrap, NavButton } from "./Status.styles";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { Loading } from "@/components/loading";
import { useStatusPosts } from "./StatusApi";

const getCurrentMonthRange = (): DateRange => {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  return { from: start, to: end };
};

export const Status = () => {
  const [range, setRange] = useState<DateRange | undefined>(
    getCurrentMonthRange()
  );
  const format = (date: Date) => date.toLocaleDateString();

  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const { posts, isLoading, isError, error, refetch } = useStatusPosts();

  // 테이블 컬럼 정의
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 80, sortable: true },
    { field: "userId", headerName: "User ID", width: 100, sortable: true },
    {
      field: "title",
      headerName: "제목",
      width: 600,
      // flex: 1,
      sortable: true,
    },
  ];

  return (
    <StatusWrap>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          onClick={() => setIsPickerOpen((prev) => !prev)}
          style={{
            padding: "8px 16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
        >
          {range?.from && range?.to
            ? `${format(range.from)} ~ ${format(range.to)}`
            : "날짜 선택"}
        </button>

        <NavButton onClick={() => refetch()}>새로고침</NavButton>
      </div>

      {isPickerOpen && (
        <SelectWrap
          style={{
            marginTop: "12px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            padding: "12px",
            backgroundColor: "#2a2d3e",
            color: "#fff",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            position: "absolute",
            top: "15%",
            left: "30px",
            zIndex: 1000,
          }}
        >
          <DatePicker range={range} setRange={setRange} />
          <ButtonBox>
            <SelectButton
              onClick={() => {
                setIsPickerOpen(false);
                console.log("선택된 날짜", range);
              }}
            >
              확인
            </SelectButton>
          </ButtonBox>
        </SelectWrap>
      )}

      <Select>
        {/* 데이터 요약 정보 표시 */}
        총일수 ....................
        {/* <span>총 {posts.length}개의 게시물</span> */}
        {/* <span>
          User ID 기준 통계:{" "}
          {
            // 유저별 게시물 수 계산
            Object.entries(
              posts.reduce((acc, post) => {
                acc[post.userId] = (acc[post.userId] || 0) + 1;
                return acc;
              }, {} as Record<number, number>)
            )
              .map(([userId, count]) => `User ${userId}: ${count}개`)
              .join(", ")
          }
        </span> */}
      </Select>

      <DataTableWrap>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div style={{ color: "red", padding: "20px" }}>
            <p>에러가 발생했습니다: {error?.message}</p>
            <button
              onClick={() => refetch()}
              style={{
                padding: "8px 16px",
                border: "1px solid #dc3545",
                borderRadius: "4px",
                backgroundColor: "#dc3545",
                color: "white",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              다시 시도
            </button>
          </div>
        ) : (
          <>
            <Paper sx={{ maxHeight: 700, width: "100%", overflowY: "scroll" }}>
              <DataGrid
                rows={posts}
                columns={columns}
                initialState={{
                  pagination: {
                    paginationModel: { pageSize: posts.length, page: 0 },
                  },
                }}
                // hideFooter
                // checkboxSelection
                disableColumnSelector
                disableRowSelectionOnClick
                sx={{
                  border: 0,
                  "& .MuiDataGrid-cell:focus": {
                    outline: "none",
                  },
                  "& .MuiDataGrid-columnHeader:focus": {
                    outline: "none",
                  },
                }}
                getRowClassName={(params) =>
                  params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : ""
                }
                rowHeight={50}
                density="compact"
              />
            </Paper>
          </>
        )}
      </DataTableWrap>
    </StatusWrap>
  );
};
