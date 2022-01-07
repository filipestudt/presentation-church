import React, { useContext } from 'react';
import { Routes, Route, Link } from "react-router-dom";
import { ThemeProvider } from 'styled-components'
import ThemeContext from './contexts/ThemeContext';
import { Wrapper, Row } from './AppStyle';
import SideBar from './components/SideBar';
import Home from './pages/Home';

function App() {
  const { style } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={style}>
      <Wrapper>
        {/* <Header /> */}
        <Row>
          <SideBar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Row>
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
