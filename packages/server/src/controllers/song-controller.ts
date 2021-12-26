import * as repository from '../repositories/song-repository';

export const get = async (req, res, next) => {
  try {
    let data = await repository.get();
    res.status(200).send(data);
  }
  catch(err) {
    res.status(500).send({    
      message: 'Unexpected error. ' + err
    })
  }
}

export const getByFolder = async (req, res, next) => {
  try {
    let data = await repository.getByFolder(req.params.folder);
    res.status(200).send(data);
  }
  catch(err) {
    res.status(500).send({
      message: 'Unexpected error. ' + err
    })
  }
}

export const create = async (req, res, next) => {
  try {
    await repository.create(req.body);
    res.status(200).send();
  }
  catch(err) {
    res.status(500).send({    
      message: 'Unexpected error. ' + err
    })
  }
}

export const update = async (req, res, next) => {
  try {
    await repository.update(req.params.id, req.body);
    res.status(200).send();
  }
  catch(err) {
    res.status(500).send({    
      message: 'Unexpected error. ' + err
    })
  }
}

export const remove = async (req, res, next) => {
  try {
    await repository.remove(req.params.id);
    res.status(200).send();
  }
  catch(err) {
    res.status(500).send({    
      message: 'Unexpected error. ' + err
    })
  }
}