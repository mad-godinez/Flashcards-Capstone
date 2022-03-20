import React,  { useState, useEffect } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck} from "../../utils/api/index";

export default function EditDeck(){
  const {deckId} = useParams();
  const [currentDeck, setCurrentDeck] = useState({});
  let {id, name} = currentDeck;
  const [newDeckData, setNewDeckData] = useState({...currentDeck});
  useEffect(()=>{
    const fetcher = async () => {
      const deck = await readDeck(deckId);
      setCurrentDeck(await deck);
    }
    fetcher();
  },[deckId]);

  useEffect(()=>{
    setNewDeckData(currentDeck);
  },[currentDeck])


  const changer = ({target}) => {
    setNewDeckData({...currentDeck, [target.name] : target.value})
    console.warn(`Warning: Input is changing an uncontrolled input of type <${(typeof target.value)}> to be controlled.`)
  };
  let history = useHistory();
  const submitter = (event) => {
    event.preventDefault();
    updateDeck(newDeckData)
      .then(setNewDeckData({...currentDeck}));
    history.push(`/decks/${id}`);
  }

  return(
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
                className="bi bi-house-fill" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
              <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
            </svg> {' '}Home </Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${id}`}>Deck {name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck {id}</li>
        </ol>
      </nav>
      <section>
        <h1>Edit Deck</h1>
        <form onSubmit={submitter}>
          <label htmlFor="name">Name</label>
          <textarea name="name" type="text" value={newDeckData.name} rows="1"
                    onChange={changer}/>
          <label htmlFor="description">Description</label>
          <textarea name="description" type="text" rows="3"
                    value={newDeckData.description} onChange={changer}/>
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