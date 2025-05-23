import styled from "styled-components";
export const SummationWrap = styled.div`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  padding: 10px 0px 0px 0px;
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

export const SummationContents = styled.div`
  width: 100%;
  border: 1px solid red;
`;

export const SummationSelect = styled.div`
  width: 100%;
  border: 1px solid orange;
`;
export const SummationResult = styled.div`
  width: 100%;
  border: 1px solid blue;
`;
