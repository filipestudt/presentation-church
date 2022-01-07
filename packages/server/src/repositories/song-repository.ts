import StormDB from 'stormdb';
import path from 'path';
import { nanoid } from 'nanoid';
import { ISongDTO } from "../../../shared/DTOs/ISongDTO";

const engine = new StormDB.localFileEngine(path.resolve(__dirname, '..', 'database', 'songs.stormdb'));
const database = new StormDB(engine);
const db = database.get("songs");

export const get = () => {
  return db.value();
}

export const getById = (id: ISongDTO['id']) => {
  return db.value().filter((song: ISongDTO) =>
    song.id === id
  );
}

export const getByFolder = (folderId: ISongDTO['folderId']) => {
  return db.value().filter((song: ISongDTO) =>
    song.folderId === folderId
  );
}

export const create = (newSong: ISongDTO) => {
  newSong.id = nanoid();
  db.push(newSong);
  db.save();
}

export const update = (songId: ISongDTO['id'], data: ISongDTO) => {
  db.map((song: ISongDTO) => {
    if (song.id == songId) {
      song = data;
    }
    return song;
  })
  .save();
}

export const remove = (songId: ISongDTO['id']) => {
  db.filter((song: ISongDTO): song is ISongDTO => 
    song.id != songId
  )
  .save();
}