import { ResolveFn } from '@angular/router';
import { User } from '../models/user.model';

export const userResolver: ResolveFn<User> = (route) => {
  const id = route.paramMap.get('id');
  console.log('Resolver corriendo, ID:', id);

  return Promise.resolve({
    id: Number(id),
    name: `User ${id}`,
    email: `user${id}@test.com`,
    role: 'viewer',
    isActive: true,
  });
};
