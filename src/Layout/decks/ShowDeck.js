/* eslint-disable no-restricted-globals */
import React,  { useState, useEffect } from "react";
import { Link, useParams, Switch, Route, useHistory} from "react-router-dom";
import { deleteDeck, readDeck, deleteCard } from "../../utils/api";
import StudyCards from "../cards/StudyCards";
import CreateCard from "../cards/CreateCard";
import EditDeck from "./EditDeck";

/* Shows all of the information about a specified deck with options to edit
 or add cards to the deck, navigate to the study screen, or delete the deck */
export default function ShowDeck(){
  const {deckId} = useParams();
  const blank_deck = {
    "name":"",
    "description":"",
    "id":0,
    "cards":[]
  };
  const [deckInfo, setDeckInfo] = useState({...blank_deck});
  useEffect(() => {
    const fetchDeck = async () => {
      const response = await readDeck(deckId);
      setDeckInfo(await response);
    };
    fetchDeck();
  },[deckId]);

  const {name, description, cards, id} = deckInfo;
  const history = useHistory();
  const deleteHandler = ({target}) => {
    if(target.value === "card"){
      const card_popup = confirm("Are you sure you want to delete this card? Action cannot be undone.")
      if(card_popup) deleteCard(target.id);
    } else {
      const popup = confirm("Are you sure you want to delete this deck? Action cannot be undone.")
      if(popup) deleteDeck(id).then(history.push("/")); 
    }
  };

  return (
    <Switch>
      <Route exact path="/decks/:deckId">
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">{name}</li>
            </ol>
          </nav>
          <section>
            <div className="deckinfo">
              <h3>{name}</h3>
              <p>{description}</p>
              <div>
                <Link to={`/decks/${deckId}/edit`}>
                  <button type="button" className="btn btn-secondary edit" value={deckId}>Edit</button>
                </Link>
                <Link to={`/decks/${deckId}/study`}>
                  <button type="button" className="btn btn-primary study">Study</button>
                </Link>
                <Link to={`/decks/${deckId}/cards/new`}>
                  <button type="button" className="btn btn-primary add">+ Add Cards</button>
                </Link>
                <button type="button" className="btn btn-danger delete" onClick={deleteHandler}>🗑</button>
              </div>
            </div>
            <div className="cardlist">
              <h2>Cards</h2>
              <ul>
              {cardListItems(cards, deleteHandler)}
              </ul>
            </div>
          </section>
        </>
      </Route>
      <Route exact path="/decks/:deckId/study"><StudyCards /></Route>
      <Route exact path="/decks/:deckId/edit"><EditDeck /></Route>
      <Switch>
        <Route path="/decks/:deckId/cards/new"><CreateCard /></Route>
      </Switch>
    </Switch>
  );
};
function cardListItems(cards, deleteHandler){
  return (
    cards.map(({id, deckId, front, back}) => {
     return (
      <li key={id} id={deckId}>
        <p className="cardFront">{front}</p>
        <p className="cardBack">{back}</p>
        <div className="btnGroup">
          <Link to={`/decks/${deckId}/cards/${id}/edit`}>
            <button type="button" className="btn btn-secondary edit" value={id}>Edit</button>
          </Link>
          <button type="button" className="btn btn-danger delete" value="card" id={id} onClick={deleteHandler}>Delete</button>
        </div>
      </li>);
    })
  );
}