import React, { useContext, useEffect, useState } from "react";
import logo from "../assets/icons8-chef-hat-100.png";
import profile from "../assets/user-profile-front-side-with-white-background_187299-40009.avif";
import { Link } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import {FaBars, FaTimes} from 'react-icons/fa'
const Header = () => {
  const { currentUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(null);
  const [menuOpen,setMenuOpen] = useState(false);

  const handleMenu = ()=>{
    setMenuOpen(!menuOpen);
    const nav = document.querySelector('.header-nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
  }

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (currentUser && currentUser.id) {
          const response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`
          );
          if (response.status === 200) {
            setAvatar(response.data.avatar);
          }
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [currentUser]);

  return (
    <header className="fixed top-0 px-7 flex flex-row h-16 gap-10 items-center justify-between z-10">
      <Link to={'/'}><img className="w-12 h-12 rounded-full bg-slate-400" src={logo} alt="" /></Link>
      <nav className="flex gap-5 header-nav">
        <ul className="flex gap-5 items-center">
          <li>
            <Link className="navlink1" to={"/"}>
              Home
            </Link>
          </li>
          <li>
            <Link className="navlink1" to={"/recipes"}>
              Recipes
            </Link>
          </li>
          <li>
            <Link className="navlink1" to={"/chefs"}>
              Chefs
            </Link>
          </li>
        </ul>
        {currentUser?.id && (
          <ul className="flex gap-5 items-center">
            <li>
              <Link className="navlink1" to={"/create"}>
                Add Recipe
              </Link>
            </li>
            <li>
              <Link className="navlink1" to={`/myrecipes/${currentUser?.id}`}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="navlink-profile"
                to={`/profile/${currentUser?.id}`}
              >
                {avatar ? (
                  <img
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    alt=""
                  />
                ) : (
                  <img src={profile} alt="" />
                )}
              </Link>
            </li>
          </ul>
        )}
      </nav>
      <nav className="ml-10 flex list-none">
        {!currentUser?.id && (
          <ul className="flex gap-5 items-center">
            <li>
              <Link className="navlink1" to={"/login"}>
                Login
              </Link>
            </li>
          </ul>
        )}
        {currentUser?.id && (
          <ul className="flex gap-5 items-center">
            <li>
              <Link className="navlink1" to={"/logout"}>
                Logout
              </Link>
            </li>
          </ul>
        )}
            {!menuOpen ? <li className="menu-bar hidden">
              <FaBars onClick={handleMenu} size={24}/> 
            </li> : <li className="menu-bar hidden"> <FaTimes onClick={handleMenu} size={24}/> </li>}
      </nav>
    </header>
  );
};
 
export default Header;
