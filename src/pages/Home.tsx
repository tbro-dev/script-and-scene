import { useEffect, useState } from 'react';
import { fetchUser } from '../services/api';
import type { User } from '../types';

export function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadUser() {
      try {
        const data = await fetchUser();

        if (active) {
          setUser(data);
        }
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : 'An unknown error occurred',
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadUser();

    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    return (
      <main className="page">
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="page">
        <p className="error">{error}</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page">
        <p>No user found.</p>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Welcome</h1>

      <p>
        Your React + TypeScript + Vite application is
        working correctly.
      </p>

      <section className="card">
        <h2>User</h2>

        <p>
          <strong>Name:</strong> {user.name}
        </p>

        <p>
          <strong>Email:</strong> {user.email}
        </p>

        <p>
          <strong>Website:</strong> {user.website}
        </p>
      </section>
    </main>
  );
}
