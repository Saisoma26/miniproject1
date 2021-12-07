import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

const apistatuslist = {
  loading: 'LOADING',
  failure: 'FAILURE',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class Carousels extends Component {
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
    const accessToken = Cookies.get('jwtToken')
    const url = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = response.json()
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
    <div testid="restaurants-offers-loader" className="loader">
      <Loader type="TailSpin" height={50} width={50} color="#F7931E" />
    </div>
  )

  renderFailure = () => <h1>Not Found</h1>

  renderCarouselElements = () => {
    const {carousellist} = this.state
    return (
      <carousel>
        {carousellist.map(each => (
          <page id={`page${each.id}`}>
            <img src={each.imageUrl} alt="" className="carousel-images" />
          </page>
        ))}
        {carousellist.map(each => (
          <input type="radio" id={`page${each.id}cb`} name="pages" />
        ))}
      </carousel>
    )
  }

  renderFetchStatus = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case apiStatusList.loading:
        return this.renderloader
      case apiStatusList.success:
        return this.renderCarouselElements
      case apiStatusList.failure:
        return this.renderFailureView
      default:
        return null
    }
  }

  render() {
    return this.renderFetchStatus()
  }
}

export default Carousels
