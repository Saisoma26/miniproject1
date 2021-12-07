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
    Cookies.set('jwtToken', jwtToken, {expiry: 30})
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
    const options = {
      method: 'POST',
      body: JSON.stringify({userdetails}),
    }
    const url = 'https://apis.ccbp.in/login'
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfetch(data)
    } else {
      this.onFailurefetch(data.errmsg)
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
    const accessToken = Cookies.get('jwtToken')
    if (accessToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-bg">
        <div className="login-card">
          <img
            src="https://res.cloudinary.com/dekggtreb/image/upload/v1637387863/Frame_274_nst10c.svg"
            className="cook-icon"
            alt="cookicon"
          />
          <img
            src="https://res.cloudinary.com/dekggtreb/image/upload/v1637388256/Features_x4yobr.png"
            className="tastykitchen-icon"
            alt="website logo"
          />
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
              className="inputel"
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
