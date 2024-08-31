import { Request, Response } from 'express';
import { Artist } from '../entity/artist';
import { DataSource } from 'typeorm';
import { AppDataSource } from '../data-source';
import { HTTP_ERRORS } from '../utils/constants';

export const createArtist = async (req: Request, res: Response) => {
  const artist = req.body;
  const ArtistRepo = AppDataSource.getRepository(Artist);
  const newArtist = ArtistRepo.create(artist);
  const saveArtist = await ArtistRepo.save(newArtist);

  return res.status(HTTP_ERRORS.CREATED).json({ message: 'Artist created successfully', data: saveArtist });
};
