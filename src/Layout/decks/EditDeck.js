import React,  { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck} from "../../utils/api/index";

export default function EditDeck(){
  const {deckId} = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  useEffect(()=>{
    const fetcher = async () => {
      const deck = await readDeck(deckId);
      setCurrentDeck(await deck);
    }
    fetcher();
  },[deckId]);

  let {id, name, description} = currentDeck;
  const existing_deck = {
    "id":id,
    "name":name,
    "description":description,
  };
  const [newDeckData, setNewDeckData] = useState({...existing_deck});

  const changer = ({target}) => {
    setNewDeckData({...existing_deck, [target.name] : target.value})
  };
  let history = useHistory();
  const submitter = (event) => {
    event.preventDefault();
    updateDeck(newDeckData)
      .then(setNewDeckData({...existing_deck}));
    history.push(`/decks/${id}`);
  }

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>Deck {name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck {id}</li>
        </ol>
      </nav>
      <section>
        <h1>Edit Deck</h1>
        <form onSubmit={submitter}>
          <label htmlFor="name">Name</label>
          <input name="name" type="text" placeholder={existing_deck.name} 
                    value={newDeckData.name} onChange={changer} />
          <label htmlFor="description">Description</label>
          <textarea name="description" type="text" placeholder={existing_deck.description} rows="3"
                    value={newDeckData.description} onChange={changer} />
          <div>
          <Link to={`/decks/${id}`}>
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