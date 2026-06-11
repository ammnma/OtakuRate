```python

OkatuRate is a full-stack web application built with Node.js, Express, and MongoDB. It features an automated data pipeline that fetches the top 1000 anime from MyAnimeList (via the Jikan API) and displays them dynamically using Handlebars templates.

## 🚀 Features

* **Automated Data Pipeline:** Custom backend scripts to fetch live API data, format it, and seamlessly seed a MongoDB database.
* **Dynamic Frontend Rendering:** Utilizes Handlebars (`.hbs`) to inject backend database records directly into HTML views.
* **Smart Image Handling:** Renders high-quality anime covers directly from MyAnimeList's CDN without bogging down the database with heavy image files.
* **Secure Backend Infrastructure:** Protects database credentials using Environment Variables (`.env`) and `.gitignore`, alongside MongoDB Role-Based Access Control (RBAC).
* **RESTful Routing:** Clean Express.js architecture separating routes, controllers, and Mongoose database models.

## 💻 Tech Stack

* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** Handlebars (`hbs`), HTML, CSS
* **External APIs:** Jikan API v4 (MyAnimeList)
* **Security:** `dotenv`, Database RBAC

## 🛠️ Installation & Setup

**1. Clone the repository**

```bash
git clone [https://github.com/yourusername/OkatuRate.git](https://github.com/yourusername/OkatuRate.git)
cd OkatuRate

```

**2. Install dependencies**

```bash
npm install express mongoose hbs dotenv

```

**3. Configure Environment Variables**
Create a `.env` file in the root directory and add your MongoDB connection string and port:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/okaturate
PORT=5000

```

*(Note: Ensure your `.env` file is added to `.gitignore`!)*

**4. Run the Data Pipeline**
Fetch the latest data from the Jikan API and seed your database:

```bash
node dataset/fetch_jikan.js
node seed_anime.js

```

**5. Start the Server**

```bash
node index.js

```

The application will be running at `http://localhost:5000`.

## 🗺️ Future Roadmap

* [ ] Implement User Authentication (Sign up / Log in) using `bcrypt`.
* [ ] Build a search bar and filtering system (e.g., search by Action genre).
* [ ] Add dynamic user reviews and ratings to individual anime pages.

---

2. Place it in the root folder of your `OkatuRate` project in VS Code (right next to your `index.js` and `.env` files).
3. Update the `https://github.com/yourusername/OkatuRate.git` link in the markdown if you upload it to GitHub!

```
