import type { User } from '../types';

export async function fetchUser(): Promise<User> {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/users/1',
  );

  if (!response.ok) {
    throw new Error(
      `Request failed with status ${response.status}: ${response.statusText}`,
    );
  }

  return response.json() as Promise<User>;
}
