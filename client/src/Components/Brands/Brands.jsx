import React from 'react'
import brandsData from "../../utils/brands.json"
import './Brands.css'
const Brands = () => {
  return (
    <div className="brands-wrapper">
    <div className="paddings innerWidth brands-container">
        <div className='brands-title'>
            <span className='primaryText'>Brands Who Trust Us</span>
        </div>
        <div className="brands-logos">
        {brandsData.map((logos, i ) => {
            return(
                <img src={logos.image} alt="Brand Logo" key={i}/>
            )
        })}
        </div>
    </div>
    </div>
  )
}

export default Brands
