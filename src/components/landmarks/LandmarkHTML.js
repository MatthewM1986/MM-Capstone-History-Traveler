import React from "react"
import "./Landmark.css"

export const LandmarkHTML = ({ typeObj, landmarkObj }) => (
    <section className="landmark">
        <h3 className="landmark__name">{landmarkObj.name}</h3>
        <div className="landmark__image"><img src={landmarkObj.imageURL}></img></div>
        <h5>Type of Landmark</h5>
        <div className="landmark__type">{typeObj.type}</div>
        <h5>Year built or year that the historic event happened</h5>
        <div className="landmark__age">{landmarkObj.age}</div>
        <h5>Description</h5>
        <div className="landmark__description">{landmarkObj.description}</div>
        <h5>Hours</h5>
        <div className="landmark__hours">{landmarkObj.hours}</div>
        <h5>Pricing</h5>
        <div className="landmark__pricing">{landmarkObj.pricing}</div>
        <h5>Address</h5>
        <div className="landmark__address">{landmarkObj.address}</div>
        <h5>Website</h5>
        <div className="landmark__website"><a href={landmarkObj.websiteURL}></a></div>
    </section >
)


    // <a onClick={() => window.open(...landmarkObj.websiteURL)} ></a>

// window.location.href

