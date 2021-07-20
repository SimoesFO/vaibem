import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import UserView from '../view/UserView';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);

    const users = await repository.find();

    if (users.length === 0)
      return res.status(404).json({ message: 'No users found' });

    return res.json(UserView.renderMany(users));
  },

  async show(req: Request, res: Response): Promise<Response> {
    const repository = getCustomRepository(UserRepository);
    const { id } = req.params;

    const user = await repository.findOne(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.json(user.getView());
  },

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body as User;

    const { email } = data;
    const repository = getCustomRepository(UserRepository);
    const userExists = await repository.findOne({ where: { email } });

    if (userExists)
      return res.status(409).json({ message: 'User already exists' });

    const user = repository.create(data);
    await validateOrReject(user);
    await repository.save(user);

    return res.status(201).json(user.getView());
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findOne(id, { select: ['id'] });

    if (!user) return res.status(401).json({ message: 'User not found' });

    if (user.id !== req.userId)
      return res.status(401).json({
        message: 'The token doesnt belong to the informed user',
      });

    const newUser = repository.create({ ...user, ...req.body } as User);
    await validateOrReject(newUser);
    await repository.save(newUser);

    return res.json(newUser.getView());
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repository = getCustomRepository(UserRepository);
    const user = await repository.findOne(id);

    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.id !== req.userId)
      return res.status(401).json({
        message: 'The token doesnt belong to the informed user',
      });

    await repository.remove(user);

    return res.json(user.getView());
  },
};
