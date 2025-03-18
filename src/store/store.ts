import { configureStore } from '@reduxjs/toolkit'
import UserSlice from './features/UserSlice'
import charactersSlice from './features/characters-slice'
import planetsSlice from './features/planets-slice'
import starshipsSlice from './features/starships-slice'

// store 
const store = configureStore({
    reducer: {
        user: UserSlice,
        characters: charactersSlice,
        planets: planetsSlice,
        starships: starshipsSlice
    }
})
export type RootState = ReturnType<typeof store.getState>;

export default store