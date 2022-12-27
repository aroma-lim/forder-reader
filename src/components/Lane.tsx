import { FC } from "react";
import styled from "styled-components";
import { Color } from "../Theme";

const LaneWrapper = styled.div`
  position: relative;
  width: 240px;
  min-width: 240px;
  height: 100%;
  padding-top: 8px;
  border-style: solid;
  border-width: 0 1px 0;
  border-color: ${Color.Neutral4};

  background: ${Color.Neutral3};
  overflow: auto;
`;

interface Props {
  children?: React.ReactNode;
}

const Lane: FC<Props> = (props: Props) => {
  const { children } = props;
  return <LaneWrapper {...props}>{children}</LaneWrapper>;
};

export default Lane;
