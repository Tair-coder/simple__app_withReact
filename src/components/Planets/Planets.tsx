import { useEffect } from "react"
import Card from "../UI/Card"
import api from "../../api/axios"
import PlanetsItem from "./PlanetsItem"
import PlanetsPagination from "./PlanetsPagination/PlanetsPagination"

const Planets = () => {
    return (
        <Card>
            <h1>Planets:</h1>
            <PlanetsItem />
            <PlanetsPagination />
        </Card>
    )
}

export default Planets