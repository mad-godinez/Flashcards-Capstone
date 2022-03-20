import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api/index";
import CardForm from "./CardForm";

export default function EditCard({title}){
  const {cardId} = useParams();

  const [currentCard, setCurrentCard] = useState({});
  const [newCardData, setNewCardData] = useState({});
  useEffect(()=>{
    const fetcher = async () => {
      const card = await readCard(cardId);
      setCurrentCard(await card);
    }
    fetcher();
  },[cardId]);

  useEffect(()=>{     // setstate on load with 'default' value
    setNewCardData(currentCard);
  },[currentCard]);

  const {id, deckId} = currentCard;

  const changer = ({target}) => {
    if (target.name==="front"|| target.name==="back")
      setNewCardData({...currentCard, [target.name] : target.value})
    console.warn(`Warning: Input is changing an uncontrolled input of type <${(typeof target.value)}> to be controlled.`)
  };
  const submitter = (event) => {
    event.preventDefault();
    updateCard(newCardData)
      .then(updated => setCurrentCard(updated))
      .then(setNewCardData({...currentCard}))
      .then(window.location.reload(false));
  }
  if(currentCard) return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                className="bi bi-house-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg> {' '}Home </Link>
          </li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {title}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {id}</li>
        </ol>
      </nav>
      <section>
        <h2>Edit Card</h2>
        <CardForm changer={changer} submitter={submitter} newCardData={newCardData} />
      </section>
    </>
  );
  return null;
}