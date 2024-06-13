import React, { useState, useContext, useEffect } from "react";
import photo from '../assets/photo.svg';
import defaultImage from '../assets/image.png';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import remove from '../assets/cancel.svg';
import Loader from "../components/Loader";
import ErrorCompo from "../components/ErrorCompo";

const CreateRecipePage = () => {
  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState(["", "", ""]);
  const [instructions, setInstructions] = useState("");
  const [isPureVeg, setIsPureVeg] = useState(false);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [source, setSource] = useState("");

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };

  const addIngredientInput = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredientInput = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
  };

  const createRecipePage = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const recipeData = new FormData();
    recipeData.append('title', title.trim());
    recipeData.append('thumbnail', thumbnail);
    recipeData.append('description', description.trim());
    recipeData.append('instructions', instructions.trim());
    recipeData.append('isPureVeg', isPureVeg);

    const filteredIngredients = ingredients.filter(ingredient => ingredient.trim() !== "");
    recipeData.append('ingredients', JSON.stringify(filteredIngredients));
    console.log(recipeData)
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/recipes`,
        recipeData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (response.status === 201) {
        setIsLoading(false);
        navigate("/");
      } else {
        setIsLoading(false);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred');
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="create-recipe mt-16 p-3 pt-16 flex justify-center">
      <div className="create-container flex-shrink-0">
        <h2 className="text-center text-3xl pb-5">Create Recipe</h2>
        {error && <ErrorCompo err={error} />}
        <form
          action=""
          className="form create-recipe__form flex flex-col gap-2"
          onSubmit={createRecipePage}
        >
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <label htmlFor="thumbnail">Thumbnail</label>
          <label className="file-upload cursor-pointer flex flex-wrap justify-between items-center gap-3" htmlFor="thumbnail">
            <img className="ml-5" src={photo} alt="" />
            <input
              className="hidden"
              id="thumbnail"
              type="file"
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
                e.target.files[0] ? setSource(URL.createObjectURL(e.target.files[0])) : setSource("");
              }}
              accept="image/png, image/jpeg"
            />
            <img className="banner w-56 h-56 cursor-pointer" src={source ? source : defaultImage} alt="thumbnail" />
          </label>
          <label htmlFor="description">Description</label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            placeholder="Description"
          />
          <div className="ingredients-container">
            <label className="mb-3" htmlFor="ingredients">Ingredients</label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-input flex flex-nowrap">
                <input
                  id="ingredients"
                  type="text"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                {index > 2 && (
                  <button
                    type="button"
                    onClick={() => removeIngredientInput(index)}
                    className="remove-ingredient flex items-center justify-center pb-4"
                  >
                    <img className="inline-block ml-1" src={remove} alt="" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <button type="button" onClick={addIngredientInput} className="add-ingredient">
            Add Ingredient
          </button>
          <label htmlFor="instructions">Instructions</label>
          <ReactQuill
            className="mb-3"
            id="instructions"
            value={instructions}
            onChange={setInstructions}
            placeholder="Instructions"
          />
          <label className="flex items-start gap-3">
            <input
              id="check-box"
              type="checkbox"
              checked={isPureVeg}
              onChange={(e) => setIsPureVeg(e.target.checked)}
            />
            Pure Veg
          </label>
          <button type="submit" className="btn primary create-btn">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateRecipePage;
