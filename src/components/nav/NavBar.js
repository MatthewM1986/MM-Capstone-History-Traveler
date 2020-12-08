
import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item">
                <Link className="navbar__link" to="/destinations">Choose Destination</Link>
            </li>
            <li className="navbar__item">
                <Link className="navbar__link" to="/myTrips">Choose My Trip</Link>
            </li>
        </ul>
    )
}