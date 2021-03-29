import { Request, Response } from 'express';
import { IUserController } from '../../core/user/controller';
import userRepository from '../../repositories/Users';

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
    const { name, last_name, email } = req.body;

    if (!name || !last_name || !email) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = userRepository();

    const userAlreadyExistis = await repository.findOne({ email });
    if (userAlreadyExistis) {
      return res.status(400).json({ error: 'user already exisits' });
    }

    const user = repository.create({ name, last_name, email });
    await repository.save(user);

    return res.status(200).json({ data: user });
  }
}
