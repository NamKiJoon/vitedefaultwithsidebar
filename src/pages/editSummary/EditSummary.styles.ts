import styled from "styled-components";

export const EditWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px 30px 0px 30px;
`;

export const NavWrap = styled.div`
  /* border: 1px solid red; */
  display: flex;
  gap: 10px;
  button {
    width: 150px;
  }
  a {
    text-decoration: none;
    color: #333;
  }
`;
export const NavButton = styled.button<{ $isActive: boolean }>`
  width: 150px;
  padding: 8px 16px;
  font-weight: 400;
  background: ${({ $isActive }) => ($isActive ? "#2a2d3e" : "transparent")};
  color: ${({ $isActive }) => ($isActive ? "#fff" : "inherit")};
  border: ${({ $isActive }) => ($isActive ? "none" : "1px solid #2a2d3e")};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;
