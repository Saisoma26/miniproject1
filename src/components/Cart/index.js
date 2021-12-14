import {Component} from 'react'
import {Redirect, Link} from 'react-router-dom'
import NavbarEl from '../NavbarEl'
import CartContext from '../../context/CartContext'
import './index.css'
import OrderDetails from '../OrderDetails'

class Cart extends Component {
  state = {cartitemslist: [], orderStatus: false}

  componentDidMount() {
    this.getcartDetails()
  }

  getcartDetails = () => {
    const cartdetails = JSON.parse(localStorage.getItem('cartData'))
    this.setState({cartitemslist: cartdetails})
  }

  onClickOrderNow = () => {
    console.log('ordernow-func')
    const {history} = this.props
    history.replace('/')
  }

  renderNoOrdersPage = () => (
    <div className="cart-page">
      <div className="noOrder-bg">
        <img
          src="https://res.cloudinary.com/dekggtreb/image/upload/v1637841746/Layer_2_cfw4v6.png"
          alt="empty cart"
          className="emptycart-image"
        />
        <h1 className="cart-no-orders-heading">No Order Yet!</h1>
        <p className="noOrders-description">
          Your cart is empty. Add something from the menu.
        </p>
        <Link className="order-now-link" to="/">
          <button className="orderNow-button" type="button">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  )

  totalPriceCalculation = () => (
    <CartContext.Consumer>
      {() => {
        const cartdetails = JSON.parse(localStorage.getItem('cartData'))
        let sum = 0
        if (cartdetails !== null) {
          for (let i = 0; i < cartdetails.length; i += 1) {
            sum += cartdetails[i].cost * cartdetails[i].quantity
          }
          return (
            <div className="total-container">
              <h1 className="total-heading">Order Total: </h1>
              <p className="total-price" testid="total-price">
                Rs.{sum}
              </p>
            </div>
          )
        }
        return this.renderNoOrdersPage()
      }}
    </CartContext.Consumer>
  )

  goToHome = () => <Redirect to="/" />

  orderSuccessPage = () => (
    <div className="orderSuccessPage-bg">
      <img
        src="https://res.cloudinary.com/dekggtreb/image/upload/v1638102064/check-circle.1_1_kqr3lh.png"
        alt="payment-success"
        className="payment-success-image"
      />
      <h1 className="paymentSuccess-heading">Payment Successful</h1>
      <p className="paymentSuccess-description">
        Thank you for ordering Your payment is successfully completed.
      </p>
      <Link className="onpayment-success" to="/">
        <button className="go-back-home-btn" type="button">
          Go To Home Page
        </button>
      </Link>
    </div>
  )

  onClickOrderNow = () => {
    this.setState({orderStatus: true})
  }

  renderOrderDetails = () => {
    const {cartitemslist, orderStatus} = this.state
    if (!orderStatus) {
      return (
        <div className="orderslist-bg">
          <ul className="cart-list-subheadings">
            <p className="subheadings">Item</p>
            <p className="subheadings">Quantity</p>
            <p className="subheadings">price</p>
          </ul>
          <ul className="orders-list">
            {cartitemslist.map(each => (
              <OrderDetails orderitem={each} key={each.id} />
            ))}
          </ul>
          {this.totalPriceCalculation()}
          <button
            className="place-order-button"
            type="button"
            onClick={this.onClickOrderNow}
          >
            Place Order
          </button>
        </div>
      )
    }
    return this.orderSuccessPage()
  }

  rendercartItems = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        if (cartList.length === 0) {
          return this.renderNoOrdersPage()
        }
        return this.renderOrderDetails()
      }}
    </CartContext.Consumer>
  )

  render() {
    return (
      <>
        <NavbarEl />
        {this.rendercartItems()}
      </>
    )
  }
}

export default Cart
