import { FC } from "react";
import styled from "styled-components";
import { FcFolder } from "react-icons/fc";
import { FcFile } from "react-icons/fc";
import { ReactComponent as RightIcon } from "../assets/right-icon.svg";
import { Color } from "../Theme";

const ListItemWrapper = styled.button<{ selected: boolean }>`
  height: 24px;
  width: 100%;
  border-width: 0;
  color: ${Color.Black};
  background: ${({ selected }) => (selected ? Color.Neutral5 : Color.Neutral3)};
  opacity: ${({ selected }) => (selected ? 0.6 : 1)};

  :hover {
    background: ${Color.Neutral5};
    mix-blend-mode: normal;
    opacity: 0.3;
    cursor: pointer;
    color: ${Color.Black};
  }

  :focus {
    color: ${Color.White};
    background: ${Color.Pink2};
    opacity: 1;
  }

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
  padding: 0 4px 0 9px;
`;

const Title = styled.div`
  width: 190px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;

  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  letter-spacing: 0.121875px;
`;

interface Props {
  isFolder: boolean;
  selected: boolean;
  children?: React.ReactNode;
  onExpand: () => void;
  onShowPreview: (value: boolean) => void;
}

const ListItem: FC<Props> = (props: Props) => {
  const { isFolder, selected, children, onExpand, onShowPreview } = props;

  const handleClick = () => {
    onExpand();
    if (!isFolder) {
      onShowPreview(true);
    } else {
      onShowPreview(false);
    }
  };

  return (
    <ListItemWrapper
      data-testid={`item-${children}`}
      selected={selected}
      onClick={handleClick}
    >
      {isFolder ? <FcFolder /> : <FcFile />}
      <Title>{children}</Title>
      {isFolder && <RightIcon />}
    </ListItemWrapper>
  );
};

export default ListItem;
