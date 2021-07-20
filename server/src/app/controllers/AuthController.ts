import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import UserView from '../view/UserView';

export default {
  async authenticate(req: Request, res: Response): Promise<Response> {
    const repository = getRepository(User);
    const { email, password } = req.body;

    const user = await repository.findOne({ where: { email } });

    if (!user) return res.sendStatus(401);

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.sendStatus(401);

    const token = jwt.sign({ id: user.id }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: '1d',
    });

    const userView = UserView.render(user);
    const result = { user: userView, token };

    return res.json(result);
  },
};
