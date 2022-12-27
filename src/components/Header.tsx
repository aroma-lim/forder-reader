import styled from "styled-components";
import { Color } from "../Theme";
import ImportButton from "./ImportButton";
import { FcOpenedFolder } from "react-icons/fc";

const HeaderWrapper = styled.div`
  position: fixed;
  height: 48px;
  left: 0px;
  right: 0px;
  top: 0px;

  background: ${Color.White};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);

  display: flex;
  align-items: center;
  padding-left: 16px;
  gap: 12px;
  z-index: 100;
`;

const HeaderTitle = styled.h3`
  color: ${Color.Pink1};
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <FcOpenedFolder />
      <HeaderTitle>Forder Reader</HeaderTitle>
      <ImportButton />
    </HeaderWrapper>
  );
};

export default Header;
