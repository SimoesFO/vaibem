import { format } from 'date-fns';
import Store from '../models/Store';
import TypeStoreView from '../types/TypeStoreView';

export default {
  render(item: Store): TypeStoreView {
    return {
      id: item.id,
      name: item?.name,
      description: item?.description,
      uf: item?.uf,
      city: item?.city,
      user: {
        name: item?.user?.name,
      },
      createdAt: item.createdAt
        ? format(item.createdAt, 'yyyy-MM-dd HH:mm:ss')
        : item.createdAt,
      updatedAt: item.updatedAt
        ? format(item.updatedAt, 'yyyy-MM-dd HH:mm:ss')
        : item.updatedAt,
    };
  },

  renderMany(items: Store[]): TypeStoreView[] {
    return items.map(item => this.render(item));
  },
};
