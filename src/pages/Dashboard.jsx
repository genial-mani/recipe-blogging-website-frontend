import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import ErrorCompo from "../components/ErrorCompo";

const Dashboard = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const navigate = useNavigate();
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  },[]);

  useEffect(() => {
    const getUserRecipes = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/${id}/dashboard`,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRecipes(response?.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.response?.data?.message);
        setIsLoading(false);
      }
    };

    getUserRecipes();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="mt-16 dashboard-section p-3">
      <h2 className="text-gray-100 mb-3">My Recipes</h2>
        {error && <ErrorCompo err={error}/>}
      <div className="dashboard-section-div flex flex-wrap gap-3 p-3">
        {recipes?.length > 0 ? (
          recipes?.map((recipe, index) => {
            return <RecipeCard key={index} recipe={recipe} />;
          })
        ) : (
          <div className="no-recipes-div-dashboard grid place-items-center">
            <h2 className=" text-gray-100">No recipes found.</h2>
            <Link
              to={"/create"}
              className="dashboard-add-recipe grid place-items-center"
            >
              Add Recipe
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;
