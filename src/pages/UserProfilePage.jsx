import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { UserContext } from "../context/userContext";
import axios from "axios";
import profile from "../assets/user-profile-front-side-with-white-background_187299-40009.avif";
import Loader from "../components/Loader";
import ErrorCompo from "../components/ErrorCompo";
import SuccessToast from "../components/SuccessToast";

const UserProfilePage = () => {
  const [avatar, setAvatar] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isPureVeg, setIsPureVeg] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [isAvatarTouched, setIsAvatarTouched] = useState(false);

  const navigate = useNavigate();

  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/users/${currentUser.id}`,
          {
            withCredentials: true,
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { name, email, avatar, ispureveg } = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
        setIsPureVeg(ispureveg);
      } catch (error) {
        console.log(error);
      }
    };
    if (token) {
      getUser();
    }
  }, [token, currentUser.id]);

  const changeAvatarHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsAvatarTouched(false);
    try {
      const postData = new FormData();
      postData.set("avatar", avatar);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/users/change-avatar`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );

      setSuccessMsg(response?.data);
      setAvatar(response?.data?.avatar);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserDetails = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = new FormData();
      userData.set("name", name);
      userData.set("email", email);
      userData.set("ispureveg", isPureVeg);
      userData.set("currentPassword", currentPassword);
      userData.set("newPassword", newPassword);
      userData.set("confirmNewPassword", confirmNewPassword);

      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/users/edit-user`,
        userData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status === 200) {
        navigate("/logout");
      }
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-20">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="profile__details">
          <div className="avatar__wrapper flex flex-col gap-10 items-center mt-10">
            <h2 className="">Profile</h2>
            {/* form to update avatar */}
            <form className="avatar__form" onSubmit={changeAvatarHandler}>
              <div className="profile__avatar">
                {avatar ? (
                  <img
                    className="rounded-full"
                    src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${avatar}`}
                    alt="Avatar"
                  />
                ) : (
                  <img className="rounded-full size-24" src={profile}></img>
                )}
              </div>
              <input
                className="hidden"
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
                accept="image/png, image/jpg, image/jpeg"
              />
              <label
                className="flex justify-end cursor-pointer"
                htmlFor="avatar"
                onClick={() => setIsAvatarTouched(true)}
              >
                <FaEdit />
              </label>
              {isAvatarTouched && (
                <button className="profile__avatar-btn ml-9 mt-3" type="submit">
                  Save
                </button>
              )}
            </form>
          </div>

          {/* form to update user details */}
          <form
            className="update-details-form flex flex-col gap-10 items-center mt-10"
            onSubmit={updateUserDetails}
          >
            {successMsg && <SuccessToast message={successMsg} />}
            {error && <ErrorCompo err={error} />}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="flex items-center gap-3">
              <input
                id="check-box"
                type="checkbox"
                checked={isPureVeg}
                onChange={(e) => setIsPureVeg(e.target.checked)}
              />
              Pure Veg
            </label>
            <input
              type="password"
              placeholder="Current Password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <button type="submit" className="btn primary update-details">
              Update details
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
