import { useEffect, useState } from 'react'
import api from '../../../api/axios'
import { useParams } from 'react-router'
import Card from '../../UI/Card'
import * as yup from 'yup'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// types
type Inputs = {
    name: string
    rotation_period: string
    orbital_period: string
    diameter: string
    climate: string
    gravity: string
    terrain: string
    surface_water: string
    population: string
}
// yup schema
const schema = yup.object({
    name: yup.string().required().min(1),
    rotation_period: yup.string().required().min(1),
    orbital_period: yup.string().required().min(1),
    diameter: yup.string().required().min(1),
    climate: yup.string().required().min(1),
    gravity: yup.string().required().min(1),
    terrain: yup.string().required().min(1),
    surface_water: yup.string().required().min(1),
    population: yup.string().required().min(1)

})
const Planet = () => {
    // get planet id
    const { id } = useParams()

    const [planet, setPlanet] = useState({})
    const [loading, setLoading] = useState<boolean>(false)

    // read or update state
    const [changeMode, setChangeMode] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) })

    useEffect(() => {
        const getPlanet = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/planets/${id}`)
                setPlanet(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getPlanet()
    }, [])

    const submitHandler: SubmitHandler<Inputs> = (data) => {
        // turn off change mode and  set new values of inputs
        setPlanet(data)
        setChangeMode(false)

    }

    if (loading) return 'Loading...'


    return (
        <Card>
            <h1 className='title'>Character info</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                {Object.keys(planet).map((item, index) => {
                    if (index < 9) {
                        if (changeMode) {
                            return <p key={index}>{item.split('_').join(' ')} : <input defaultValue={planet[item]} {...register(item, { required: true })} /></p>
                        } else {
                            return <p key={index}>{item.split('_').join(' ')} : {planet[item]}</p>
                        }
                    }
                })}
                {changeMode && <button className='login__form__btn' style={{ marginTop: '10px' }}>Save Changers</button>}
            </form>
            <button type='button' className='login__form__btn' style={{ marginTop: '30px' }} onClick={() => setChangeMode(!changeMode)}>{changeMode ? 'Exit change mode' : 'Change'}</button>

        </Card>
    )
}

export default Planet