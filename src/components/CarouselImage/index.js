import './index.css'

const CarouselImage = props => {
  const {imageUrl} = props
  return <img src={imageUrl} alt="offer" className="carousel-element" />
}

export default CarouselImage
