import {Link} from 'react-router-dom'
import './index.css'

const RestaurantCard = props => {
  const {eachrestaurant} = props
  const {name, cuisine, userRating, imageUrl, id} = eachrestaurant

  return (
    <Link to={`/restaurant/${id}`} className="each-restaurant-link">
      <li className="restaurant-list-item" testid="restaurant-item">
        <img src={imageUrl} className="restaurant-image" alt="restaurant" />
        <div className="restaurant-details">
          <p className="restaurantName">{name}</p>
          <p className="restaurantCuisine">{cuisine}</p>
          <div className="rating-container">
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637498260/7_Rating_nhvwpb.png"
              className="rating-image"
              alt="star"
            />
            <p className="rating">{userRating.rating}</p>
            <p className="total-reviews">({userRating.totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default RestaurantCard
