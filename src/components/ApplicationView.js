import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { CityList } from "./cities/CityList"
import { TypeProvider } from "./types/TypeProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripList } from "./trips/TripList"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"
import { LandmarkList } from "./landmarks/LandmarkList"
import { LandmarkDetails } from "./landmarks/LandmarkDetail"
import { Home } from "./home/Home"


export const ApplicationView = () => {
    return (
        <>
            <Route exact path="/">
                <Home></Home>
            </Route>

            <TypeProvider>
                <LandmarkProvider>
                    <CityProvider>
                        <Route exact path="/landmarks/:cityId(\d+)" render={
                            props => <LandmarkList {...props} />
                        } />

                        <Route exact path="/landmark/detail/:landmarkId(\d+)" render={
                            props => <LandmarkDetails {...props} />
                        } />
                    </CityProvider>
                </LandmarkProvider>
            </TypeProvider>


            {/* <TypeProvider>
                <LandmarkProvider>
                    <CityProvider>
                        <Route path="/landmarks/:cityId(\d+)" render={
                            props => <LandmarkItinerary {...props} />
                        } />
                    </CityProvider>
                </LandmarkProvider >
            </TypeProvider > */}

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