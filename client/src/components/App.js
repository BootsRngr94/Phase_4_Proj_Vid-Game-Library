import React, { useEffect, useState } from "react";
import NavBar from "./NavBar"
import { Switch, Route } from "react-router-dom";
import Games from './Games'
import Genres from './Genres'
import Consoles from './Consoles'
import NewGameForm from './NewGameForm'
import PopUp from './PopUp'



const baseURL = ('http://127.0.0.1:5555')

function App() {
  const [games, setGames] = useState([])
  const[consoles, setConsoles]= useState([])
  const[genres, setGenres]= useState([])
  const [isPopUpOpen, setPopUpOpen] = useState(false);
  
  const closePopUp = () => {
    setPopUpOpen(false);
  };

  useEffect(() => {
    setPopUpOpen(true);
  }, []);

  useEffect(() => {
    fetch(`${baseURL}/games`)
      .then((res) => res.json())
      .then((data) => setGames(data))
  },[])
  //console.log(data)


  useEffect(() => {
    fetch(`${baseURL}/consoles`)
      .then((res) => res.json())
      .then((data) => setConsoles(data))
  },[])
  //console.log(data)

  useEffect(() => {
    fetch(`${baseURL}/genres`)
      .then((res) => res.json())
      .then((data) => setGenres(data))
    },[])
  
  return (
    <>
    <header>
      <h1>Game Library</h1>
    </header>
    <NavBar/>
    <Switch>
      <Route exact path="/games">
        <Games games={games} consoles = {consoles} setGames = {setGames}/>
      </Route>
      <Route exact path="/genres">
        <Genres genres={genres}/>
      </Route>
      <Route exact path="/consoles">
        <Consoles consoles={consoles}/>
      </Route>
      <Route exact path="/newGame">
        <NewGameForm setGames={setGames} consoles={consoles}/>
      </Route>
    </Switch>
    <div className="App">
      {isPopUpOpen && <PopUp onClose={closePopUp} />}
      <div className="landing-page">
        {/* Your landing page content goes here */}
      </div>
    </div>
  </>
  );
}



export default App;
