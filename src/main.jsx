import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import MainLayout from "./layouts/MainLayout";
import Users from "./components/Users";
import App from "./App";
import UserDetails from "./components/UserDetails";
import UpdateUser from "./components/UpdateUser";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: App },
      {
        path: 'users/:id',
        loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
        Component: UserDetails,
      },
      {
        path: '/update/:id',
        loader: ({params}) => fetch(`http://localhost:3000/users/${params.id}`),
        Component: UpdateUser,
      }
    ],
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />,
);
