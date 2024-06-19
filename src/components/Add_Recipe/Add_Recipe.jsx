import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddRecipe.css";
import User_Dishes from "../../../User_Dishes";

function AddRecipe() {
  const navigate = useNavigate(); // Initialize useNavigate hook
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    recipe: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setRecipe((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecipe = {
      name: recipe.name,
      description: recipe.description,
      recipe: recipe.recipe,
      image: URL.createObjectURL(recipe.image),
    };

    User_Dishes.push(newRecipe);
    console.log(User_Dishes);
    navigate("/Your Recipes"); // Navigate to "/Your Recipes" after adding recipe
  };

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form className="recipe-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Recipe Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="recipe">Recipe</label>
          <textarea
            id="recipe"
            name="recipe"
            value={recipe.recipe}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Add Recipe
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;
