import { DataTableWrap, TableWrap } from "../Contents.styles";
import { DataTable, type DataTableHandle } from "./DataTable";
import { useRef, useEffect } from "react";

interface DataTablesProps {
  leftTableData: any[];
  rightTableData: any[];
  selectedRawPost: any | null;
  selectedCleanedPost: any | null;
  previewData: any[];
  handleLeftClick: (params: any) => void;
  handleRightClick: (params: any) => void;
  tableClickDisabled: boolean;
  isMatchingMode: boolean;
}

export const DataTables = ({
  leftTableData,
  rightTableData,
  selectedRawPost,
  selectedCleanedPost,
  previewData,
  handleLeftClick,
  handleRightClick,
  tableClickDisabled,
  isMatchingMode,
}: DataTablesProps) => {
  // 자동 스크롤용 ref
  const leftTableRef = useRef<DataTableHandle>(null);
  const rightTableRef = useRef<DataTableHandle>(null);

  // 매칭 모드에서 자동 스크롤
  useEffect(() => {
    if (isMatchingMode && selectedRawPost && selectedCleanedPost) {
      // 우측 테이블 스크롤
      if (rightTableRef.current && selectedCleanedPost.id) {
        rightTableRef.current.scrollToRow(selectedCleanedPost.id);
      }
    }
  }, [selectedRawPost, isMatchingMode]);

  useEffect(() => {
    if (isMatchingMode && selectedCleanedPost && selectedRawPost) {
      // 좌측 테이블 스크롤
      if (leftTableRef.current && selectedRawPost.id) {
        leftTableRef.current.scrollToRow(selectedRawPost.id);
      }
    }
  }, [selectedCleanedPost, isMatchingMode]);

  // 좌측 테이블 스타일
  const getLeftRowClassName = (params: any) => {
    if (params.id === selectedRawPost?.id) {
      return "selected-row";
    }
    if (previewData.some((item) => item.id === params.id)) {
      return "modified-row";
    }
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "";
  };

  // 우측 테이블 스타일 (modified-row 제거)
  const getRightRowClassName = (params: any) => {
    if (params.id === selectedCleanedPost?.id) {
      return "selected-row";
    }
    return params.indexRelativeToCurrentPage % 2 === 0 ? "even-row" : "";
  };

  return (
    <DataTableWrap>
      <TableWrap>
        <DataTable
          ref={leftTableRef}
          data={leftTableData || []}
          title="데이터"
          onRowClick={handleLeftClick}
          getRowClassName={getLeftRowClassName}
          tableClickDisabled={tableClickDisabled}
        />

        <DataTable
          ref={rightTableRef}
          data={rightTableData || []}
          title="비교 대상 원문"
          onRowClick={handleRightClick}
          getRowClassName={getRightRowClassName}
          tableClickDisabled={tableClickDisabled}
        />
      </TableWrap>
    </DataTableWrap>
  );
};
