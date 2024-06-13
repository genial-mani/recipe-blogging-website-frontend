import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import photo from "../assets/photo.svg";
import defaultImage from "../assets/image.png";
import ReactQuill from "react-quill";
import remove from '../assets/cancel.svg';
import { UserContext } from "../context/userContext";
import Loader from "../components/Loader";
import ErrorCompo from "../components/ErrorCompo";



const EditRecipePage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [recipe, setRecipe] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions,setInstructions] = useState('');
  const [isPureVeg, setIsPureVeg] = useState(false);
  const [source, setSource] = useState("");
  const [isLoading,setIsLoading] = useState(false);

  const navigate = useNavigate();

  const [error, setError] = useState("");
  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;


  const handleIngredientChange = (index,value)=>{
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }

  const addIngredientInput = ()=>{
    setIngredients([...ingredients, ""]);
  }

  const removeIngredientInput = (index)=>{
    const newIngredients = [...ingredients];
    if(newIngredients.length > 1){
      newIngredients.splice(index,1);
    }
    setIngredients(newIngredients);
  }

  useEffect(()=>{
    if(!token){
      navigate('/login');
    }
  },[])

  useEffect(() => {
    const getRecipe = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/recipes/${id}`
        );
        const data = response?.data;
        console.log(data)
        setRecipe(data);
        setTitle(data?.title);
        setDescription(data?.description);
        setInstructions(data?.instructions);
        setIsPureVeg(data?.isPureVeg);
        setIngredients(data?.ingredients);
        // console.log(instructions)
        setIsLoading(false)

      } catch (err) {
        setError(err.response?.data?.message);
        setIsLoading(false)
      }
    };
    getRecipe();
  },[id]);

  const handleSubmit = async (e)=>{
    e.preventDefault();
    setIsLoading(true);
    
    const recipeData = new FormData();
    recipeData.append('title',title.trim());
    if(thumbnail){
      recipeData.append('thumbnail',thumbnail);
    }
    recipeData.append('description',description.trim());
    recipeData.append('instructions',instructions.trim());
    recipeData.append('isPureVeg',isPureVeg);
    
    const filteredIngredients = ingredients.filter((item)=> item.trim() !== '');
    const updatedIngredients = JSON.stringify(filteredIngredients);
    recipeData.append('ingredients',updatedIngredients);
  
    console.log(ingredients);

    try {
      console.log("FormData contents:", Array.from(recipeData.entries()));
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/recipes/${id}`,recipeData,{
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        },
      });

      if(response.status === 200){
        setIsLoading(false);
        navigate(`/recipes/${id}`);
      }

    } catch (error) {
      setError(error.response?.data?.message)
      setIsLoading(false)
    }

  }

  if(isLoading){
    return <Loader/>
  }




  return (
    <section className="create-recipe mt-16 p-3 pt-16 flex justify-center items-center">
      <div className="create-container flex flex-col gap-3">
        <h2 className="text-center text-3xl pb-5">Edit Recipe</h2>
        {error && <ErrorCompo err={error}/>}
        <form action="" className="form create-recipe__form flex flex-col gap-2" onSubmit={handleSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <label htmlFor="thumbnail">Thumbnail</label>
          <label
            className="file-upload flex flex-wrap justify-between items-center gap-3"
            htmlFor="thumbnail"
          >
            <img className="ml-5" src={photo} alt="" />
            <input
              className="hidden"
              id="thumbnail"
              type="file"
              onChange={(e) => {
                setThumbnail(e.target.files[0]);
                e.target.files[0]
                  ? setSource(URL.createObjectURL(e.target.files[0]))
                  : setSource("");
              }}
              accept="image/png, image/jpeg"
            />
            <img
              className="banner w-56 h-56"
              src={
                !thumbnail
                  ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${recipe?.thumbnail}` ||
                    defaultImage
                  : source
              }
              alt="thumbnail"
            />
          </label>
          <label htmlFor="description">Description</label>
          <ReactQuill
            id="description"
            value={description}
            onChange={setDescription}
            placeholder="Description"
          />
          <div className="ingredients-container">
            <label className="mb-3" htmlFor="ingredients">
              Ingredients
            </label>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredients-input flex flex-nowrap">
                <input
                  type="text"
                  id="ingredients"
                  placeholder={`Ingredient ${index + 1}`}
                  value={ingredient}
                  onChange={(e)=> handleIngredientChange(index,e.target.value)}
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredientInput(index)}
                    className="remove-ingredient flex items-center justify-center pb-4  "
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
            Save Changes
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditRecipePage;
