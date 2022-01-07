import React, { useEffect, useState } from 'react';
import { Wrapper } from './styles';
import { Songs } from '../../services/api';
import { ISongDTO } from '../../../../shared/DTOs/ISongDTO';
import { useParams } from 'react-router-dom';

const SongEditor: React.FC = () => {
  const [song, setSong] = useState({});
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      loadSong();
    }
  }, [])

  const loadSong = async () => {
    try {
      let res = await Songs.getById(id + '');
      setSong(res);
    }
    catch (err) {

    }
  }

  return (
    <Wrapper>

    </Wrapper>
  )
}

export default SongEditor;
