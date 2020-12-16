import React from "react"
import "./Landmark.css"
import { Link } from "react-router-dom"

export const LandmarkHTML = ({ typeObj, landmarkObj }) => (
    <section>
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
        <h4 className="landmark__website"><a target="_blank" href={landmarkObj.websiteURL}>{landmarkObj.websiteURL}</a></h4>
    </section >
)


