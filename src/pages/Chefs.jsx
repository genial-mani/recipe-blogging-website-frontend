import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import ChefCard from "../components/ChefCard";

const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setChefs(response?.data);
        
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchChefs();
  },[]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mt-16">
      <div className="chefs-container">
        <h2 className="pl-5">Chefs</h2>
      <div className="flex justify-center  gap-3 flex-wrap">
        {chefs &&
          chefs.map((chef, index) => {
            return (
              <ChefCard key={index} chef={chef}/>
            );
          })}
      </div>
      
      </div>
    </div>
  );
};

export default Chefs;
