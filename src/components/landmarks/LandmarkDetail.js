import React, { useContext, useRef, useEffect, useState } from "react"
import { LandmarkContext } from "./LandmarkProvider"
import { LandmarkHTML } from "./LandmarkHTML"
import "./Landmark.css"
import { TypeContext } from "../types/TypeProvider"
import { TripContext } from "../trips/TripProvider"
import { CityContext } from "../cities/CityProvider"

export const LandmarkDetails = (props) => {
    const { landmarksArray, getLandmarks } = useContext(LandmarkContext)
    const { typesArray, getTypes } = useContext(TypeContext)
    const { tripsArray, getTrips, addLandmarkToTrip } = useContext(TripContext)
    const { currentCityId } = useContext(CityContext)

    const [landmark, setLandmark] = useState({})
    const [typeOfLandmark, setTypeOfLandmark] = useState({})
    const [tripId, setTripId] = useState(0)

    // useRef stores the value of trip until it is referenced later
    const trip = useRef(null)

    useEffect(() => {
        getTypes()
            .then(getLandmarks)
    }, [])

    useEffect(() => {
        getTrips()
    }, [])

    //This looks throught the landmarks array and finds the landmark id that matches the landmark id stores in props
    useEffect(() => {
        const landmark = landmarksArray.find(lm => lm.id === +props.match.params.landmarkId) || {}
        //This sets the found id into the useState
        setLandmark(landmark)
    }, [landmarksArray])

    //This looks throught the types array and finds the type id that matches the landmark type id
    useEffect(() => {
        const typeOfLandmark = typesArray.find(t => t.id === landmark.typeId) || {}
        //This sets the found id into the useState
        setTypeOfLandmark(typeOfLandmark)
    }, [landmark])


    const addNewLandmarkTripObj = () => {
        //get landmarkid and parses through props to find the landmark id
        const landmarkId = +props.match.params.landmarkId
        if (tripId !== 0) {

            //puts values into an object and then call the function that will post to the database
            addLandmarkToTrip({
                landmarkId: landmarkId,
                tripId: tripId
            })
                //This pushes the new object to a page that equals the id attached to it
                .then(() => props.history.push(`/landmarks/${currentCityId}`))
        } else {
            //This is a pop up window that tells the visitor to first select from the dropdown before clicking the button
            window.alert("Select Your Trip First")
        }

    }

    // On change looks for handleTripSelect's value
    const handleTripSelect = (event) => {
        //Parsing the event id then sets the TripId to the trip array
        setTripId(+event.target.value)
    }

    return (
        <div className="landmark">
            < LandmarkHTML key={landmark.id} typeObj={typeOfLandmark} landmarkObj={landmark} />
            < select defaultValue="0"
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
            <button onClick={addNewLandmarkTripObj} >
                Add to Trip
            </button>
        </div >

    )
}
