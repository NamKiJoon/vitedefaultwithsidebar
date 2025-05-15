import styled from "styled-components";

export const NavBox = styled.div`
  display: flex;
  gap: 20px;
  width: 800px;
  /* border: 1px solid red; */
  /* flex-direction: column; */
  .nav-link[data-status="active"] {
    border-bottom: 1px solid white;
  }
`;
