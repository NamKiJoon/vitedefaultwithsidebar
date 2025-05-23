import styled from "styled-components";
export const StatusWrap = styled.div`
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

  &:hover {
    opacity: 0.9;
  }
`;
