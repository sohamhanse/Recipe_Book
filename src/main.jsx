// index.js or index.jsx
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import Login_Page from "./components/Login/Login_Page";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";
import User_Recipe from "./components/User_Recipe/User_Recipe";
import Add_Recipe from "./components/Add_Recipe/Add_Recipe.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDatail.jsx";
import { UserProvider } from "./components/User_Contect.jsx";
import DefaultDetail from "./components/RecipeDetail/DefaultDetail.jsx"
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Login_Page /> },
      { path: "/signup", element: <Register /> },
      { path: "/Home", element: <Home /> },
      { path: "/Your Recipes", element: <User_Recipe /> },
      { path: "/Add Recipe", element: <Add_Recipe /> },
      { path: "/recipe/:id", element: <RecipeDetail /> },
      { path: "/Default/:name", element: <DefaultDetail/> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
