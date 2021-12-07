import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {Carousel} from 'antd'
import './index.css'

const apiStatusList = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class CarouselEl extends Component {
  state = {carousellist: [], fetchStatus: apiStatusList.initial}

  componentDidMount() {
    this.getcarouselElemnets()
  }

  dataCoversion = each => ({
    imageUrl: each.image_url,
    id: each.id,
  })

  getcarouselElemnets = async () => {
    this.setState({fetchStatus: apiStatusList.loading})
    const accessToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.offers.map(each => this.dataCoversion(each))
      this.setState({
        carousellist: updatedData,
        fetchStatus: apiStatusList.success,
      })
    } else {
      this.setState({fetchStatus: apiStatusList.failure})
    }
  }

  renderloader = () => (
    <div
      testid="restaurants-offers-loader"
      className="restaurant-offers-loader"
    >
      <Loader type="TailSpin" height={50} width={50} color="#F7931E" />
    </div>
  )

  renderFailure = () => <h1>Not Found</h1>

  renderCarouselElements = () => {
    const {carousellist} = this.state
    console.log(carousellist)
    return (
      <Carousel autoplay>
        {carousellist.map(each => (
          <div>
            <img src={each.imageUrl} alt="offer" className="carousel-element" />
          </div>
        ))}
      </Carousel>
    )
  }

  renderFetchStatus = () => {
    const {fetchStatus} = this.state
    console.log(fetchStatus)
    switch (fetchStatus) {
      case apiStatusList.loading:
        return this.renderloader()
      case apiStatusList.success:
        return this.renderCarouselElements()
      case apiStatusList.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderFetchStatus()
  }
}

export default CarouselEl
