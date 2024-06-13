import React, { useEffect, useState } from "react";
import veg from "../assets/icons8-vegetarian-mark.svg";
import axios from "axios";

const ChefCard = ({ chef }) => {
  const [recipes, setRecipes] = useState([]);
  const [totalLikes, setTotalLikes] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        const getRecipes = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes`
        );
        setRecipes(getRecipes?.data);
      } catch (error) {
        console.log("failed to fetch details of chef and total likes", error);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (recipes && chef?._id) {
      const likes = recipes
        .filter((recipe) => recipe.createdBy === chef._id)
        .reduce((acc, curr) => acc + curr.likes.length, 0);
      console.log(likes);
      setTotalLikes(likes);
    }
  }, [recipes, chef]);

  return (
    <section className="card flex items-end shrink-0 mb-10 cursor-default">
      <div className="card-content rounded-md">
        <div className="card-details flex flex-col gap-5 items-center justify-center">
          <p className="text-lg">{chef?.name}</p>
          <p>Recipes: {chef?.recipes}</p>
          <small>Likes: {totalLikes && totalLikes}</small>
          {chef?.ispureveg && <img src={veg} alt="" />}
        </div>
        <div className="img-div">
          <img
            src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${chef?.avatar}`}
            alt=""
          />
        </div>
      </div>
    </section>
  );
};

export default ChefCard;
