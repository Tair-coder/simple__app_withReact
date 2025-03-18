import { Link, useNavigate } from 'react-router'
import { useEffect } from 'react'
import api from '../../api/axios'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { setPlanets, setLoading } from '../../store/features/planets-slice'

const PlanetsItem = () => {
    //states redux
    const { login, password } = useSelector((state: RootState) => state.user)

    // planets states
    const { planets, loading, currPage } = useSelector((state: RootState) => state.planets)
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
                const res = await api.get(`planets/?page=${currPage}`)
                dispatch(setPlanets(res.data))
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
            {planets.map((planet, i) => (
                <li key={i} className='characters__list__item'>
                    <Link to={`/planets/${planet.url.split('/')[planet.url.split('/').length - 2]}`} className='character__inf'>
                        {Object.keys(planet).map((item, index) => {
                            if (index < 3) {
                                return <p key={`${i}:${index}`}>{item}: {planet[item]}</p>
                            }
                        })}
                        ...
                    </Link>
                </li>


            ))}
        </ul>
    )
}

export default PlanetsItem