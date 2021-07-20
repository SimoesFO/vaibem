type TypeStoreView = {
  id: string;
  name: string;
  description: string;
  uf: string;
  city: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  user: {
    name: string;
  };
};

export default TypeStoreView;
