import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const {currentUser} = useContext(UserContext);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes`
        );
        setRecipes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  });

  return (
    <div className="mt-16">
      <div className="home-container flex justify-end p-5">
        <div className="home-content">
          <h2 className=" text-gray-300">
            MAKE YOUR <h2 className="text-amber-500">DREAM FOOD</h2> WITH US{" "}
          </h2>
          <div className="links flex items-center flex-wrap justify-around gap-24 text-xl">
            {!currentUser?.id && (
              <Link to={"/register"}>
                <div className="links-2 text-slate-300">Join Community</div>
              </Link>
            )}
            <Link to={"/recipes"}>
              <div className="links-1">Explore Recipes</div>
            </Link>
          </div>
        </div>
      </div>
      <h2 className="latest-fea py-5 text-center font-semibold bg-slate-900 text-amber-400">
        Latest Featured Recipes
      </h2>
      <div className="home-recipes flex gap-7 flex-wrap items-center justify-center">
        {recipes.length > 0 ? (
          recipes.slice(0, 10)?.map((recipe) => {
            return <RecipeCard recipe={recipe} />;
          })
        ) : (
          <Loader />
        )}

        <Link
          to={"/recipes"}
          className="more-res px-5 py-2 text-center text-gray-700 bg-yellow-500 rounded-md"
        >
          More recipes &gt;
        </Link>
      </div>
    </div>
  );
};

export default Home;
