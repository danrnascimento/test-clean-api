import { Request, Response } from 'express';
import { IUserCases } from '../../useCases/User';
import jwt from 'jsonwebtoken';

export class UserController {
  private userCases: IUserCases;

  constructor(userCases: IUserCases) {
    this.userCases = userCases;
  }

  public async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: 'missing id' });
    }

    const user = await this.userCases.getUser(userId);

    if (!user) {
      return res.status(400).json({ error: 'user not found' });
    }

    return res.status(200).json({ data: user });
  }

  public createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    try {
      const user = await this.userCases.createUser({
        email,
        password,
        name,
      });

      return res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error });
    }
  };

  public async authenticate(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'missing properties' });
    }

    const authenticated = await this.userCases.authenticate(email, password);

    if (!authenticated) {
      return res.status(401).json({ error: 'wrong credentials' });
    }

    const token = jwt.sign({}, 'secret', { expiresIn: '1d' });
    return res.status(200).json({ data: token });
  }
}
