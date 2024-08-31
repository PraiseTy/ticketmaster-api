import { createArtist } from '../controllers/artist';
import express from 'express';

const router = express.Router();

router.post('/artists', createArtist);

export default router;
