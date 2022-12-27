import { FC } from "react";
import styled from "styled-components";
import { ReactComponent as ImportIcon } from "../assets/import-icon-big.svg";
import { Color } from "../Theme";

const EmptyViewWrpper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
`;

const Subtitle = styled.div`
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.13125px;

  color: ${Color.Neutral6};
`;

const EmptyView: FC = () => {
  return (
    <EmptyViewWrpper>
      <ImportIcon />
      <Subtitle>Click Import button to load a localization file.</Subtitle>
    </EmptyViewWrpper>
  );
};

export default EmptyView;
