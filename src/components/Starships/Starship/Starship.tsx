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
    model: string
    manufacturer: string
    cost_in_credits: string
    length: string
    max_atmosphering_speed: string
    crew: string
    passengers: string
    cargo_capacity: string
    consumables: string
    hyperdrive_rating: string
    MGLT: string
    starship_class: string
}
// yup schema
const schema = yup.object({
    name: yup.string().required().min(1),
    model: yup.string().required().min(1),
    manufacturer: yup.string().required().min(1),
    cost_in_credits: yup.string().required().min(1),
    length: yup.string().required().min(1),
    max_atmosphering_speed: yup.string().required().min(1),
    crew: yup.string().required().min(1),
    passengers: yup.string().required().min(1),
    cargo_capacity: yup.string().required().min(1),
    hyperdrive_rating: yup.string().required().min(1),
    consumables: yup.string().required().min(1),
    MGLT: yup.string().required().min(1),
    starship_class: yup.string().required().min(1)
})

//func
const Starship = () => {
    const { id } = useParams()

    const [starship, setStarship] = useState({})
    const [loading, setLoading] = useState<boolean>(false)

    // read or update state
    const [changeMode, setChangeMode] = useState<boolean>(false)

    // value of inputs connect to hook
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) })

    // get data
    useEffect(() => {
        const getStarship = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/starships/${id}`)
                setStarship(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getStarship()
    }, [])


    // save Changes after click btn
    const submitHandler: SubmitHandler<Inputs> = (data) => {
        setStarship(data)
        setChangeMode(false)
    }

    if (loading) return 'Loading...'

    return (
        <Card>
            <h1 className='title'>Character info</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                {Object.keys(starship).map((item, index) => {
                    if (index < 13) {
                        if (changeMode) {
                            return <p key={index}>{item.split('_').join(' ')} : <input defaultValue={starship[item]} {...register(item, { required: true })} /></p>
                        } else {
                            return <p key={index}>{item.split('_').join(' ')} : {starship[item]}</p>
                        }
                    }
                })}
                {changeMode && <button className='login__form__btn'>Save Changers</button>}
            </form>
            <button style={{ marginTop: '30px' }} className='login__form__btn' onClick={() => setChangeMode(!changeMode)}>{changeMode ? 'Exit change mode' : 'Change'}</button>
        </Card>
    )
}

export default Starship