import { validateOrReject } from 'class-validator';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import Store from '../models/Store';
import StoreRepository from '../repositories/StoreRepository';
import UserRepository from '../repositories/UserRepository';
import StoreView from '../view/StoreView';

export default {
  async index(req: Request, res: Response): Promise<Response> {
    const repository = getCustomRepository(StoreRepository);
    const stores = await repository.find();

    if (stores.length === 0)
      return res.status(404).json({ message: 'No store found' });

    return res.json(StoreView.renderMany(stores));
  },

  async show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repository = getCustomRepository(StoreRepository);
    const store = await repository.findOne(id);

    if (!store) return res.status(404).json({ message: 'Store not found' });

    return res.json(store.getView());
  },

  async create(req: Request, res: Response): Promise<Response> {
    const data = req.body;
    const { userId } = req; // Middleware

    const repoUser = getCustomRepository(UserRepository);
    const user = await repoUser.findOne(userId);

    if (!user) return res.status(404).json({ message: 'User not found' });

    const repository = getCustomRepository(StoreRepository);
    const store = repository.create({ ...data, user } as Store);
    await validateOrReject(store);
    await repository.save(store);

    return res.status(201).json(store.getView());
  },

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const repository = getCustomRepository(StoreRepository);
    const store = await repository.findOne(id, { select: ['id'] });

    if (!store) return res.status(401).json({ message: 'Store not found' });

    const newStore = repository.create({ ...store, ...req.body } as Store);
    await validateOrReject(newStore);
    await repository.save(newStore);

    return res.json(newStore.getView());
  },

  async destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const repository = getCustomRepository(StoreRepository);
    const store = await repository.findOne(id);

    if (!store) return res.status(404).json({ message: 'Store not found' });

    await repository.remove(store);

    return res.json(store.getView());
  },
};
