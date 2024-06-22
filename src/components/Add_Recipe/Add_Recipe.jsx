import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddRecipe.css";
import { UserProvider } from "../User_Contect";

function AddRecipe() { 
  const navigate = useNavigate();
  const { userId } = createContext(UserProvider);
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

  async function handleAddRecipe(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("rname", recipe.name);
    formData.append("description", recipe.description);
    formData.append("recipe", recipe.recipe);
    formData.append("imgurl", recipe.image);

    if (!recipe.name || !recipe.image || !recipe.description || !recipe.recipe) {
      alert("Enter valid Name, description, recipe, and image");
    } else {
      try {
        const response = await axios.post(
          `https://recipe-backend-qgg0.onrender.com/${recipe.name}/to/${userId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        );
        console.log(response.data);
        navigate("/Your Recipes");
      } catch (error) {
        console.error(error.response.data);
        alert("Adding Recipe failed. Please check your credentials.");
      }
    }
  }

  return (
    <div className="add-recipe-container">
      <h2>Add a New Recipe</h2>
      <form className="recipe-form" onSubmit={handleAddRecipe}>
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
