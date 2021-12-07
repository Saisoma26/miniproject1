import Loader from 'react-loader-spinner'
import {Component} from 'react'
import Navbar from '../Navbar'
import Footer from '../Footer'
import Carousel from '../Carousel'
import RestaurantCard from '../RestaurantCard'
import './index.css'

const apistatuslist = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class Home extends Component {
  state = {
    restaurantsList: [],
    activePage: 1,
    sortOption: sortByOptions[1].value,
    totalPages: 0,
  }

  componentDidMount() {
    this.getrestaurantsdetails()
  }

  userratingConversion = eachuser => ({
    ratingText: eachuser.rating_text,
    ratingColor: eachuser.rating_color,
    totalReviews: eachuser.total_reviews,
    rating: eachuser.rating,
  })

  dataConversion = eachitem => ({
    hasOnlineDelivery: eachitem.has_online_delivery,
    userRating: this.userratingConversion(eachitem.userRating),
    name: eachitem.name,
    hasTableBooking: eachitem.has_table_booking,
    isDeliveringNow: eachitem.is_delivering_now,
    costForTwo: eachitem.cost_for_two,
    cuisine: eachitem.cuisine,
    imageUrl: eachitem.imageUrl,
    restrauntId: eachitem.id,
    menuType: eachitem.menu_type,
    location: eachitem.location,
    opensAt: eachitem.opens_at,
    groupBy: eachitem.group_by,
  })

  getrestaurantsdetails = async () => {
    this.setState({fetchStatus: apistatuslist.loading})
    const {activePage, sortOption} = this.state
    const offset = (activePage - 1) * 9
    const url = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=9&sort-by_rating=${sortOption}`
    const response = await fetch(url)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        restaurants: data.restaurants.map(each => this.dataConversion(each)),
        total: data.total,
      }
      const noOfPages = updatedData.total / 9
      this.setState({
        restaurantsList: updatedData.restaurants,
        totalPages: noOfPages,
        fetchStatus: apistatuslist.success,
      })
    } else {
      this.setState({fetchStatus: apistatuslist.failure})
    }
  }

  sortoptionChange = event => {
    this.setState({sortOption: event.target.value}, this.getrestaurantsdetails)
  }

  frontPage = () => {
    const {activePage, totalPages} = this.state
    if (activePage !== totalPages) {
      this.setState(
        prevState => ({activePage: prevState.activePage + 1}),
        this.getrestaurantsdetails,
      )
    }
  }

  backPage = () => {
    const {activePage} = this.state
    if (activePage !== 1) {
      this.setState(
        prevState => ({activePage: prevState.activePage - 1}),
        this.getrestaurantsdetails,
      )
    }
  }

  renderRestaturants = () => {
    const {restaurantsList, sortOption, activePage, totalPages} = this.state

    return (
      <div className="home-bg">
        <Carousel />
        <h1 className="popular-restaurants-heading">Popular Restaurants</h1>
        <div className="description-and-sort-container">
          <p className="description">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="sort-container">
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637416488/Round_bfspeo.png"
              className="sort-icon"
              alt="sort icon"
            />
            <label className="sort-label" htmlFor="sortby">
              Sort by {sortOption}
            </label>
            <select id="sortby" onChange={this.sortoptionChange}>
              <option
                className="option"
                value={sortByOptions[1].value}
                selected
              >
                {sortByOptions[1].displayText}
              </option>
              <option className="option" value={sortByOptions[0].value}>
                {sortByOptions[0].displayText}
              </option>
            </select>
          </div>
        </div>
        <hr className="hrline" />
        <ul className="restaurants-list">
          {restaurantsList.map(each => (
            <RestaurantCard eachrestaurant={each} key={each.restaurantId} />
          ))}
        </ul>
        <div className="pagination">
          <button
            className="pagination-buttons"
            testid="left-pagination-button"
            type="button"
            onClick={this.backPage}
          >
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637474434/Icon_frnq2g.png"
              className="pagination-button-img"
              alt="left-pagination-img"
            />
          </button>
          <p className="activepage-number">
            <span testid="active-page-number">{activePage} </span> of{' '}
            {totalPages}
          </p>
          <button
            className="pagination-buttons"
            testid="right-pagination-button"
            type="button"
            onClick={this.frontPage}
          >
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637474514/Icon_frvxoe.png"
              className="pagination-button-img"
              alt="right-pagination-img"
            />
          </button>
        </div>
        <Footer />
      </div>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="loader">
      <Loader type="spinner" height={53.33} width={53.33} color="#F7931E" />
    </div>
  )

  renderFailureView = () => <h1> </h1>

  renderfetchStatus = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case apistatuslist.loading:
        return this.renderLoader()
      case apistatuslist.success:
        return this.renderRestaturants()
      case apistatuslist.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Navbar />
        {this.renderfetchStatus()}
      </>
    )
  }
}

export default Home
