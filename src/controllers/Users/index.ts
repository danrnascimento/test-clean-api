import { Request, Response } from 'express';
import { IUserController } from '../../core/user/controller';
import userRepository from '../../repositories/Users';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class UserController implements IUserController {
  public async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = userRepository();

    try {
      const user = await repository.findOne({ id: userId });
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(400).json({ error: 'user not found' });
    }
  }

  public async createUser(req: Request, res: Response) {
    const { name, last_name, email, password } = req.body;

    if (!name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = userRepository();

    const userAlreadyExistis = await repository.findOne({ email });
    if (userAlreadyExistis) {
      return res.status(400).json({ error: 'user already exisits' });
    }

    const user = repository.create({ name, last_name, email, password });
    await repository.save(user);

    return res.status(200).json({ data: user });
  }

  public async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = userRepository();

    const user = await repository.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'wrong password' });
    }

    const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

    return res.status(200).json({ data: user, token });
  }
}
