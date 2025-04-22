import express from 'express';
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';
import path from 'path';

dotenv.config(); 

const app = express ();
const PORT = process.env.PORT || 5000;

const __dirname = path.resolve(); // this is used to get the current directory

app.use(express.json()); // allows us to accept JSON data in the req.body

app.use("/api/products", productRoutes); // this is the route for our product routes

if (process.env.NODE_ENV === "production") 
 {app.use(express.static(path.join(__dirname, "/frontend/dist"))); // this is used to serve the static files from the frontend build folder

    app.get("*", (req, res) => { // this is used to serve the index.html file for all the routes
        res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
    });
}

app.listen(PORT, ()=> { // function for starting the server
    connectDB();
    console.log('Server started at http://localhost:' + PORT);
});