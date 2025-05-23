import styled from "styled-components";
export const ContentsWrap = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  padding: 10px 0px 0px 0px;
`;

export const SelectWrap = styled.div`
  .custom-day-picker {
  }
  .rdp-root {
    --rdp-accent-color: #fff;
    --rdp-accent-background-color: rgb(58, 67, 117);
    --rdp-range_start-color: #2a2d3e;
  }
  margin-top: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  background-color: #2a2d3e;
  color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 15%;
  left: 30px;
  z-index: 1000;
`;
export const Select = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;
export const DataTableWrap = styled.div`
  .even-row {
    background-color: rgb(238, 238, 238);
  }
  .selected-row {
    border: 1px solid #000;
    background-color: color-mix(
      in srgb,
      var(--DataGrid-t-color-background-base),
      var(--DataGrid-t-color-interactive-selected)
        calc(var(--DataGrid-t-color-interactive-selected-opacity) * 100%)
    );
  }
`;

export const ButtonBox = styled.div`
  width: 100%;
  /* border: 1px solid red; */
  display: flex;
  justify-content: right;
  height: 40px;
`;

export const SelectButton = styled.button`
  background-color: #2a2d3e;
  color: #fff;
  /* border: 1px solid red; */
  border-radius: 4px;
  cursor: pointer;
`;
export const NavButton = styled.button`
  padding: 8px 16px;
  font-weight: 400;
  background: #2a2d3e;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
  &:hover {
    opacity: 0.9;
  }
`;

export const TableWrap = styled.div`
  display: flex;
  gap: 20px;
`;

export const AddData = styled.span`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: #fff8e1;
  margin-right: 5px;
  border: 1px solid #ffc107;
`;

export const AddHighlight = styled.span`
  margin-left: 10px;
  background-color: #ffc107;
  color: #000;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.75rem;
  font-weight: bold;
`;

export const SaveBtn = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

// 데이터내용 / 원본테이블 ( 상단 테이블 컬럼 선택시 띄워질 테이블 )
export const CopyBox = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 20px;
`;

export const CopyWrap = styled.div`
  flex: 1;
`;

export const TitleStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  height: 40px;
`;

export const CopyBtn = styled.button`
  padding: 5px 10px;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export const DateSelectBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const DateSelectBtn = styled.button`
  padding: 8px 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
`;

export const MatchingBtn = styled.div`
  margin: 16px 0;
  padding: 12px;
  background-color: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
`;
