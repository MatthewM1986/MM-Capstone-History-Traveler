// import React, { useContext, useEffect, useState } from "react"
// import { LandmarkContext } from "../landmarks/LandmarkProvider"
// import "../landmarks/Landmark.css"

// export const CityDetail = (props) => {
//     const { getLandmarksByCityId } = useContext(LandmarkContext)

//     const [landmark, setCity] = useState({ landmarks: {} })

//     useEffect(() => {
//         const cityId = parseInt(props.match.params.cityId)
//         getLandmarksByCityId(cityId)
//             .then(setCity)
//     }, [])

//     return (
//         <section className="landmark">
//             <h3 className="landmark__name">{landmark.name}</h3>
//             <div className="landmark__image"><img src={landmark.imageURL}></img></div>
//             <div className="landmark__type">{landmark.type}</div>
//             <div className="landmark__age">{landmark.age}</div>
//             <div className="landmark__description">{landmark.description}</div>
//             <div className="landmark__hours">{landmark.hours}</div>
//             <div className="landmark__pricing">{landmark.pricing}</div>
//             <div className="landmark__address">{landmark.address}</div>
//             <div className="landmark__website">{landmark.website}</div>
//         </section>
//     )
// }