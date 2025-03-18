import { Link } from "react-router"
import Characters from "../Characters/Characters"
import Planets from "../Planets/Planets"
import Starships from "../Starships/Starships"

const nav = [
    { name: 'planets', component: <Planets /> },
    { name: 'home', component: <Characters /> },
    { name: 'starships', component: <Starships /> },

]
type props = {
    page: string
}
const Header = ({ page }: props) => {
    return (
        <header>
            {nav.map((item, i) => {
                if (item.name === page) {
                    return <Link to={`/${item.name}`} key={i} ><strong>{item.name}</strong></Link>

                } else {
                    return <Link to={`/${item.name}`} key={i} >{item.name}</Link>
                }
            })}
        </header>
    )
}

export default Header