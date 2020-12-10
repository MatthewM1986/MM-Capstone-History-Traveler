import React, { useContext, useEffect } from "react"
import { TypeContext } from "./TypeProvider"
import { TypeHTML } from "./TypeHTML"

export const TypeList = () => {
    const { typesArray, getTypes } = useContext(TypeContext)

    useEffect(() => {
        getTypes()
    }, [])

    return (
        <div className="types">
            {
                typesArray.map(tp => < TypeHTML key={tp.id} typeObj={tp} />)
            })
        </div>
    )
}