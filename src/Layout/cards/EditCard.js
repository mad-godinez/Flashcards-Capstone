import React,  { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { readCard, updateCard } from "../../utils/api/index";

export default function EditCard(){
  const {cardId} = useParams();

  const [currentCard, setCurrentCard] = useState({});
  useEffect(()=>{
    const fetcher = async () => {
      const card = await readCard(cardId);
      setCurrentCard(await card);
    }
    fetcher();
  },[cardId]);

  let {id, front, back, deckId} = currentCard;
  const existing_card = {
    "id":id,
    "deckId":deckId,
    "front":front,
    "back":back
  };
  const [newCardData, setNewCardData] = useState({...existing_card});

  const changer = ({target}) => {
    target.name === "front" ? 
    setNewCardData({...existing_card, front : target.value}):
    setNewCardData({...existing_card, back : target.value})
  };
  const submitter = (event) => {
    event.preventDefault();
    updateCard(newCardData)
      .then(setNewCardData({...existing_card}));
  }

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>~Deck deckName~</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </ol>
      </nav>
      <section>
        <h2>Edit Card</h2>
        <form onSubmit={submitter}>
          <label htmlFor="front">Front</label>
          <textarea name="front" type="text" placeholder={existing_card.front} rows="3"
                    value={newCardData.front} onChange={changer} />
          <label htmlFor="back">Back</label>
          <textarea name="back" type="text" placeholder={existing_card.back} rows="3"
                    value={newCardData.back} onChange={changer} />
          <div>
          <Link to={`/decks/${deckId}`}>
            <button type="reset" className="btn btn-secondary cancel">Cancel</button>
          </Link>
            <button type="submit" className="btn btn-primary submit">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
}
/*

  


*/