import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="back">
    <div className="notfound-bg">
      <img
        src="https://res.cloudinary.com/dekggtreb/image/upload/v1637500935/erroring_1_vlhcdn.png"
        alt="not found"
        className="notfound-img"
      />
      <h1 className="notfound-heading">Page Not Found</h1>
      <p className="notfound-description">
        we are sorry, the page you requested could not be found.
        <br />
        Please go back to the homepage
      </p>
      <Link to="/" className="not-found-link">
        <button className="gohomebutton" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
