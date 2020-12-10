import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripList } from "./trips/TripList"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"
import { LandmarkList } from "./landmarks/LandmarkList"

export const ApplicationView = () => {
    return (
        <>
            <LandmarkProvider>
                <CityProvider>
                    <Route>
                        {/* <Route exact path="/"> */}
                        <LandmarkList />
                    </Route>
                </CityProvider>
            </LandmarkProvider>

            {/* <TripProvider>
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