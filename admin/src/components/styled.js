// Dependencies
import styled from "styled-components";

export const ColorContainer = styled.div`
  position: relative;
`;

export const Color = styled.div`
  width: 28px;
  height: 28px;
  margin-top: 0.9rem;
  border-radius: 0.25rem;
  border: 2px solid #fff;
  box-shadow: 0 0 0 1px rgba(227, 233, 243, 1),
    inset 0 0 0 1px rgba(227, 233, 243, 1);
  background-color: ${(props) => props.$color};
`;

export const PopOver = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: -4;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  max-width: 200px;
  overflow: hidden;
  z-index: 100;

  & .react-colorful__alpha.react-colorful__last-control {
    border-radius: 0;
  }
`;

export const Alpha = styled.span`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  color: #495057;
`;

export const RgbaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 2px;

  & input {
    padding: 0.375rem;
    font-size: 1.125rem;
    height: 3.4rem;
    margin-top: 0.9rem;
    background-size: 0 !important;
    border: 1px solid #e3e9f3;
    border-radius: 0.25rem;
    line-height: 3.4rem;
    font-family: "Lato" !important;
    box-shadow: 0px 1px 1px rgba(104, 118, 142, 0.05);

    &:focus {
      outline: none;
    }

    &:nth-child(1) {
      border-top-left-radius: 0;
    }

    &:nth-child(4) {
      border-top-right-radius: 0;
    }
  }
`;
