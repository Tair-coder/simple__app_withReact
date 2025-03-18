import { createSlice } from "@reduxjs/toolkit";

const initialState = { loading: false, characters: [], error: null, currPage: 1, nextPage: null, previousPage: null }
const charactersSlice = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        setCharacters: (state, action) => {
            // states
            state.characters = action.payload.results
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
export const { setCharacters, setLoading, setNextPage, setPreviousPage } = charactersSlice.actions
export default charactersSlice.reducer