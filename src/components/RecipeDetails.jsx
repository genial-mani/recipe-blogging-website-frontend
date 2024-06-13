import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { Link, useParams } from "react-router-dom";
import Loader from "./Loader";
import ReactTimeAgo from "react-time-ago";
import TimeAgo from "javascript-time-ago";
import veg from "../assets/veg-11550711253oulno8mnhz.png";

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import DeleteRecipe from "../pages/DeleteRecipe";
import Like from "./Like";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const RecipeDetails = () => {
  const [recipe, setRecipe] = useState(null);
  const [chef, setChef] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [ingredients,setIngredients] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      try {
        setIsLoading(true);
        const recipeResponse = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/${id}`
        );
        setRecipe(recipeResponse?.data);
        setIngredients(recipeResponse?.data?.ingredients);
        if(recipe){
          console.log(recipe);    
        }
        const chefResponse = await axios.get( 
          `${process.env.REACT_APP_BASE_URL}/users/${recipeResponse.data.createdBy}`
        );
        setChef(chefResponse?.data);
        setIsLoading(false);
      } catch (err) {
        setError(err.recipeResponse?.message);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);



  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="recipe-detail-wrapper-div flex items-center justify-center p-5">
      <div className="recipe-details flex flex-col gap-3">
        {error && (
          <div className="error-details-div flex justify-center items-center">
            {error}
          </div>
        )}
        <div className="author-details-div flex items-center">
          <div className="author-details-img flex items-center gap-5">
            <img
              className="rounded-full"
              src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${chef?.avatar}`}
              alt={`avatar-${chef?.avatar}`}
            />
            <h2>{chef?.name}</h2>
          </div>
          <div className="author-details-createdAt flex items-center justify-center gap-2">
            Created:
            {recipe?.createdAt && (
              <small>
                <ReactTimeAgo
                  date={new Date(recipe?.createdAt)}
                  locale="en-US"
                />
              </small>
            )}
          </div>
        </div> 
        {currentUser?.id === recipe?.createdBy && (
          <div className="recipe-ud-links flex items-center justify-center gap-12">
            <Link to={`/recipes/${id}/edit`} className="recipe-edit-button">Edit</Link>
            <DeleteRecipe recipeId={id}/>
          </div>
        )}
        <div className="stick rounded-md fill-yellow-300 "></div>
        <div className="recipe-details-img-div flex items-center justify-center">
          <img
          title="thumbnail"
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${recipe?.thumbnail}`}
            alt="thumbnail"
          />
        </div>
        <h2 className="recipe-detail-title font-semibold flex items-center justify-between gap-5 pr-5">{recipe?.title} {recipe?.isPureVeg && <img className="w-8 h-8" src={veg}></img>}<Like recipe={recipe}/></h2>
        <p
          className="font-thin"
          dangerouslySetInnerHTML={{ __html: recipe?.description }}
        ></p>
        <div className="ingredients-details flex flex-col gap-1">
          <h2 className="font-semibold">Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => {
              return <li key={index}>{`${index + 1}. ${item}`}</li>;
            })}
          </ul>
        </div>
        <div className="recipe-detail-instructions flex flex-col gap-1">
          <h2 className="font-semibold">Instuctions</h2>
          <div dangerouslySetInnerHTML={{ __html: recipe?.instructions }}></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
