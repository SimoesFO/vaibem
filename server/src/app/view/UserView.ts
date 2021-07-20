import { format } from 'date-fns';
import User from '../models/User';
import TypeUserView from '../types/TypeUserView';

export default {
  render(item: User): TypeUserView {
    return {
      id: item.id,
      name: item?.name,
      email: item?.email,
      createdAt: item.createdAt
        ? format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')
        : item.createdAt,
      updatedAt: item.updatedAt
        ? format(item.updatedAt, 'yyyy-MM-dd HH:mm:ss')
        : item.updatedAt,
    };
  },

  renderMany(items: User[]): TypeUserView[] {
    return items.map(item => this.render(item));
  },
};
