import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";

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
 
  let {name, id} = currentDeck;

  const changer = ({target}) => {
    setNewCardData({...newCardData, [target.name] : target.value});
  };
  const submitter = (event) => {
    createCard(id, newCardData)
      .then(setNewCardData({...blank_card}))
      .then(alert("success!"));
  }
  return (
    <>
       <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>{name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </ol>
      </nav>
      <section>
        <h4>{name}: Add Card</h4>
        <form onSubmit={submitter}>
          <label htmlFor="front">Front</label>
          <textarea name="front" type="text" placeholder="Front side of card"
                    value={newCardData.front} onChange={changer} />
          <label htmlFor="back">Back</label>
          <textarea name="back" type="text" placeholder="Back side of card"
                    value={newCardData.back} onChange={changer} />
          <div>
          <Link to={`/decks/${id}`}>
            <button className="btn btn-secondary done">Done</button>
          </Link>
            <button type="submit" className="btn btn-primary save">Save</button>
          </div>
        </form>
      </section> 
    </>
  );
};