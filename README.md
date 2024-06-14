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

## Dependencies

### Client-side

- `@testing-library/jest-dom`: ^5.17.0
- `@testing-library/react`: ^13.4.0
- `@testing-library/user-event`: ^13.5.0
- `axios`: ^1.6.8
- `javascript-time-ago`: ^2.5.10
- `quill`: ^2.0.2
- `react`: ^18.2.0
- `react-dom`: ^18.2.0
- `react-icons`: ^5.1.0
- `react-loader-spinner`: ^6.1.6
- `react-quill`: ^2.0.0
- `react-router-dom`: ^6.22.3
- `react-scripts`: 5.0.1
- `react-spinners`: ^0.13.8
- `react-time-ago`: ^7.3.3
- `web-vitals`: ^2.1.4
- `prettier`: ^3.2.5
- `prettier-plugin-tailwindcss`: ^0.5.14
- `tailwindcss`: ^3.4.3

### Server-side

- `express`: ^4.19.2
- `mongoose`: ^8.3.1
- `jsonwebtoken`: ^9.0.2
- `nodemailer`: ^6.9.13
- `node-cron`: ^3.0.3
- `dotenv`: ^16.4.5
- `bcryptjs`: ^2.4.3
- `body-parser`: ^1.20.2
- `cors`: ^2.8.5
- `express-fileupload`: ^1.5.0
- `google-auth-library`: ^9.10.0
- `googleapis`: ^137.1.0
- `joi`: ^17.12.3
- `mailgun-js`: ^0.22.0
- `morgan`: ^1.10.0
- `node-mailjet`: ^6.0.5
- `nodemon`: ^3.1.0
- `path`: ^0.12.7
- `uuid`: ^9.0.1

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
