import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { createDeck } from "../../utils/api/index";

// Allows the user to create a new deck.
export default function CreateDeck({deckNum, deckList}){
  const [formData, setFormData] = useState({});
  useEffect(()=>{
    const initial = {
      "name": "",
      "description": ""
    };
    setFormData(initial)
  },[]);

  const changer = ({target}) => {
    setFormData({...formData, [target.name] : target.value});
  };

  let history = useHistory();

  const submitter = (event) => {
    event.preventDefault();
    createDeck(formData).then(result=>history.push(`/decks/${result.id}`));
    return deckList.length++;
  };

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" 
              className="bi bi-house-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
            <path fillRule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
          </svg> {' '}Home </Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </ol>
      </nav>
      <section>
        <h1>Create Deck</h1>
        <form onSubmit={submitter}>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" placeholder="Deck Name" required
                 value={formData.name} onChange={changer} />
          <label>Description</label>
          <textarea type="text" name="description" placeholder="Brief description of the deck" rows="4" required
                    value={formData.description} onChange={changer} />
          <div className="btnGroup">
            <Link to="/">
              <button type="button" className="btn btn-secondary">Cancel</button>
            </Link>
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};