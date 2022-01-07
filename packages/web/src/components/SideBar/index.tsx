import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Wrapper, Svg, Icon } from './styles';
import data from './data';

function SideBar() {
  const [selected, setSelected] = useState();

  const handleClick = (e: any) => {
    setSelected(e.link);
  }

  return (
    <Wrapper>
      {
        data.map((e) => (
          <Icon isSelected={e.link == selected} onClick={() => handleClick(e)} key={e.link}>
            <Link to={e.link}>
              {e.svg}
            </Link>
          </Icon>
        ))
      }
    </Wrapper>
  )
}

export default SideBar;