import { Router } from 'express';

import { redis } from '../cache';
import { User } from '../entity/User';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const userID = await redis.get(id);
  if (userID) {
    await User.update({ id: userID }, { confirmed: true });
    res.send('ok');
  } else {
    res.status(404).send('User not found');
  }
});

export default router;
