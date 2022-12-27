import { FC } from "react";
import styled from "styled-components";
import { Color } from "../Theme";

const ButtonWrapper = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 4px;
  min-width: 72px;

  background: ${Color.Pink1};
  box-shadow: 0px 1px 4px rgba(255, 200, 221, 0.1),
    0px 2px 4px rgba(255, 200, 221, 0.3);
  border-radius: 14px;
  border-block: none;
  border-inline: none;

  font-style: normal;
  font-weight: 700;
  font-size: 13px;
  line-height: 16px;

  letter-spacing: 0.121875px;
  color: ${Color.White};

  :hover {
    background: ${Color.Pink2};
    cursor: pointer;
  }

  :active {
    background: ${Color.Pink1};
    box-shadow: none;
    cursor: pointer;
  }
`;

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  onClick: React.MouseEventHandler<HTMLElement>;
  children?: React.ReactNode;
}

const Button: FC<Props> = (props: Props) => {
  const { children, ...otherProps } = props;
  return <ButtonWrapper {...otherProps}>{children}</ButtonWrapper>;
};

export default Button;
