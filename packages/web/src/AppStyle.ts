import styled from "styled-components";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.background};
`

const Row = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
`

export { Wrapper, Row }