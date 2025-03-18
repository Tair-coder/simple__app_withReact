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
    height: string
    mass: string
    hair_color: string
    skin_color: string
    eye_color: string
    birth_year: string
    gender: string
}
// yup schema
const schema = yup.object({
    name: yup.string().required().min(1),
    height: yup.string().required().min(1),
    hair_color: yup.string().required().min(1),
    skin_color: yup.string().required().min(1),
    eye_color: yup.string().required().min(1),
    birth_year: yup.string().required().min(1),
    gender: yup.string().required().min(1)

})

//func
const Character = () => {
    const { id } = useParams()

    const [character, setCharacter] = useState({})
    const [loading, setLoading] = useState<boolean>(false)

    // read or update state
    const [changeMode, setChangeMode] = useState<boolean>(false)

    // value of inputs connect to hook
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ resolver: yupResolver(schema) })

    // get data
    useEffect(() => {
        const getCharacter = async () => {
            try {
                setLoading(true)
                const res = await api.get(`/people/${id}`)
                setCharacter(res.data)
            } catch (error) {
                console.log(error)
            }
            setLoading(false)
        }
        getCharacter()
    }, [])


    // save Changes after click btn
    const submitHandler: SubmitHandler<Inputs> = (data) => {
        setCharacter(data)
        setChangeMode(false)
    }

    if (loading) return 'Loading...'

    return (
        <Card>
            <h1 className='title'>Character info</h1>
            <form onSubmit={handleSubmit(submitHandler)}>
                {Object.keys(character).map((item, index) => {
                    if (index < 8) {
                        if (changeMode) {
                            return <p key={index}>{item.split('_').join(' ')} : <input defaultValue={character[item]} {...register(item, { required: true })} /></p>
                        } else {
                            return <p key={index}>{item.split('_').join(' ')} : {character[item]}</p>
                        }
                    }
                })}
                {changeMode && <button className='login__form__btn'>Save Changers</button>}
            </form>
            <button style={{ marginTop: '30px' }} className='login__form__btn' onClick={() => setChangeMode(!changeMode)}>{changeMode ? 'Exit change mode' : 'Change'}</button>
        </Card>
    )
}

export default Character