import React from 'react';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetailPage';    
import Register from './pages/Register';    
import Login from './pages/Login';    
import UserProfile from './pages/UserProfilePage';    
import EditRecipe from './pages/EditRecipePage';    
import DeleteRecipe from './pages/DeleteRecipe';    
import AuthorsRecipes from './pages/UserRecipesPage';
import Dashboard from './pages/Dashboard';    
import Logout from './pages/Logout';    
import UserProvider from './context/userContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Recipes from './pages/Recipes';
import Chefs from './pages/Chefs' 
import SubscribeForm from './pages/SubscribeForm';
import CreateRecipePage from './pages/CreateRecipePage';
import UnSubscribe from './pages/UnSubscribe';

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserProvider><Layout/></UserProvider>,
    errorElement: <ErrorPage/>,
    children: [
      {index: true, element: <Home/>},
      {path: 'recipes', element: <Recipes/>},
      {path: 'chefs', element: <Chefs/>},
      {path: 'recipes/:id', element: <RecipeDetail/>},
      {path: 'register', element: <Register/>},
      {path: 'subscribe',element: <SubscribeForm/>},
      {path: 'unsubscribe',element: <UnSubscribe/>},
      {path: 'login', element: <Login/>},
      {path: 'profile/:id', element: <UserProfile/>},
      {path: 'create', element: <CreateRecipePage/>},
      {path: 'recipes/users/:id', element: <AuthorsRecipes/>},
      {path: 'myrecipes/:id', element: <Dashboard/>},
      {path: 'recipes/:id/edit', element: <EditRecipe/>},
      {path: 'recipes/:id/delete', element: <DeleteRecipe/>},
      {path: 'logout', element: <Logout/>},
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
