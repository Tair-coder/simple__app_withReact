import Card from '../UI/Card'
import CharactersItem from './CharactersItem'
import CharactersPagination from './CharactersPagination/CharactersPagination'


const Characters = () => {
    return (
        <Card>
            <h1>Characters:</h1>
            <CharactersItem />
            <CharactersPagination />
        </Card>
    )
}

export default Characters