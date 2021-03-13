import { Request, Response } from 'express';
import { User } from './entity';
import { UserService } from './service';

const mockedUser = UserService.createUser({
  name: 'Daniel',
  lastName: 'Nascimento',
  email: 'danrnascimento@gmail.com',
  password: '1234',
});

export class UserController {
  public getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'missing id' });
    }

    res.status(200).json({ data: UserService.getRepresentation(mockedUser) });
  }

  public createUser(req: Request, res: Response) {
    const { name, lastName, email, password } = req.body as Partial<User>;

    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const user = UserService.createUser({ name, lastName, email, password });
    res.status(200).json(UserService.getRepresentation(user));
  }

  public patchUser(req: Request, res: Response) {
    const user = mockedUser;
    const { name, lastName, email, password } = req.body as Partial<User>;

    const updatedUser = {
      ...user,
      name: name ? name : mockedUser.name,
      lastName: lastName ? lastName : mockedUser.lastName,
      email: email ? email : mockedUser.email,
      password: password ? password : mockedUser.password,
    };

    res.status(200).json(UserService.getRepresentation(updatedUser));
  }
}
