import { EntityRepository, Repository } from 'typeorm';
import Store from '../models/Store';

@EntityRepository(Store)
class StoreRepository extends Repository<Store> {}

export default StoreRepository;
