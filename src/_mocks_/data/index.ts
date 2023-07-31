import { factory } from '@mswjs/data';

import { usersFactory, usersMock } from './users';

export const db = factory({
  users: usersFactory,
});

usersMock.forEach((user, i) => db.users.create({ id: i + 1, ...user }));
