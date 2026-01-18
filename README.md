
# 🌍 Wanderlust

Welcome to **Wanderlust**, a full-stack travel listing app where users can explore, create, and review amazing travel destinations!  
Built with **Node.js**, **Express**, **MongoDB**, and **EJS**, it provides a smooth user experience enhanced by secure authentication, cloud image uploads, and interactive reviews.

---

## 🚀 Table of Contents

- [✨ Features](#-features)  
- [🛠️ Technologies Used](#-technologies-used)  
- [📁 Project Structure](#-project-structure)  
- [⚙️ Installation & Setup](#️-installation--setup)  
- [🔐 Environment Variables](#-environment-variables)  
- [📦 Running Locally](#-running-locally)  
- [☁️ Deployment](#️-deployment)  
- [🔍 Usage](#-usage)  
- [🛡️ Security & Validation](#️-security--validation)  
- [🤝 Contributing](#-contributing)  
- [📜 License](#-license)  

---

## ✨ Features

- 👤 **User Authentication** — Secure signup/login/logout with Passport.js  
- 🏷️ **Listings** — Create, view, edit, and delete travel listings with images  
- 📷 **Cloudinary Integration** — Upload and store images in the cloud  
- ⭐ **Reviews** — Users can leave ratings and comments on listings  
- 🔐 **Authorization** — Only owners can edit/delete their listings and reviews  
- 💬 **Flash Messages** — Instant success/error feedback  
- 🌐 **Responsive UI** — Clean and intuitive views built with EJS templates  

---

## 🛠️ Technologies Used

- **Backend:** Node.js, Express.js  
- **Database:** MongoDB, Mongoose ODM  
- **Authentication:** Passport.js, express-session  
- **Validation:** Joi  
- **File Upload:** Multer, multer-storage-cloudinary, Cloudinary SDK  
- **Templating:** EJS with express-ejs-layouts  
- **Deployment:** Vercel  

---

## 📁 Project Structure

```plaintext
wanderlust/
├─ controllers/
│  ├─ listings.js          # Handles listing CRUD logic
│  ├─ reviews.js           # Review creation and deletion logic
│  └─ users.js             # User signup/login/logout logic
├─ init/
│  ├─ data.js              # Seed or initial data scripts
│  └─ index.js             # Initialization scripts
├─ models/
│  ├─ listing.js           # Mongoose schema for Listings
│  ├─ review.js            # Mongoose schema for Reviews
│  └─ user.js              # Mongoose schema for Users
├─ node_modules/           # Installed dependencies
├─ public/
│  ├─ css/
│  │  ├─ rating.css        # Styles for ratings UI
│  │  └─ style.css         # Main styling
│  └─ js/
│     └─ script.js         # Client-side JavaScript
├─ routes/
│  ├─ listing.js           # Routes for listings
│  ├─ review.js            # Routes for reviews
│  └─ user.js              # Routes for user authentication
├─ uploads/                # Temporary local upload storage (if used)
├─ utils/
│  ├─ ExpressError.js      # Custom error class
│  └─ wrapAsync.js         # Async wrapper middleware for routes
├─ views/
│  ├─ includes/
│  │  ├─ flash.ejs         # Flash message partial
│  │  ├─ footer.ejs        # Footer partial
│  │  └─ navbar.ejs        # Navbar partial
│  ├─ layouts/
│  │  └─ boilerplate.ejs   # Main layout template
│  ├─ listings/
│  │  ├─ edit.ejs          # Edit listing form
│  │  ├─ index.ejs         # Listings index page
│  │  ├─ new.ejs           # New listing form
│  │  └─ show.ejs          # Show individual listing details
│  ├─ users/
│  │  ├─ login.ejs         # Login form
│  │  └─ signup.ejs        # Signup form
│  └─ error.ejs            # Error display page
├─ .env                    # Environment variables (local)
├─ app.js                  # Main application file
├─ cloudConfig.js          # Cloudinary and multer storage config
├─ middleware.js           # Custom middleware functions
├─ package.json            # Project metadata and dependencies
├─ package-lock.json       # Dependency versions lock
├─ schema.js               # Joi validation schemas
````

---

## ⚙️ Installation & Setup

### Clone using the web URL

```bash
git clone https://github.com/sherlock-hashed/Wanderlust.git
cd WanderLust
```

### Install dependencies

```bash
npm install
```

> 💡 *Note:* To avoid conflicts with Cloudinary dependencies, install compatible versions:
>
> ```bash
> npm uninstall cloudinary
> npm install cloudinary@1.41.3 multer-storage-cloudinary@4.0.0
> ```

### Set up environment variables

Create a `.env` file with the following keys (replace placeholders):

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

SESSION_SECRET=your_session_secret_here
ATLASDB_URL=your_mongodb_connection_string_here
```

---

## 🔐 Environment Variables Explained

| Variable           | Description                             |
| ------------------ | --------------------------------------- |
| `CLOUD_NAME`       | Cloudinary cloud name                   |
| `CLOUD_API_KEY`    | Cloudinary API key                      |
| `CLOUD_API_SECRET` | Cloudinary API secret                   |
| `SESSION_SECRET`   | Secret for session encryption           |
| `ATLASDB_URL`      | MongoDB connection URI (local or Atlas) |

---

## 📦 Running Locally

1. **Start MongoDB** (if using local MongoDB)

```bash
mongod
```

2. **Run the server**

```bash
node app.js
```

3. Open your browser and visit:

```
http://localhost:8080
```

---

## ☁️ Deployment

Deploy your project on **Vercel** for free hosting:

1. Push your code to GitHub:

```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. Log in to [Vercel](https://vercel.com/) and import your GitHub repo.

3. Add your environment variables in the Vercel dashboard under project settings.

4. Deploy. Vercel will install dependencies and start the app automatically.

> ⚠️ Ensure Cloudinary is pinned to `1.41.3` and multer-storage-cloudinary to `4.0.0` to avoid build errors.

---

## 🔍 Usage

* **Sign Up / Log In:** Create an account or log in to access full features.
* **Browse Listings:** View all travel listings on the homepage.
* **Create Listings:** Add new listings with images and detailed info.
* **Edit/Delete Listings:** Modify or remove your own listings.
* **Reviews:** Leave ratings and comments on listings.
* **Delete Reviews:** Remove your own reviews.

---

## 🛡️ Security & Validation

* Authentication required to create or modify listings and reviews.
* Authorization checks prevent unauthorized edits/deletions.
* Data validated on server-side using Joi schemas.
* Custom error handling and flash messages provide clear feedback.

---

Thank you for checking out **Wanderlust**!
Happy travels and coding! ✈️🌏✨






