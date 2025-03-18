import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, planets: [], error: null, currPage: 1, nextPage: null, previousPage: null }
const planetsSlice = createSlice({
    name: 'planets',
    initialState,
    reducers: {
        setPlanets: (state, action) => {
            // states
            state.planets = action.payload.results
            state.nextPage = action.payload.next
            state.previousPage = action.payload.previous


            if (action.payload.previous == null) {
                state.currPage = 1
            }

        },
        setLoading: (state, action) => {
            state.loading = action.payload
        },
        setNextPage: (state) => {
            if (state.nextPage) {
                state.currPage += 1
            }
        },
        setPreviousPage: (state) => {
            if (state.previousPage) {
                state.currPage -= 1
            }
        }
    }
})
export const { setPlanets, setLoading, setNextPage, setPreviousPage } = planetsSlice.actions
export default planetsSlice.reducer