import React from "react"

export const CityHTML = ({ cityObj }) => (
    <section className="city">
        <h3 className="city__name">{cityObj.name}</h3>
    </section>
)