import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { UserEntity } from '../../models/User';
import { UserService } from './service';

export class UserController {
  constructor() {}

  public async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const repository = getRepository(UserEntity);

    try {
      const user = await repository.findOne({ id: userId });
      return res.status(200).json({ data: user });
    } catch (error) {
      return res.status(400).json({ error: 'user not found' });
    }
  }

  public async createUser(req: Request, res: Response) {
    const { name, lastName, email } = req.body;

    if (!name || !lastName || !email) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const repository = getRepository(UserEntity);

    const userAlreadyExistis = await repository.findOne({ email });
    if (userAlreadyExistis) {
      return res.status(400).json({ error: 'user already exisits' });
    }

    const user = repository.create({ name, lastName, email });
    await repository.save(user);

    return res.status(200).json({ data: user });
  }

  // public patchUser(req: Request, res: Response) {
  //   const { userId } = req.params;
  //   const { name, lastName, email } = req.body;

  //   if (!userId) {
  //     return res.status(400).json({ error: 'missing id' });
  //   }

  //   if (!name || !lastName || !email) {
  //     return res.status(400).json({ error: 'missing properties' });
  //   }

  //   const user = mockedUser;
  //   const updatedUser = {
  //     ...user,
  //     name: name ? name : mockedUser.name,
  //     lastName: lastName ? lastName : mockedUser.lastName,
  //     email: email ? email : mockedUser.email,
  //   };

  //   return res.status(200).json(UserService.getRepresentation(updatedUser));
  // }
}
