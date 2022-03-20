/* eslint-disable no-restricted-globals */ // <-- enables window.confirm feature
import React, { useState, useEffect } from "react";
import { Link, useParams, Switch, Route, useRouteMatch } from "react-router-dom";

import { readDeck, deleteCard } from "../../utils/api";
import StudyCards from "../cards/StudyCards";
import CreateCard from "../cards/CreateCard";
import EditCard from "../cards/EditCard";
import EditDeck from "./EditDeck";

/* 
  ShowDeck(): Shows all of the information about a specified deck with options
  to edit or add cards to the deck, navigate to the study screen, or delete the
  deck
*/
export default function ShowDeck({clickHandle }){
  let {deckId} = useParams();

  const blank_deck = {
    "name":"",
    "description":"",
    "id":0,
    "cards":[]
  };
  const [deckInfo, setDeckInfo] = useState({...blank_deck});
  let {name, description, cards, id} = deckInfo;
  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      setDeckInfo(await response);
    };
    fetchDeck();
  },[deckId, cards.length]);

  const {url, path} = useRouteMatch();

  const cardDeleter = ({target}) => {
    event.preventDefault();
    if(confirm("Are you sure you want to delete this card? Action cannot be undone."))
      deleteCard(target.id).then(window.location.reload(false))
    return deckId;
  };
  return (
    <Switch>
      <Route exact path={path}>
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                    className="bi bi-house-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                  <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                </svg> {' '}Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">{name}</li>
            </ol>
          </nav>
          <section>
            <div className="deckinfo">
              <h3>{name}</h3>
              <p>{description}</p>
              <div className="deck-heading-btns">
                <Link to={`${url}/edit`}>
                  <button type="button" className="btn btn-secondary edit" value={id}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                      <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                    </svg> {' '}Edit
                  </button>
                </Link>
                <Link to={`${url}/study`}>
                  <button type="button" className="btn btn-primary study">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-journal-bookmark-fill" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"/>
                      <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z"/>
                      <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z"/>
                    </svg> {' '}Study
                  </button>
                </Link>
                <Link to={`${url}/cards/new`}>
                  <button className="btn btn-primary new" type="button" >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg> {' '}Add Cards
                  </button>
                </Link>
                <button type="button" className="btn btn-danger delete" id={deckId} onClick={clickHandle}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <h2>Cards</h2>
              <ul className="cardlist">{cardListItems(cards, cardDeleter)}</ul>
            </div>
          </section>
        </>
      </Route>
      <Route exact path={`${path}/study`}><StudyCards deck={deckInfo}/></Route>
      <Route exact path={`${path}/edit`}><EditDeck /></Route>
      <Switch>
        <Route exact path={`${path}/cards/new`}><CreateCard /></Route>
        <Route path={`${path}/cards/:cardId/edit`}><EditCard title={name}/></Route>
      </Switch>
    </Switch>
  );
};
function cardListItems(cards, cardDeleter){
  const cardListItem = cards.map(({id, deckId, front, back}) => {
     return (
      <li key={id} id={deckId}>
        <div className="txtGroup">
          <p className="cardFront">{front}</p>
          <p className="cardBack">{back}</p>
        </div>
        <div className="btnGroup">
          <Link to={`/decks/${deckId}/cards/${id}/edit`}>
            <button type="button" className="btn btn-secondary edit" value={id}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg> {' '}Edit
            </button>
          </Link>
          <button type="button" className="btn btn-danger delete" id={id} onClick={cardDeleter}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
          </button>
        </div>
      </li>);
    }
  );
  return cardListItem;
}