import dishes from "../../../Dishes.js";
import "./Card.css";
import { Link } from "react-router-dom";

function Card() {
  return (
    <>
      <div id="formargin">
        <h3>Our Recipes :- </h3>
        <div className="card-container">
          {dishes.map((dish) => (
            <article className="card" key={dish.name}>
              <img className="card__background" src={dish.image} />
              <div className="card__content | flow">
                <div className="card__content--container | flow">
                  <h2 className="card__title">{dish.name}</h2>
                  <p className="card__description">{dish.description}</p>
                </div>
                <Link to={`/Default/${dish.name}`}>
                  <button className="card__button">Read more</button>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}

export default Card;
