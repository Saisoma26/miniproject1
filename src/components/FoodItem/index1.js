import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

class FoodItem extends Component {
  state = {count: 0, isactive: false}

  componentDidMount() {
    this.renderStoredItemsList()
  }

  renderStoredItemsList = () => {
    const localstorageItems = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    if (localstorageItems !== null) {
      const itemdetailsInLocalStorage = localstorageItems.filter(
        each => each.id === foodItem.id,
      )
      console.log(itemdetailsInLocalStorage[0])
      if (itemdetailsInLocalStorage.length !== 0) {
        this.setState({
          isactive: true,
          itemdetails: itemdetailsInLocalStorage[0],
          count: itemdetailsInLocalStorage[0].quantity,
        })
      } else {
        this.setState({itemdetails: foodItem})
      }
    }
  }
  //   onAdditem = () => {
  //     const {itemdetails} = this.state
  //     console.log('add item-method')
  //     return (
  //       <CartContext.Consumer>
  //         {value => {
  //           const {addItem} = value
  //           console.log('add item method')
  //           addItem(itemdetails)
  //         }}
  //       </CartContext.Consumer>
  //     )
  //   }

  //   increment = () => (
  //     <CartContext.Consumer>
  //       {value => {
  //         const {incrementCount} = value
  //         const {itemdetails} = this.state
  //         console.log('icrement method')
  //         return incrementCount(itemdetails)
  //       }}
  //     </CartContext.Consumer>
  //   )

  //   decrement = () => (
  //     <CartContext.Consumer>
  //       {value => {
  //         const {decrementCount} = value
  //         const {itemdetails} = this.state
  //         return decrementCount(itemdetails)
  //       }}
  //     </CartContext.Consumer>
  //   )

  additemElement = () => {
    const {count, isactive} = this.state
    const {foodItem} = this.props
    if (!isactive) {
      return (
        <CartContext.Consumer>
          {value => {
            const {addItem} = value
            const onAdditem = () => {
              addItem(foodItem)
              this.setState(prevState => ({
                isactive: true,
                count: prevState.count + 1,
              }))
            }
            return (
              <button className="add-btn" type="button" onClick={onAdditem}>
                Add
              </button>
            )
          }}
        </CartContext.Consumer>
      )
    }
    return (
      <CartContext.Consumer>
        {value => {
          const {incrementCount, decrementCount} = value
          const increment = () => {
            incrementCount(foodItem)
            this.setState(prevState => ({count: prevState.count + 1}))
          }
          const decrement = () => {
            decrementCount(foodItem)
            this.setState(prevState => ({count: prevState.count - 1}))
          }
          return (
            <div className="incredecre-items-container">
              <button
                className="incredecre-btn"
                type="button"
                onClick={decrement}
                testid="decrement-count"
              >
                -
              </button>
              <p className="itemcount" testid="active-count">
                {count}
              </p>
              <button
                type="button"
                onClick={increment}
                testid="increment-count"
              >
                +
              </button>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }

  render() {
    const {foodItem, restuarantRating} = this.props
    const {name, cost, imageUrl} = foodItem
    return (
      <li className="list-food-item" testid="foodItem">
        <img src={imageUrl} alt="food item" className="each-food-item-image" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="cost-of-item">Rs.{cost}.00</p>
          <div className="rating-container">
            <img
              src="https://res.cloudinary.com/dekggtreb/image/upload/v1637498260/7_Rating_nhvwpb.png"
              className="star-image"
              alt="star-pic"
            />
            <p className="fooditem-rating">{restuarantRating}</p>
          </div>
          {this.additemElement()}
        </div>
      </li>
    )
  }
}

export default FoodItem
