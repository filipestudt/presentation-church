import React from "react";
import styled from 'styled-components';
import { metrics } from "../../styles";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${metrics.xg}px 0px;
    border-radius: ${metrics.borderRadius};
    background-color: ${({ theme }) => theme.contentBackground};
    height: calc(100vh - ${metrics.navBarHeight} - ${metrics.xg * 2}px);
`;

export const SongsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    overflow-x: auto;
`

export const Song = styled.span`
    width: 90%;
    padding: 10px 15px;
    font-size: 13pt;
    border-bottom: 1px solid rgba(0,0,0,.085);
`

export const Folder = styled.select`
    width: 80%;
    margin: 20px 0px;
    padding: 5px;
`

export { }

