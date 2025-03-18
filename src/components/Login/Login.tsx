import { yupResolver } from "@hookform/resolvers/yup"
import Card from "../UI/Card"
// import from form hooks
import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { useEffect } from "react"
import { useNavigate } from "react-router"
import { useDispatch } from "react-redux"
import { setUser } from '../../store/features/UserSlice'

// types for inputs
type Inputs = {
    login: string
    password: string
}

// schema for yup verify
const schema = yup.object({
    login: yup.string().required(),
    password: yup.string().min(8).required()
}).required()

// login component
const Login = () => {
    // react form hook vars
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: yupResolver(schema)
    })
    // navigate router
    const navigate = useNavigate()

    /*
    * redux dispatch
    */
    const dispatch = useDispatch()


    // localstorage For user if true redirect to home page
    useEffect(() => {
        const user = localStorage.getItem('user')
        if (user) {
            const data = JSON.parse(user)
            if (data.login === 'admin' && data.password === 'password') {
                dispatch(setUser({ login: data.login, password: data.password }))
                navigate('/home')
            }
        }
    }, [navigate])


    const onSubmit: SubmitHandler<Inputs> = (data) => {
        if (data.login === 'admin' && data.password === 'password') {
            dispatch(setUser({ login: data.login, password: data.password }))
            localStorage.setItem('user', JSON.stringify(data))
            navigate('/home')
        }
    }
    return (
        <Card>
            <h1 className="title">Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="login__form">
                <input type="text" placeholder="Login" className="login__form__inp"  {...register('login', { required: true })} />
                <input type="password" placeholder="Password" className="login__form__inp"  {...register('password', { required: true })} />
                <input type="submit" className="login__form__btn" />
                {errors && <p style={{ color: 'red', maxWidth: '100%', fontSize: '10px' }}>{errors.login?.message || errors.password?.message}</p>}
            </form>
        </Card>
    )
}

export default Login