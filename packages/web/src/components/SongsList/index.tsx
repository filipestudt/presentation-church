import React, { useEffect, useState } from 'react'
import { Songs } from '../../services/api';
import { ISongDTO } from '../../../../shared/DTOs/ISongDTO';
import { Folder, Song, SongsWrapper, Wrapper } from './styles';

interface Props {
  onSongClick: Function;
}

const SongsList: React.FC<Props> = (props: Props) => {
  const [presentations, setPresentations] = useState(Array<ISongDTO>());
  const [folder, setFolder] = useState('2');

  useEffect(() => {
    getData();
  }, [folder])

  const getData = async () => {
    try {
      var data = await Songs.getByFolder(folder);
      console.log(data[0])
      setPresentations(data);
    } catch (err) { console.log(err) }
  }

  return (
    <Wrapper>
      <Folder value={folder} onChange={(evt) => setFolder(evt.target.value)}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </Folder>
      <SongsWrapper>
        {
          presentations.map(song => (
            <Song id={song.id}
              key={song.id}
              onClick={() => props.onSongClick(song.id)}>
              {song.name}
            </Song>
          ))
        }
      </SongsWrapper>
    </Wrapper>
  )
}

export default SongsList;