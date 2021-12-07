import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Component} from 'react'
import './index.css'

class NavbarEl extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    localStorage.removeItem('cartData')
    history.replace('/login')
  }

  render() {
    return (
      <div className="navbar-bg">
        <Link className="home-link" to="/">
          <div className="applogo-and-name">
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637387863/Frame_274_nst10c.svg"
              className="cookIcon"
              alt="website logo"
            />
            <h1 className="tastykitchen-heading">Tasty Kitchen</h1>
          </div>
        </Link>
        <ul className="routeslist">
          <li className="list-item1">
            <Link to="/" className="tabitems">
              Home
            </Link>
          </li>
          <li className="list-item2">
            <Link to="/cart" className="tabitems">
              Cart
            </Link>
          </li>
          <li className="list-item3">
            <button
              className="logout-button"
              type="button"
              onClick={this.onClickLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    )
  }
}
export default withRouter(NavbarEl)
