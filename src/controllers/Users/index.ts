import { Request, Response } from 'express';
import { IUserController } from '../../core/user/controller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserRepository from '../../repositories/Users';

export class UserController implements IUserController {
  public async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = UserRepository();
    const user = await repository.getUserById(userId);

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    return res.status(200).json({ data: user });
  }

  public async createUser(req: Request, res: Response) {
    const { name, last_name, email, password } = req.body;

    if (!name || !last_name || !email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = UserRepository();

    try {
      const user = await repository.createUser({
        email,
        password,
        name,
        last_name,
      });

      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public async auth(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = UserRepository();

    try {
      const user = await repository.checkUserCredentials(email, password);
      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });
      return res.status(200).json({ data: user, token });
    } catch (error) {
      return res.status(401).json({ error });
    }
  }
}
