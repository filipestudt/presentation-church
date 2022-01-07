import React from 'react';
import { Wrapper } from './styles';
import SongsList from '../../components/SongsList';

function Home() {
  
  const onSongClick = function(songId: string) {
    console.log(songId);
  }

  return (
    <Wrapper>
      <SongsList onSongClick={onSongClick}/>
    </Wrapper>
  )
}

export default Home;