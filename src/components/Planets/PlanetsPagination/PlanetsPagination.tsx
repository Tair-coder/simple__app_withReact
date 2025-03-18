import { RootState } from "../../../store/store"
import { useDispatch, useSelector } from "react-redux"
import { setNextPage, setPreviousPage } from "../../../store/features/planets-slice"

const PlanetsPagination = () => {
    const { previousPage, currPage, nextPage } = useSelector((state: RootState) => state.planets)
    const dispatch = useDispatch()
    return (
        <div className="characters__pagination">
            <button disabled={!previousPage} onClick={() => dispatch(setPreviousPage())}>Previous</button>
            <p>{currPage}</p>
            <button disabled={!nextPage} onClick={() => dispatch(setNextPage())}>Next</button>
        </div>
    )
}

export default PlanetsPagination