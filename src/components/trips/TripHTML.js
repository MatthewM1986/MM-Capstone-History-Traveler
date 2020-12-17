import React from "react"

export const TripHTML = ({ tripObj }) => (
    <section className="trip">
        <h3 className="trip__name">{tripObj.name}</h3>
    </section>
)