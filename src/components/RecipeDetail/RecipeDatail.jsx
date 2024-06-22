import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { index } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function fetchDish() {
      try {
        const userId = localStorage.getItem("userid");
        
        // Fetch user recipes
        const response = await axios.get(
          `https://recipe-backend-rosy.vercel.app/get-user-recipes/${userId}`
        );

        if (response.data.success) {
          const recipeId = response.data.data[index];
          console.log("we got this responce" + recipeId);
          // Fetch specific recipe by ID
          const recipeResponse = await axios.get(
            `https://recipe-backend-rosy.vercel.app/get-recipe/${recipeId}`
          );
          console.log(recipeResponse)

          if (recipeResponse.data.success) {
            setDish(recipeResponse.data.data);
          } else {
            console.error(recipeResponse.data.message);
          }
        } else {
          console.error(response.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch recipe", err);
      }
    }

    fetchDish();
  }, [index]);

  if (!dish) {
    return <div>Recipe not found</div>;
  }

  return (
    <div className="Recipe">
      <div className="Recipe__title">
        <div className="icon">
          <a href="#">
            <i className="fa fa-arrow-left"></i>
          </a>
        </div>
        <h3>New Recipes</h3>
      </div>
      <div className="Recipe__body">
        <div className="half">
          <div className="featured_text">
            <h1>{dish.rname}</h1>
          </div>
          <div className="image">
            <img src={dish.imgurl} alt={dish.rname} />
          </div>
        </div>
        <div className="half">
          <div className="description">
            <h3>Description</h3>
            <p>{dish.description}</p>
            <h3>Recipe</h3>
            <p>{dish.recipe}</p>
          </div>
        </div>
      </div>
      <div className="Recipe__footer"></div>
    </div>
  );
}

export default RecipeDetail;
