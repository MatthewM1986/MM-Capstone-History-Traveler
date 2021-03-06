import React from "react"
import { Route } from "react-router-dom"
import { CityProvider } from "./cities/CityProvider"
import { TypeProvider } from "./types/TypeProvider"
import { TripProvider } from "./trips/TripProvider"
import { TripDetails } from "./trips/TripDetail"
import { Home } from "./home/Home"
import { TripList } from "./trips/TripList"
import { LandmarkProvider } from "./landmarks/LandmarkProvider"
import { LandmarkList } from "./landmarks/LandmarkList"
import { LandmarkDetails } from "./landmarks/LandmarkDetail"
import { NavBar } from "./nav/NavBar"
// import "./ApplicationView.css"
import background from "./images/OldMapBlue.jpg"

//this executes each module that is routed through here
export const ApplicationView = () => {
    return (
        <>
            <section
                style={{
                    backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover'
                }} >

                <CityProvider>
                    <TripProvider>
                        <LandmarkProvider>
                            <Route path="/" render={props => <NavBar {...props} />} />

                            <Route exact path="/" render={props => <Home {...props} />} />
                        </LandmarkProvider>
                    </TripProvider>
                </CityProvider>

                <TripProvider>
                    <TypeProvider>
                        <LandmarkProvider>
                            <CityProvider>
                                <Route exact path="/trips/:tripId(\d+)" render={
                                    props => <TripDetails {...props} />
                                } />

                                <Route exact path="/trips" render={
                                    props => <TripList {...props} />
                                } />
                            </CityProvider>
                        </LandmarkProvider>
                    </TypeProvider>
                </TripProvider>

                <TripProvider>
                    <TypeProvider>
                        <LandmarkProvider>
                            <CityProvider>
                                <Route exact path="/landmarks/:cityId(\d+)" render={
                                    props => <LandmarkList {...props} />
                                } />

                                <Route exact path="/landmarks/detail/:landmarkId(\d+)" render={
                                    props => <LandmarkDetails cityId={props.match.params.cityId} {...props} />
                                } />
                            </CityProvider>
                        </LandmarkProvider>
                    </TypeProvider>
                </TripProvider>
            </section>
        </>
    )
}