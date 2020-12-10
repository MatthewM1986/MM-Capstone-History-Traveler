import React from "react"
import "./Landmark.css"

export const LandmarkHTML = ({ landmarkObj }) => (
    <section className="landmark">
        <h3 className="landmark__name">{landmarkObj.name}</h3>
        <div className="landmark__image"><img src={landmarkObj.imageURL}></img></div>
        <div className="landmark__type">{landmarkObj.type}</div>
        <div className="landmark__age">{landmarkObj.age}</div>
        <div className="landmark__description">{landmarkObj.description}</div>
        <div className="landmark__hours">{landmarkObj.hours}</div>
        <div className="landmark__pricing">{landmarkObj.pricing}</div>
        <div className="landmark__address">{landmarkObj.address}</div>
        <div className="landmark__website">{landmarkObj.website}</div>
    </section>
)