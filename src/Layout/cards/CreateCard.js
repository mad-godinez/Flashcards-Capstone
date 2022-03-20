import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function CreateCard(){
  const {deckId} = useParams();

  const [currentDeck, setCurrentDeck] = useState({});
  useEffect(()=>{
    const fetcher = async () => {
      const deck = await readDeck(deckId);
      setCurrentDeck(await deck);
    }
    fetcher();
  },[deckId]);

  const blank_card = {
    "id":0,
    "front":"",
    "back":"",
    "deckId":0
  };
  const [newCardData, setNewCardData] = useState({...blank_card});

  const {name, id} = currentDeck;

  const changer = ({target}) => {
    setNewCardData({...newCardData, [target.name] : target.value});
  };

  const submitter = (event) => {
    event.preventDefault();
    createCard(id, newCardData)
      .then(setNewCardData({...blank_card}))
      .then(window.location.reload(false));
  };
  if(currentDeck) return (
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
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <section>
        <h4>{name}: Add Card</h4>
        <CardForm changer={changer} submitter={submitter} newCardData={newCardData} />
      </section> 
    </>
  );
  return null;
};