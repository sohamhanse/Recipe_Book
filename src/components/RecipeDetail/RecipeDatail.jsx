import { useParams } from "react-router-dom";
import dishes from "../../../Dishes.js";
import "./RecipeDetail.css";
function RecipeDetail() {
  const { name } = useParams();
  const dish = dishes.find((dish) => dish.name === name);

  if (!dish) {
    return <div>Recipe not found</div>;
  }

  console.log(dish);

  return (
    /*
    <div classNameName="recipe-detail">
      <h2>{dish.name}</h2>
      <img src = {`../../.${dish.image}`} alt="" />
      <h3>Discription</h3>
      <p>{dish.description}</p>
      <h3>Recipe</h3>
      <p>{dish.recipe}</p>
    </div>
    */

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
            <h1>{dish.name}</h1>
          </div>
          <div className="image">
            <img
              src = {`../../.${dish.image}`}
              alt=""
            />
          </div>
        </div>
        <div className="half">
          <div className="description">
            <h3>Description</h3>
            <p>
             {dish.description}
            </p>
            <h3>Recipe</h3>
            <p>
              {dish.recipe}
            </p>
          </div>
        </div>
      </div>
      <div className="Recipe__footer">
      </div>
    </div>
  );
}

export default RecipeDetail;
