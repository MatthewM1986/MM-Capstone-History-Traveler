import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { CityList } from "./cities/CityList"
import { TripProvider } from "./trips/TripProvider"
import { TripList } from "./trips/TripList"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"

export const ApplicationView = (props) => {
    return (
        <>
            {/* 
            <CityProvider>
                <LandmarkProvider>
                    <Route exact path="/">
                        <CityList />
                    </Route>
                </LandmarkProvider>
            </CityProvider>

            <TripProvider>
                <LandmarkProvider>
                    <CityProvider>
                        <Route exact path="/">
                            <TripList />
                        </Route>
                    </CityProvider>
                </LandmarkProvider>
            </TripProvider> */}
        </>
    )
}