import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-bg">
      <div className="footer-heading-container">
        <img
          src="https://res.cloudinary.com/dekggtreb/image/upload/v1637489583/Frame_275_johhpb.png"
          className="website-logo"
          alt="website-footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="app-description">
        The only thing we are serious about is food. Contact us on
      </p>
      <ul className="media-icons-list">
        <li className="media-icon">
          <FaPinterestSquare testid="pintrest-social-icon" />
        </li>
        <li className="media-icon">
          <FaInstagram testid="instagram-social-icon" />
        </li>
        <li className="media-icon">
          <FaTwitter testid="twitter-social-icon" />
        </li>
        <li className="media-icon">
          <FaFacebookSquare testid="facebook-social-icon" />
        </li>
      </ul>
    </div>
  )
}
