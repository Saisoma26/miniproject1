import {Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'
import Login from './components/Login/index1'
import Home from './components/Home/index1'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute/index1'
import './App.css'
import RestaurantDetails from './components/RestaurantDetails'
import Cart from './components/Cart'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartlist: []}

  componentDidMount() {
    const list = JSON.parse(localStorage.getItem('cartData'))
    if (list !== null) {
      this.setState({cartlist: list})
    }
  }

  increment = fooditem => {
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    const filteredList = localstorageItems.filter(
      each => each.id !== fooditem.id,
    )
    const fooditemInLocalStorage = localstorageItems.filter(
      each => each.id === fooditem.id,
    )
    const newitem = {
      cost: fooditem.cost,
      quantity: fooditemInLocalStorage[0].quantity + 1,
      id: fooditem.id,
      imageUrl: fooditem.imageUrl,
      name: fooditem.name,
    }
    const newlist = [...filteredList, newitem]
    localStorage.setItem('cartData', JSON.stringify(newlist))
    this.setState({cartlist: newlist})
  }

  decrement = fooditem => {
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    const filteredList = localstorageItems.filter(
      each => each.id !== fooditem.id,
    )
    const iteminLocalStorage = localstorageItems.filter(
      each => each.id === fooditem.id,
    )
    console.log(iteminLocalStorage[0].quantity)
    if (iteminLocalStorage[0].quantity === 1) {
      localStorage.setItem('cartData', JSON.stringify(filteredList))
      this.setState({cartlist: filteredList})
    } else {
      const newitem = {
        cost: fooditem.cost,
        quantity: iteminLocalStorage[0].quantity - 1,
        id: fooditem.id,
        imageUrl: fooditem.imageUrl,
        name: fooditem.name,
      }
      const newlist = [...filteredList, newitem]
      localStorage.setItem('cartData', JSON.stringify(newlist))
      this.setState({
        cartlist: newitem,
      })
    }
  }

  onAdditem = fooditem => {
    const {cartlist} = this.state
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    let newlist
    console.log('onadditem method in appjs')
    console.log(cartlist)
    const newitem = {
      cost: fooditem.cost,
      quantity: 1,
      id: fooditem.id,
      imageUrl: fooditem.imageUrl,
      name: fooditem.name,
    }
    if (localstorageItems !== null) {
      newlist = [...localstorageItems, newitem]
    } else {
      newlist = [newitem]
    }
    localStorage.setItem('cartData', JSON.stringify(newlist))
    this.setState({
      cartlist: newlist,
    })
  }

  render() {
    const {cartlist} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList: cartlist,
          incrementCount: this.increment,
          decrementCount: this.decrement,
          addItem: this.onAdditem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute
            exact
            path="/restaurant/:id"
            component={RestaurantDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/bad-path" component={NotFound} />
          <Redirect to="/bad-path" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
