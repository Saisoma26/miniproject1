import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = props => {
  const accessToken = Cookies.get('jwtToken')
  if (accessToken === undefined) {
    return <Redirect to="/login" />
  }
  return <Route path="...props" />
}

export default ProtectedRoute
