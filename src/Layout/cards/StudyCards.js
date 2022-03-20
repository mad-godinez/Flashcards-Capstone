import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api/index";

export default function StudyCards({deck}){
  const {deckId} = useParams();
  const {name, id} = deck;
  const [currentCards, setCurrentCards] = useState([{}])
  useEffect(() => {
    const fetcher = async () => {
      const deck = await readDeck(deckId);
      setCurrentCards(await deck.cards);
    }
    fetcher();
  },[deckId]);

  const [activeCard, setActiveCard] = useState({...currentCards[0]});
  useEffect(() => {
    setActiveCard({...currentCards[0], "index":1});
  },[currentCards]);

  let study_cards = JSON.parse(JSON.stringify(currentCards)); // shallow copy by value 

  const [flipped, setFlipped] = useState(false);
  const flipCard = () => setFlipped(()=> !flipped);

  let active = study_cards.splice(0, 1); // first card already read

  const nextcard = ({target}) => {
    let nextId = ++target.id;
    active = study_cards.filter((card)=> card.id===nextId);
    setActiveCard({...active[0], "index":nextId}); 
    flipCard();
  };

  let enough_cards = true;
  if(currentCards.length < 3) enough_cards = false;

  if (currentCards) return(
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
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <section>
        <h1>Study: {name}</h1>
        {enough_cards ? 
        <div id="cardToStudy" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              {!flipped ? 
                <div key={activeCard.index} className="cardFront">
                  <h4>Card {activeCard.index} of {currentCards.length}</h4>
                  <p className="cardFront">{activeCard.front}</p>
                  <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
                </div>
                :
                <div key={activeCard.index} className="cardBack">
                  <h4>Card {activeCard.id} of {currentCards.length}</h4>
                  <p className="cardBack">{activeCard.back}</p>
                  <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
                  {(activeCard.id === currentCards.length) ?
                    <>
                      <button type="button" className="btn btn-primary listend" id={activeCard.id} disabled>Next</button>
                      <p className="text-muted">Refresh the page to start the deck over again.</p>
                    </>
                    :
                    <button type="button" className="btn btn-primary next" id={activeCard.id} onClick={nextcard}>Next</button>
                  }
                </div>
              }
            </div>
          </div>
        </div>
        :
        <div className="not-enough-cards">
          <h4>Not enough cards.</h4>
          <p>You need at least 3 cards to study. There are {currentCards.length} cards in this deck.</p>
          <Link to={`/decks/${id}/cards/new`}>
            <button className="btn btn-primary new" type="button" >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
              </svg>
              {' '}Add Cards
            </button>
          </Link>
        </div>
      }
      </section>
    </>
  );
  return null;
};
