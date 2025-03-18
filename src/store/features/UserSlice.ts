import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type User = {
    login: string
    password: string
}

const initialState = { login: '', password: '' }

const user = localStorage.getItem('user')
if (user) {
    const data = JSON.parse(user)
    if (data.login === 'admin' && data.password === 'password') {
        initialState.login = data.login
        initialState.password = data.password
    }

}

const UserSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.login = action.payload.login
            state.password = action.payload.password
        }
    }
})
export const { setUser } = UserSlice.actions
export default UserSlice.reducer