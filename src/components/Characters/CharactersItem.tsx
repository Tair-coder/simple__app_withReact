import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'
import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setCharacters, setLoading } from '../../store/features/characters-slice'

const CharactersItem = () => {
    //states redux
    const { login, password } = useSelector((state: RootState) => state.user)
    const { characters, loading, currPage } = useSelector((state: RootState) => state.characters)
    const dispatch = useDispatch()
    // router
    const navigate = useNavigate()

    //
    useEffect(() => {

        // check for user
        if (login !== 'admin' || password !== 'password') {
            navigate('/')
        }

        // get data
        const getData = async () => {
            try {
                dispatch(setLoading(true))
                const res = await api.get(`people/?page=${currPage}`)
                dispatch(setCharacters(res.data))
            } catch (error) {
                console.log(error)
            }
            dispatch(setLoading(false))
        }
        getData()
    }, [currPage])


    if (loading) return 'Loading...'

    return (
        <ul className='characters__list'>
            {characters.map((character, i) => (
                <li key={i} className='characters__list__item'>
                    <Link to={`/characters/${character.url.split('/')[character.url.split('/').length - 2]}`} className='character__inf'>
                        {Object.keys(character).map((item, index) => {
                            if (index < 3) {
                                return <p key={`${i}:${index}`}>{item}: {character[item]}</p>
                            }
                        })}
                        ...
                    </Link>
                </li>


            ))}
        </ul>
    )
}

export default CharactersItem