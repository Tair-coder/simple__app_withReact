import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'
import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setStarships, setLoading } from '../../store/features/starships-slice'

const StarshipsItem = () => {
    //states redux
    const { login, password } = useSelector((state: RootState) => state.user)
    const { starships, loading, currPage } = useSelector((state: RootState) => state.starships)
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
                const res = await api.get(`starships/?page=${currPage}`)
                dispatch(setStarships(res.data))
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
            {starships.map((starship, i) => (
                <li key={i} className='characters__list__item'>
                    {/* id of starships */}
                    <Link to={`/starships/${starship.url.split('/')[starship.url.split('/').length - 2]}`} className='character__inf'>
                        {Object.keys(starship).map((item, index) => {
                            if (index < 3) {
                                return <p key={`${i}:${index}`}>{item}: {starship[item]}</p>
                            }
                        })}
                        ...
                    </Link>
                </li>


            ))}
        </ul>
    )
}


export default StarshipsItem