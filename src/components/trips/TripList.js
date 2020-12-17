import React, { useContext, useEffect, useState } from "react"
import { TripContext } from "./TripProvider"
import { TripHTML } from "./TripHTML"
import "./Trip.css"

export const TripList = (props) => {
    const { tripsArray, getTrips } = useContext(TripContext)

    useEffect(() => {
        getTrips()
    }, [])


    return (
        <div className="landmark">
            {
                tripsArray.map(t =>
                    < TripHTML key={t.id} tripObj={t} />
                )
            }
        </div>
    )
}