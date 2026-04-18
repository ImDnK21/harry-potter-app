import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import { Header } from './shared/header/Header';
import { Footer } from './shared/footer/Footer';
import { Home } from './home/Home';

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <Home /> },
    ],
  },
]);

export const App = () => <RouterProvider router={router} />;
