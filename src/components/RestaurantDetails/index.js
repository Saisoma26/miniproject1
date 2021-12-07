import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Component} from 'react'
import NotFound from '../NotFound'
import Footer from '../Footer'
import NavbarEl from '../NavbarEl'
import FoodItem from '../FoodItem/index1'
import './index.css'

const apistatuslist = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class RestaurantDetails extends Component {
  state = {fetchStatus: apistatuslist.initial, restaurantDetails: {}}

  componentDidMount() {
    this.getRestaurantDetails()
  }

  foodItemsConversion = eachfoodItem => ({
    name: eachfoodItem.name,
    cost: eachfoodItem.cost,
    foodType: eachfoodItem.food_type,
    imageUrl: eachfoodItem.image_url,
    id: eachfoodItem.id,
  })

  dataConversion = each => ({
    rating: each.rating,
    id: each.id,
    name: each.name,
    costForTwo: each.cost_for_two,
    cuisine: each.cuisine,
    imageUrl: each.image_url,
    reviewsCount: each.reviews_count,
    openAt: each.opens_at,
    location: each.location,
    itemsCount: each.items_count,
    foodItems: each.food_items.map(eachitem =>
      this.foodItemsConversion(eachitem),
    ),
  })

  getRestaurantDetails = async () => {
    const accesstoken = Cookies.get('jwt_token')
    this.setState({fetchStatus: apistatuslist.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accesstoken}`,
      },
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = this.dataConversion(data)
      this.setState({
        restaurantDetails: updatedData,
        fetchStatus: apistatuslist.success,
      })
    } else {
      this.setState({fetchStatus: apistatuslist.failure})
    }
  }

  renderfailure = () => <NotFound />

  renderrestaurantDetails = () => {
    const {restaurantDetails} = this.state
    const {foodItems} = restaurantDetails
    const {
      name,
      cuisine,
      location,
      imageUrl,
      reviewsCount,
      rating,
      costForTwo,
    } = restaurantDetails

    return (
      <div className="restaurantDetails-bg">
        <div className="restaurant-intro">
          <img src={imageUrl} alt="restaurant" className="restaurant-img" />
          <div className="restaurant-details">
            <h1 className="restaurant-name">{name}</h1>
            <p className="restaurant-cuisine">{cuisine}</p>
            <p className="restaurant-location">{location}</p>
            <div className="rating-and-cost-details">
              <div className="rating-and-noofratings-container">
                <div className="rating-container">
                  <img
                    src="https://res.cloudinary.com/dekggtreb/image/upload/v1637498260/7_Rating_nhvwpb.png"
                    alt="star"
                    className="star-image"
                  />
                  <p className="rating">{rating}</p>
                </div>
                <p className="noofratings">{reviewsCount} ratings</p>
              </div>
              <p className="vertical-line">|</p>
              <div className="cost-container">
                <p className="cost">{costForTwo}</p>
                <p className="cost-for-two">Cost for two</p>
              </div>
            </div>
          </div>
        </div>
        <ul className="food-items-list">
          {foodItems.map(each => (
            <FoodItem foodItem={each} key={each.id} restuarantRating={rating} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoaderview = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-details-loader"
    >
      <Loader type="TailSpin" height={40} width={40} color="#F7931E" />
    </div>
  )

  renderfetchStatus = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case apistatuslist.failure:
        return this.renderfailure()
      case apistatuslist.success:
        return this.renderrestaurantDetails()
      case apistatuslist.loading:
        return this.renderLoaderview()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <NavbarEl />
        {this.renderfetchStatus()}
        <Footer />
      </>
    )
  }
}

export default RestaurantDetails
