import React, { useState } from "react";
import { useEffect} from "react";
import { Link , useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";

export default function StudyCards(){
  const {deckId} = useParams(); 
  const blank_deck = {
    "name":"",
    "description":"",
    "id":0,
    "cards":[]
  };
  const [deckInfo, setDeckInfo] = useState({...blank_deck});
  useEffect(() => {
    const getter = async () => {
      const deck = await readDeck(deckId);
      setDeckInfo(await deck);
    }
   getter();
  },[deckId])
  const {name, id, cards} = deckInfo;
  
    // console.log("data loaded", cards)


  const [flipped, setFlipped] = useState(true);
  const flipCard = () => setFlipped(()=> !flipped);

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </ol>
      </nav>
      <section>
        <h2>{name}: Study</h2>
        <div id="cardToStudy" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
            { flipped ? 
              <div key={id} className="carousel-item">
                <div className="cardFront">
                  <p className="cardFront">{cards[0].front}</p>
                  <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
                </div>
              </div> 
              :
              <div key={id} className="carousel-item">
                <div className="cardBack">
                  <p className="cardBack">{cards[0].back}</p>
                  <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
                  <button type="button" className="btn btn-primary next" >Next</button>
                </div>
              </div>}
            </div>
            {showCards(cards, flipped, flipCard)}
          </div>
        </div>
      </section>
    </>
  );
};
function showCards(cards, flipped, flipCard){
  return cards.map(({id, front, back})=> {
    return ( flipped ? 
    <div key={id} className="carousel-item">
      <div className="cardFront">
        <p className="cardFront">{front}</p>
        <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
      </div>
    </div> 
    :
    <div key={id} className="carousel-item">
      <div className="cardBack">
        <p className="cardBack">{back}</p>
        <button type="button" className="btn btn-secondary flip" onClick={flipCard}>Flip</button>
        <button type="button" className="btn btn-primary next" >Next</button>
      </div>
    </div>
    );
  })
}