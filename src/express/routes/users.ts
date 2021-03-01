import express from 'express';
import User from '../../core/entities/user';
import UserCases from '../../core/usecases/user';

const router = express.Router();
const mockedUser = UserCases.createUser({
  name: 'Daniel',
  lastName: 'Nascimento',
  email: 'danrnascimento@gmail.com',
  password: '1234',
});

router.get('/:userId', (req, res) => {
  const user = mockedUser;

  res.status(200).send(UserCases.getRepresentation(user));
});

router.post('/', (req, res) => {
  const { name, lastName, email, password } = req.body as Partial<User>;

  if (!name || !lastName || !email || !password) {
    return res.status(400).send('missing properties');
  }

  const user = UserCases.createUser({ name, lastName, email, password });
  res.status(200).send(UserCases.getRepresentation(user));
});

router.patch('/', (req, res) => {
  const user = mockedUser;
  const { name, lastName, email, password } = req.body as Partial<User>;

  const updatedUser = {
    ...user,
    name: name ? name : mockedUser.name,
    lastName: lastName ? lastName : mockedUser.lastName,
    email: email ? email : mockedUser.email,
    password: password ? password : mockedUser.password,
  };

  res.status(200).send(UserCases.getRepresentation(updatedUser));
});

export default router;
