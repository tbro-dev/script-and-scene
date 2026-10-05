import { createBrowserRouter } from 'react-router-dom';
import { routes } from '../routes';

function RouteError() {
  return (
    <main className="page">
      <h1>Something went wrong</h1>
      <p>The requested page could not be displayed.</p>
    </main>
  );
}

export const router = createBrowserRouter(
  routes.map((route) => ({
    ...route,
    errorElement: <RouteError />,
  })),
);
