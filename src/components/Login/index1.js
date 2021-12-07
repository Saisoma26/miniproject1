import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errmsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSuccessfetch = data => {
    const jwtToken = data.jwt_token
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onFailurefetch = errmsg => {
    this.setState({errmsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userdetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfetch(data)
    } else {
      this.onFailurefetch(data.error_msg)
    }
  }

  errormsg = () => {
    const {errmsg} = this.state
    if (errmsg !== '') {
      return <p className="errormsg">{errmsg}</p>
    }
    return null
  }

  render() {
    const accessToken = Cookies.get('jwt_token')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="login-card">
          <div className="tastykitchens-icon-name-container">
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637387863/Frame_274_nst10c.svg"
              className="cook-icon"
              alt="website logo"
            />
            <h1 className="tasty-kitchens-heading">Tasty Kitchens</h1>
          </div>
          <h1 className="login-heading">Login</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <label className="input-labels" htmlFor="username">
              USERNAME
            </label>
            <input
              className="inputel"
              id="username"
              type="text"
              onChange={this.onChangeUsername}
            />
            <label className="input-labels" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="inputel1"
              id="password"
              type="password"
              onChange={this.onChangePassword}
            />
            {this.errormsg()}
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dekggtreb/image/upload/v1637386061/Rectangle_1456_x5a2kp.png"
          className="food-img"
          alt="website login"
        />
      </div>
    )
  }
}

export default Login
