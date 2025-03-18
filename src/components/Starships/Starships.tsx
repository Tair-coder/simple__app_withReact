import Card from '../UI/Card'
import StarshipsItem from './StarshipsItem'
import StarshipsPagination from './StarshipsPagination/StarshipsPagination'

const Starships = () => {
    return (
        <Card>
            <h1>Starships: </h1>
            <StarshipsItem />
            <StarshipsPagination />
        </Card>
    )
}

export default Starships