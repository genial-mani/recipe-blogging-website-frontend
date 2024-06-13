import React, { useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";

const DeleteRecipe = ({ recipeId: id }) => {
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  const navigate = useNavigate();
  // const location = useLocation()

  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/recipes/${id}`,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
  
      if(response.status === 200){
            navigate(-1);
      }
    } catch (error) {
      console.log("Couldn't delete recipe.");
    }
  };

  return <Link onClick={()=>{handleDelete(id)}} className="delete-recipe-button">Delete</Link>;
};

export default DeleteRecipe;
