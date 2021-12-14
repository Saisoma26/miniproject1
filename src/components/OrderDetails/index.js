import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class OrderDetails extends Component {
  state = {count: 0}

  componentDidMount() {
    this.verifyQuantity()
  }

  verifyQuantity = () => {
    const {orderitem} = this.props
    this.setState({count: orderitem.quantity})
  }

  decrement = () => {
    const {count} = this.state
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    const {orderitem} = this.props
    const filteredList = localstorageItems.filter(
      each => each.id !== orderitem.id,
    )
    if (count === 1) {
      localStorage.setItem('cartData', JSON.stringify(filteredList))
      this.setState({count: 0})
    } else {
      const newitem = {
        cost: orderitem.cost,
        quantity: count - 1,
        id: orderitem.id,
        imageUrl: orderitem.imageUrl,
        name: orderitem.name,
      }
      const newlist = [...filteredList, newitem]
      localStorage.setItem('cartData', JSON.stringify(newlist))
      this.setState({
        count: count - 1,
      })
    }
  }

  increment = () => {
    const {count} = this.state
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    const {orderitem} = this.props
    const filteredList = localstorageItems.filter(
      each => each.id !== orderitem.id,
    )
    const newitem = {
      cost: orderitem.cost,
      quantity: count + 1,
      id: orderitem.id,
      imageUrl: orderitem.imageUrl,
      name: orderitem.name,
    }
    const newlist = [...filteredList, newitem]
    localStorage.setItem('cartData', JSON.stringify(newlist))
    this.setState({
      count: count + 1,
    })
  }

  orderdetails = () => {
    const {orderitem} = this.props
    return (
      <CartContext.Consumer>
        {value => {
          const {incrementCount, decrementCount} = value
          const increment = () => {
            incrementCount(orderitem)
            this.setState(prevState => ({count: prevState.count + 1}))
          }
          const decrement = () => {
            decrementCount(orderitem)
            this.setState(prevState => ({count: prevState.count - 1}))
          }
          const {count} = this.state
          if (count !== 0) {
            const storedItemsList = JSON.parse(localStorage.getItem('cartData'))
            const storedItem = storedItemsList.filter(
              each => each.id === orderitem.id,
            )
            const {imageUrl, cost, quantity, name} = storedItem[0]
            return (
              <li className="order-container" testid="cartItem">
                <img
                  src={imageUrl}
                  alt="item-picname"
                  className="order-image"
                />
                <div className="order-details-container">
                  <h1 className="order-name">{name}</h1>
                  <div className="order-quantity-container">
                    <button
                      className="incredecre-btn"
                      type="button"
                      onClick={decrement}
                      testid="decrement-quantity"
                    >
                      -
                    </button>
                    <p className="order-quantity" testid="item-quantity">
                      {count}
                    </p>
                    <button
                      className="incredecre-btn"
                      type="button"
                      onClick={increment}
                      testid="increment-quantity"
                    >
                      +
                    </button>
                  </div>
                  <p className="order-amount">Rs.{cost * quantity}</p>
                </div>
              </li>
            )
          }
          return null
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    return this.orderdetails()
  }
}

export default OrderDetails
