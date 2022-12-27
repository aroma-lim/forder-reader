import styled from "styled-components";
import "./App.css";
import Header from "./components/Header";
import LaneView from "./components/LaneView";
import { Provider } from "react-redux";
import { FC } from "react";
import { store } from "./store/store";

const Body = styled.div`
  position: relative;
  top: 48px;
  left: 0;
  display: flex;
  flex-direction: row;
  height: calc(100vh - 59px);
  width: 100vw;
`;

const App: FC<{ store: typeof store }> = ({ store }) => {
  return (
    <Provider store={store}>
      <Header />
      <Body>
        <LaneView />
      </Body>
    </Provider>
  );
};

export default App;
