import express from 'express';

const router = express.Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('email and password are required');
  }

  return res.status(200).send('authenticated');
});

export default router;
