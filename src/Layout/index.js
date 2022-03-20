/* eslint-disable no-restricted-globals */ // <-- enables window.confirm feature
import React, {useEffect,useState } from "react";
import { Route, Switch, Link, useHistory } from "react-router-dom";

import { deleteDeck, listDecks } from "../utils/api/index";
import Header from "./Header";
import NotFound from "./NotFound";
import ShowDeck from "./decks/ShowDeck";
import CreateDeck from "./decks/CreateDeck";

function Layout() {
  const history = useHistory();

  const [deckList, setDeckList] = useState([]);
  useEffect(() => {
    listDecks().then(array=>setDeckList(array));
  },[deckList.length]);

  const clickHandle = (event) => {
    event.preventDefault();
    if(confirm("Are you sure you want to delete this deck? Action cannot be undone."))
      deleteDeck(event.target.id).then(history.replace(`/`)).then(window.location.reload(false));
  };

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
          <>
            <div className="deckcreate">
              <Link to="/decks/new">
                <button className="btn btn-secondary new" type="button" >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                  </svg> {' '}Create Deck
                </button>
              </Link>
            </div>
            <ul className="deck-list">{deckListItems(deckList, clickHandle)}</ul>
          </>
          </Route>
          <Route path="/decks/new"><CreateDeck deckList={deckList} deckNum={deckList.length}/></Route>
          <Route path="/decks/:deckId"><ShowDeck clickHandle={clickHandle} /></Route>
          <Route path=""><NotFound /></Route> 
        </Switch> 
      </div>
    </>
  );
}

function deckListItems(decks=[], clickHandle){
  return decks.map(({id, name, description, cards=[]}, index) => {
    return (
    <li key={index} className="deckListItem">
      <div className="deck-header">
        <h4>{name}</h4>
        <p className="text-muted">{cards.length} cards</p>
      </div>
      <p>{description}</p>
      <div className="decklist-btns">
        <Link to={`/decks/${id}`}>
          <button type="button" className="btn btn-secondary view">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
            </svg>{' '}View
          </button>
        </Link>
        <Link to={`/decks/${id}/study`}>
          <button type="button" className="btn btn-primary study">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
              <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
              <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
            </svg> {' '}Study
          </button>
        </Link>
        <button className="btn btn-danger delete" id={id} onClick={clickHandle}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
          </svg>
        </button>
      </div>
    </li> );
  });
}

export default Layout;