// import { RootState } from "@reduxjs/toolkit/query"
import { useDispatch, useSelector } from "react-redux"
import { setNextPage, setPreviousPage } from "../../../store/features/characters-slice"
import { RootState } from "../../../store/store"

const CharactersPagination = () => {
    const { previousPage, currPage, nextPage } = useSelector((state: RootState) => state.characters)
    const dispatch = useDispatch()
    return (
        <div className="characters__pagination">
            <button disabled={!previousPage} onClick={() => dispatch(setPreviousPage())}>Previous</button>

            <p>{currPage}</p>
            <button disabled={!nextPage} onClick={() => dispatch(setNextPage())}>Next</button>
        </div>
    )
}

export default CharactersPagination