
import React, { useContext, useRef, useEffect } from "react"
import "./NavBar.css"
import { Link } from "react-router-dom"
import { CityContext } from "../cities/CityProvider"
import { TripContext } from "../trips/TripProvider"
import { Home } from "../home/Home"
import { Route } from "react-router-dom"

export const NavBar = (props) => {
    const { citiesArray, getCities } = useContext(CityContext)
    const { tripsArray, getTrips } = useContext(TripContext)
    const { currentCityId } = useContext(CityContext)

    const city = useRef(null)
    const trip = useRef(null)

    useEffect(() => {
        getCities()
    }, [])

    useEffect(() => {
        getTrips()
    }, [])

    const handleCitySelect = () => {
        //*=== needs "" wrapped around value if not a sting, or just put == instead of ===
        if (city.current.value === "0") {
            props.history.push("/")

        } else if (city.current.value !== 0) {
            props.history.push(`/landmarks/${city.current.value}`)
        }
        // console.log("city", city.current.value)
    }

    const handleTripSelect = () => {
        //*if current city value = 0 then push to home (make sure == and not ===)
        if (trip.current.value === "0") {
            props.history.push("/")

        } else if (trip.current.value !== 0) {
            parseInt(localStorage.setItem("current_trip_id", trip.current.value))
            // props.history.push(`/landmarks/${currentCityId}`)
            // props.history.push(`/trips/${trip.current.value}`)

            // add route in application view to match above path and render tripdetail component
            // need tripdetail component that gets landmarks for this trip
        }
    }
    // console.log("dropdownprop", props)
    return (
        <div className="navbar">
            <select defaultValue="0"
                onChange={() => {
                    handleCitySelect()
                }}
                name="city" ref={city} id="destinationCity" className="form-control">
                <option value="0">Select a City</option>
                {
                    citiesArray.map(city => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))
                }
            </select >

            <br></br>

            < select defaultValue=""
                onChange={handleTripSelect}
                name="trip" ref={trip} id="createdTrip" className="form-control" >
                <option value="0">Select Your Trip</option>
                {
                    tripsArray.map(trip => (
                        <option key={trip.id} value={trip.id}>
                            {trip.name}
                        </option>
                    ))
                }
            </select >
        </div >
    )
}

























// export const NavBar = (props) => {
//     return (
//         <ul className="navbar">
//             <li className="navbar__item active">
//                 <Link className="navbar__link" to="/">NSS Kennels</Link>
//             </li>
//             <li className="navbar__item">
//                 <Link className="navbar__link" to="/animals">Animals</Link>
//             </li>
//         </ul>
//     )
// }






