/* eslint-disable no-restricted-globals */
import { Route, Switch, Link } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import React, {useEffect,useState } from "react";
import "../utils/api/index";
import { deleteDeck, listDecks } from "../utils/api/index";
import ShowDeck from "./decks/ShowDeck";
import CreateDeck from "./decks/CreateDeck";

function Home(){
  const [deckList, setDeckList] = useState([{}]);
  useEffect(() => {
    async function list(){
      const body = await listDecks(); 
      setDeckList(body);
    }
    list();
  },[]);

  const clickHandle = (event) => {
    event.preventDefault();
    const popup = confirm("Are you sure you want to delete this deck? Action cannot be undone.")
    if(popup){
      const {id} = deckList[deckList.length-1];
      deleteDeck(id).then(setDeckList(()=>deckList.pop)) 
    } 
  };
  
  return (
    <>
      <div className="deckcreate">
        <Link to="/decks/new">
          <button className="btn btn-secondary" type="button" >+ Create Deck</button>
        </Link>
      </div>
      <ul className="deck-list">
        {deckListItems(deckList, clickHandle)}
      </ul>
    </>
  );
};

function deckListItems(decks, clickHandle){
  return decks.map(({id, name, description, cards=[]}, index) => {
    return (<li key={index} className="deckListItem">
      <h5>{name}</h5>
      <p>{description}</p>
      <p>{cards.length} cards</p>
      <Link to={`/decks/${id}`}>
        <button type="button" className="btn btn-secondary">View</button>
      </Link>
      <Link to={`/decks/${id}/study`}>
        <button type="button" className="btn btn-primary">Study</button>
      </Link>
      <button className="btn btn-danger" value={id} onClick={clickHandle}>Delete</button>
    </li> );
  });
}
 
function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <Switch>
          <Route exact path="/">{Home()}</Route>
          <Switch>
            <Route path="/decks/new"><CreateDeck /></Route>
            <Switch>
              <Route path="/decks/:deckId"><ShowDeck /></Route>
            </Switch>
          </Switch>
          <Route path=""><NotFound /></Route> 
        </Switch> 
      </div>
    </>
  );
}

export default Layout;