import axios from "axios";
import React, { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import Loader from "../components/Loader";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes`
        );
        setRecipes(response.data);
        if(recipes){
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  },[]);
  return (
    <div className="mt-16">
      <div className="home-recipes">
        <h2 className="pl-3">All Recipes</h2>
        <div className=" flex gap-7 flex-wrap p-3 items-center justify-center ">
          {recipes.length > 0 ? (
            recipes?.map((recipe,index) => {
              return <RecipeCard key={index} recipe={recipe} />;
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
