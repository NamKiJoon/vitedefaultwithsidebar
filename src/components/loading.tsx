import styled, { keyframes } from "styled-components";

const iSpinnerBladeAnimation = keyframes`
  0% {
    opacity: 0.85;
  }
  50% {
    opacity: 0.25;
  }
  100% {
    opacity: 0.25;
  }
`;

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  z-index: 9999999;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #eceff2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ISpinnerLarge = styled.div`
  width: 35px;
  height: 35px;
  position: relative;
`;

const ISpinnerBlade = styled.div`
  position: absolute;
  top: 11.5px;
  left: 15px;
  width: 5px;
  height: 12px;
  background-color: #8e8e93;
  border-radius: 2.5px;
  transform-origin: center;
  animation: ${iSpinnerBladeAnimation} 1s linear infinite;
  z-index: 999;

  &:nth-child(1) {
    transform: rotate(45deg) translateY(-11.5px);
    animation-delay: -1.625s;
  }
  &:nth-child(2) {
    transform: rotate(90deg) translateY(-11.5px);
    animation-delay: -1.5s;
  }
  &:nth-child(3) {
    transform: rotate(135deg) translateY(-11.5px);
    animation-delay: -1.375s;
  }
  &:nth-child(4) {
    transform: rotate(180deg) translateY(-11.5px);
    animation-delay: -1.25s;
  }
  &:nth-child(5) {
    transform: rotate(225deg) translateY(-11.5px);
    animation-delay: -1.125s;
  }
  &:nth-child(6) {
    transform: rotate(270deg) translateY(-11.5px);
    animation-delay: -1s;
  }
  &:nth-child(7) {
    transform: rotate(315deg) translateY(-11.5px);
    animation-delay: -0.875s;
  }
  &:nth-child(8) {
    transform: rotate(360deg) translateY(-11.5px);
    animation-delay: -0.75s;
  }
`;

export const Loading = () => (
  <LoaderContainer title="로딩">
    <ISpinnerLarge>
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
      <ISpinnerBlade />
    </ISpinnerLarge>
  </LoaderContainer>
);
