# Find A Recipe

## Introduction

Welcome to **Find A Recipe**, a stunning recipe blogging website designed to bring food enthusiasts together. Our platform allows users to discover, share, and enjoy a plethora of delicious vegetarian recipes. With features like user registration, recipe management, favorites, and weekly email notifications, **Find A Recipe** ensures that you never run out of culinary inspiration. Whether you're a seasoned chef or a home cook, our website offers a user-friendly and feature-rich experience tailored to your needs.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
  - [Frontend (React)](#frontend-react)
  - [Backend (Node.js/Express)](#backend-nodejsexpress)
- [Usage](#usage)
- [Dependencies](#dependencies)
  - [Client-side](#client-side)
  - [Server-side](#server-side)
- [Configuration](#configuration)
- [Contributors](#contributors)
- [License](#license)

## Features

- **User Registration & Login**: Create an account and log in to access personalized features.
- **CRUD Operations on Recipes**: Create, read, update, and delete recipes with ease.
- **Pure Vegetarian Option**: Ensure all recipes are vegetarian.
- **CRUD Operations on User Details**: Manage your profile and personal information.
- **Add to Favorites**: Save your favorite recipes for quick access.
- **Recipe Likes**: View and like your favorite recipes.
- **Weekly Email Notifications**: Subscribe to receive weekly recipe updates via email.

## Installation

### Frontend (React)

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/find-a-recipe.git
    cd find-a-recipe/client
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the development server:
    ```bash
    npm start
    ```

### Backend (Node.js/Express)

1. Navigate to the server directory:
    ```bash
    cd ../server
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Start the server:
    ```bash
    npm start
    ```

## Usage

1. **Register/Login**: Create an account or log in to your existing account.
2. **Browse Recipes**: Explore various vegetarian recipes available on the platform.
3. **Manage Recipes**: Add new recipes, edit existing ones, or delete recipes that you no longer need.
4. **User Profile**: Update your profile information and manage your account details.
5. **Favorites**: Add recipes to your favorites for easy access.
6. **Like Recipes**: Show your appreciation by liking your favorite recipes.
7. **Subscribe**: Sign up for weekly email notifications to receive the latest recipes directly to your inbox.

## Technologies Used

<div style="display: flex; flex-wrap: wrap; justify-content: center;">

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">React</p>
  <img src="public/icons/react.svg" alt="React" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">JavaScript</p>
  <img src="public/icons/js.svg" alt="JavaScript" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">CSS</p>
  <img src="public/icons/css.svg" alt="CSS" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">TailwindCSS</p>
  <img src="public/icons/tailwind.svg" alt="TailwindCSS" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">NodeJs</p>
  <img src="public/icons/Node.svg" alt="NodeJs" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">ExpressJS</p>
  <img src="public/icons/express.svg" alt="ExpressJS" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">MongoDB</p>
  <img src="public/icons/mongo.svg" alt="MongoDB" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">JWT Authentication</p>
  <img src="public/icons/jwt.svg" alt="JWT" width="20" height="20">
</div>

<div style="border: 1px solid white; padding: 10px; margin: 10px; display: flex; align-items: center; background-color: white;">
  <p style="margin: 0; padding-right: 10px;">Cloudinary</p>
  <img src="public/icons/cloudinary.svg" alt="Cloudinary" width="20" height="20">
</div>

</div>


## Configuration

Create a `.env` file in the server directory and add the following environment variables:

```env
MONGO_URI=<your_mongo_db_uri>
PORT=5000
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_REDIRECT_URI=<your_google_redirect_uri>
GOOGLE_REFRESH_TOKEN=<your_google_refresh_token>
EMAIL_USER=<your_email_user>
