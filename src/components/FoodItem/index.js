import {Component} from 'react'
import './index.css'

class FoodItem extends Component {
  state = {itemdetails: {}, isactive: false, count: 0, itemsList: []}

  componentDidMount() {
    this.renderStoredItemsList()
  }

  renderStoredItemsList = () => {
    const storeditemslist = localStorage.getItem('cartData')
    const {foodItem} = this.props
    const itemdetailsInLocalStorage = storeditemslist.filter(
      each => each.id === foodItem.id,
    )
    if (itemdetailsInLocalStorage !== undefined) {
      this.setState({
        isactive: true,
        itemdetails: itemdetailsInLocalStorage,
        itemsList: storeditemslist,
      })
    }
  }

  onAdditem = () => {
    const {itemsList} = this.state
    const {foodItem} = this.props
    const newitem = {
      cost: foodItem.cost,
      quantity: 1,
      id: foodItem.id,
      imageUrl: foodItem.imageUrl,
    }
    const newlist = [...itemsList, newitem]
    localStorage.setItem('cartData', JSON.stringify(newlist))
    this.setState({
      isactive: true,
      count: 1,
      itemsList: newlist,
      itemdetails: newitem,
    })
  }

  decrement = () => {
    const {count, itemdetails, itemsList} = this.state
    const {foodItem} = this.props
    if (itemsList !== null) {
      const filteredList = itemsList.filter(each => each !== itemdetails)
      if (count === 1) {
        localStorage.setItem('cartData', filteredList)
        this.setState({isactive: false, itemsList: filteredList, count: 0})
      } else {
        const newitem = {
          cost: foodItem.cost,
          quantity: count - 1,
          id: foodItem.id,
          imageUrl: foodItem.imageUrl,
        }
        const newlist = [...filteredList, newitem]
        localStorage.setItem('cardData', newlist)
        this.setState({
          count: count - 1,
          itemdetails: newitem,
          itemsList: newlist,
        })
      }
    }
  }

  additemElement = () => {
    const {isactive, count} = this.state
    if (!isactive) {
      return (
        <button className="add-btn" type="button" onClick={this.onAdditem}>
          Add
        </button>
      )
    }
    return (
      <div className="incredecre-items-container">
        <button
          className="incredecre-btn"
          type="button"
          onClick={this.decrement}
          testid="decrement-count"
        >
          ad -
        </button>
        <p className="itemcount" testid="active-count">
          {count}
        </p>
        <button
          className="incredecre-btn"
          type="button"
          onClick={this.increment}
          testid="increment-count"
        >
          -
        </button>
      </div>
    )
  }

  render() {
    const {itemdetails} = this.state
    const {name, cost, rating, imageUrl} = itemdetails
    return (
      <li className="list-food-item" testid="foodItem">
        <img src="" alt="food item" className="each-food-item-image" />
        <div className="food-item-details">
          <h1 className="food-item-name">{name}</h1>
          <p className="cost-of-item">Rs. {cost}</p>
          <div className="rating-container">
            <img src={imageUrl} className="star-image" alt="star-pic" />
            <p className="rating">{rating}</p>
          </div>
          {this.additemElement()}
        </div>
      </li>
    )
  }
}

export default FoodItem
