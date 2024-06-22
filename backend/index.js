const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userModel = require("./models/user");
const recipeModel = require("./models/recipie");

const app = express();
const port = 3000;
const mongoURI = "mongodb+srv://soham:soham@recipebook.tynml2u.mongodb.net/";

app.use(cors());
app.use(express.json()); // Middleware to parse JSON bodies

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => {
        console.error("Failed to connect to database", err);
    });

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Server is running"
    });
});

app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const newUser = new userModel({ username, email, password });
        const user = await newUser.save();
        res.status(200).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to register user",
            error: err.message
        });
    }
});

app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Username and password are required"
        });
    }

    try {
        const user = await userModel.findOne({ username });
        if (!user || user.password != password) {
            return res.status(400).json({
                success: false,
                message: "Invalid username or password"
            });
        }

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to login",
            error: err.message
        });
    }
});

app.post("/add-recipe", async (req, res) => {
    const { rname, description, recipe, imgurl } = req.body;
    if (!rname || !description || !recipe) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    try {
        const newRecipe = new recipeModel({ rname, description, recipe, imgurl });
        const savedRecipe = await newRecipe.save();
        res.status(200).json({
            success: true,
            message: "Recipe added successfully",
            data: savedRecipe
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add recipe",
            error: err.message
        });
    }
});

app.post("/:recipeid/to/:userid", async (req, res) => {
    const { recipeid, userid } = req.params;

    try {
        const recipe = await recipeModel.findById(recipeid);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.recipes.push(recipe);
        await user.save();
        res.status(200).json({
            success: true,
            message: "Recipe added to user successfully",
            data: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to add recipe to user",
            error: err.message
        });
    }
});

app.get("/get-user-recipes/:userid", async (req, res) => {
    const { userid } = req.params;
    try {
        const user = await userModel.findById(userid);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipes fetched successfully",
            data: user.recipes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch recipes",
            error: err.message
        });
    }
});


app.get("/get-recipes", async (req, res) => {
    try {
        const recipes = await recipeModel.find({});
        res.status(200).json({
            success: true,
            message: "Recipes fetched successfully",
            data: recipes
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch recipes",
            error: err.message
        });
    }
});

app.get("/get-recipe/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const recipe = await recipeModel.find(id);
        if (!recipe) {
            return res.status(404).json({
                success: false,
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipe fetched successfully",
            data: recipe
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch recipe",
            error: err.message
        });
    }
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
