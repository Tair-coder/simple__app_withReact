import { Route, Routes } from 'react-router'
import './App.css'
import Login from './components/Login/Login'
import Characters from './components/Characters/Characters'
import Character from './components/Characters/CharacterPage/Character'
import Header from './components/UI/Header'
import Planets from './components/Planets/Planets'
import Planet from './components/Planets/Planet/Planet'
import Starships from './components/Starships/Starships'
import Starship from './components/Starships/Starship/Starship'
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode;
  name: string;
}
const Layout: React.FC<LayoutProps> = ({ children, name }) => {
  return <>
    <Header page={name} />
    {children}
  </>
}

function App() {

  return (
    <Routes>
      <Route index element={<Login />} />

      <Route path='/home' element={<Layout name={'home'}><Characters /></Layout>} />
      {/* page of character */}
      <Route path='/characters/:id' element={<Layout name={'home'}><Character /></Layout>} />
      {/* Planets  */}
      <Route path='/planets' element={<Layout name={'planets'}><Planets /></Layout>} />
      <Route path='/planets/:id' element={<Layout name={'planets'}><Planet /></Layout>} />
      {/* startships */}
      <Route path='/starships' element={<Layout name={'starships'}><Starships /></Layout>} />
      <Route path='/starships/:id' element={<Layout name={'starships'}><Starship /></Layout>} />
    </Routes>
  )
}

export default App
