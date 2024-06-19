import User_Dishes from "../../../User_Dishes";
import "../Card/Card.css";
import { Link } from "react-router-dom";

function User_Recipe() {
  let userRecipeLength;
  if (User_Dishes.length > 0) {
    userRecipeLength = true;
  }
  return (
    <>
      <div id="formargin">
        <h3>Your Recipes :- </h3>
        <div className="card-container">
          <article id="NoRecipe">
            <Link to="/Add Recipe">
              <button>
                <p>+</p>
                <h4>Add Recipe</h4>
              </button>
            </Link>
          </article>

          {userRecipeLength &&
            User_Dishes.map((dish) => (
              <article className="card" key={dish.name}>
                <img className="card__background" src={dish.image} />
                <div className="card__content | flow">
                  <div className="card__content--container | flow">
                    <h2 className="card__title">{dish.name}</h2>
                    <p className="card__description">{dish.description}</p>
                  </div >
                  <span>
                  <button className="card__button">Read more</button>
                  <button className="card__button">Delete</button>
                  </span>
                </div>
              </article>
            ))}
        </div>
      </div>
    </>
  );
}

export default User_Recipe;
