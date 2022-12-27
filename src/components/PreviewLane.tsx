import { FC } from "react";
import styled from "styled-components";
import { Color } from "../Theme";

const LaneWrapper = styled.div`
  min-width: 304px;
  width: 100%;
  height: 100%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: ${Color.Neutral2};
`;

const PreviewArea = styled.div`
  width: inherit;
  min-width: 256px;
  max-width: 640px;
`;

const PreviewText = styled.code`
  display: inline-block;
  width: -webkit-fill-available;

  height: 324px;
  max-height: 324px;
  padding: 16px;
  overflow: auto;

  background: ${Color.Neutral2};
  box-shadow: 8px 8px 10px #dfdfdf, -8px -8px 10px ${Color.White};
  border-radius: 8px;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.1125px;

  color: ${Color.Black};
`;

const PathText = styled.p`
  width: inherit;
  overflow: visible;
  white-space: normal;
  word-wrap: break-word;

  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 18.75px;
  letter-spacing: 0.15px;
  margin-top: 24px;

  color: ${Color.Black};
`;

interface Props {
  path: string[];
  children?: React.ReactNode;
}

const PreviewLane: FC<Props> = (props: Props) => {
  const { path, children } = props;
  const pathString = path.join(".");

  return (
    <LaneWrapper>
      <PreviewArea data-testid="preview-lane">
        <PreviewText>{children}</PreviewText>

        <PathText>{pathString}</PathText>
      </PreviewArea>
    </LaneWrapper>
  );
};

export default PreviewLane;
