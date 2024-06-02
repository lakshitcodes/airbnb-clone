# Airbnb Clone

This project is a fully functional clone of Airbnb built using the MERN stack (MongoDB, Express.js, Node.js) without React. The primary objective of this project is to replicate the core features of the original Airbnb platform while demonstrating my skills in full-stack web development. This project showcases my ability to design and implement a complex, user-centric web application from scratch, employing best practices in software development and modern web technologies.

## Table of Contents

- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Technical Implementation](#technical-implementation)
- [Dependencies](#dependencies)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Explore the Code](#explore-the-code)
- [Contact](#contact)

## Key Features

- **User Authentication**:
  - Secure session-based authentication for user sign up and login.
  - Restricted access to certain features for registered users.
- **Dynamic Listing Management**:
  - CRUD operations for property listings.
  - Detailed property information including descriptions, amenities, pricing, and image uploads.
- **Review System**:
  - Users can leave reviews and ratings for properties.
  - Only users who have stayed at a property can leave a review.
- **Interactive Maps**:
  - Listings displayed on an interactive map.
  - Easy property location discovery.
- **Permissions and Security**:
  - Only listing owners can edit or delete their listings.
  - Only review authors can delete their reviews.

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Passport.js
- **Maps**: Mapbox API
- **Image Upload**: Cloudinary API
- **Deployment**: Heroku

## Technical Implementation

- **RESTful API**:
  - Follows RESTful API design principles for routes and HTTP requests.
  - Intuitive and user-friendly API endpoints.
- **CRUD Operations**:
  - Supports Create, Read, Update, and Delete operations for listings and reviews.
- **Middleware**:
  - Handles tasks like authentication, error handling, and data validation.
- **Session Management**:
  - Managed using Express.js and Passport.js.
- **Form Validation**:
  - Uses Joi for input validation.
- **File Uploads**:
  - Utilizes Multer and Cloudinary for image uploads.
- **Map Integration**:
  - Integrated Mapbox API for interactive maps.
- **MVC Architecture**:
  - Follows Model-View-Controller architecture for maintainability.

## Dependencies

- `@mapbox/mapbox-sdk`
- `cloudinary`
- `connect-flash`
- `cookie-parser`
- `dotenv`
- `ejs`
- `ejs-mate`
- `express`
- `express-session`
- `joi`
- `method-override`
- `mongoose`
- `multer`
- `multer-storage-cloudinary`
- `passport`
- `passport-local`
- `passport-local-mongoose`

## Setup Instructions

1. **Clone the repository**:

   ```bash
   git clone https://github.com/lakshitcodes/airbnb-clone.git
   cd airbnb-clone
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Create a .env file:**:

- Please create a .env file in the root directory of your project and add the following environment variables. This file is crucial for storing sensitive information securely and ensuring that your application can access necessary external services.

_Instructions_:
CLOUD_NAME: Replace your_cloudinary_cloud_name with your unique Cloudinary cloud name.
CLOUD_API_KEY: Replace your_cloudinary_api_key with the API key provided by Cloudinary.
CLOUD_API_SECRET: Replace your_cloudinary_api_secret with the API secret provided by Cloudinary.
MAP_TOKEN: Replace your_mapbox_public_access_token with your public access token from Mapbox.\*

_How to Use:_
Copy the contents of this .env.example file.
Create a new file named .env in the root directory of your project.
Paste the copied content into the .env file.
Replace the placeholder values with your actual credentials.

4. **Start the application**:

- Open the terminal in the folder where all the files are present.

_Prerequisites_
Make sure that Node.js and nodemon are already installed on your computer.
Run an instance of mongod to connect the project with the database.

Run the commands in order

```bash
cd .\init\
```

```bash
node index.js
```

```bash
cd ../
```

```bash
nodemon app.js
```

## Contact

LinkedIn Profile: https://www.linkedin.com/in/jainlakshit/
Thank you for visiting my Airbnb clone project. I hope you find the functionalities and implementation impressive. Feel free to explore the platform and reach out if you have any questions or feedback.
