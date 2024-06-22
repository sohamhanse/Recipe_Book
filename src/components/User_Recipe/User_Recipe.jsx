import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../Card/Card.css";
import UserContext from "../User_Contect";

function User_Recipe() {
  const [userDishes, setUserDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    async function fetchUserRecipes() {
      try {
        const id = localStorage.getItem("userid") || userId;
        const response = await axios.get(
          `https://recipe-backend-rosy.vercel.app/get-user-recipes/${id}`
        );
        if (response.data.success) {
          const recipeIds = response.data.data;
          const recipeDetails = await Promise.all(
            recipeIds.map(async (recipeId) => {
              const recipeResponse = await axios.get(
                `https://recipe-backend-rosy.vercel.app/get-recipe/${recipeId}`
              );
              return recipeResponse.data.data;
            })
          );
          setUserDishes(recipeDetails);
        } else {
          alert(response.data.message);
        }
      } catch (err) {
        console.error("Failed to fetch user recipes", err);
      } finally {
        setLoading(false);
      }
    }

    if (userId) {
      fetchUserRecipes();
    }
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
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

        {userDishes.length > 0 &&
          userDishes.map((dish) => (
            <article className="card" key={dish._id}>
              <img
                className="card__background"
                src={dish.imgurl}
                alt={dish.rname}
              />
              <div className="card__content | flow">
                <div className="card__content--container | flow">
                  <h2 className="card__title">{dish.rname}</h2>
                  <p className="card__description">{dish.description}</p>
                </div>
                <span>
                  <Link to={`/recipe/${dish.rname}`}>
                    <button className="card__button">Read more</button>
                  </Link>
                  <button style={{ visibility: "hidden" }} className="card__button">Delete</button>
                </span>
              </div>
            </article>
          ))}
      </div>
    </div>
  );
}

export default User_Recipe;
