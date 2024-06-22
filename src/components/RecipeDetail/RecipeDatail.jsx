import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./RecipeDetail.css";

function RecipeDetail() {
  const { id } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    async function fetchDish() {
      try {
        const response = await axios.get(
          `https://recipe-backend-rosy.vercel.app/get-recipe/${id}`
        );
        if (response.data.success) {
          setDish(response.data.data);
        } else {
          console.log(response.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch recipe", err);
      }
    }

    fetchDish();
  }, [id]);

  console.log(dish);

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
