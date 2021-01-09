import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  res.send('Auth');
});

router.get('/:userId', (req, res) => {
  res.send('Users');
});

export default router;
