import { Request, Response } from 'express';
import { Artist } from '../entity/artist';
import { HTTP_ERRORS } from '../utils/constants';
import { handleGetRepository } from '../utils/handle-get-repository';

export const createArtist = async (req: Request, res: Response) => {
  const artist = req.body;
  const ArtistRepo = handleGetRepository(Artist);
  const newArtist = ArtistRepo.create(artist);
  const saveArtist = await ArtistRepo.save(newArtist);

  return res.status(HTTP_ERRORS.CREATED).json({ message: 'Artist created successfully', data: saveArtist });
};
