import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, starships: [], error: null, currPage: 1, nextPage: null, previousPage: null }
const starshipsSlice = createSlice({
    name: 'starships',
    initialState,
    reducers: {
        setStarships: (state, action) => {
            // states
            state.starships = action.payload.results
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
export const { setStarships, setLoading, setNextPage, setPreviousPage } = starshipsSlice.actions
export default starshipsSlice.reducer