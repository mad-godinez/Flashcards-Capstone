import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api/index";
/*
The Create Deck screen has the following features:

The path to this screen should be /decks/new.
There is a breadcrumb navigation bar with a link to home / followed by the text Create Deck (i.e., Home/Create Deck).
A form is shown with the appropriate fields for creating a new deck.
The name field is an <input> field of type text.
The description field is a <textarea> field that can be multiple lines of text.
If the user clicks Submit, the user is taken to the Deck screen.
If the user clicks Cancel, the user is taken to the Home screen.
*/

// Allows the user to create a new deck.
export default function CreateDeck(){
  const initial = {
    "name": "",
    "description": ""
  };
  const [formData, setFormData] = useState({...initial});
  const changer = ({target}) => {
    setFormData({...formData, [target.name] : target.value});
  };
  const [deckId, setDeckId] = useState(null);
  let history = useHistory();
  const submitter = (event) => {
    async function postdata(deckId){
      const response = await createDeck(formData);
      const {id} = response;
      setDeckId(id);
    }
    postdata(deckId);
    setFormData(initial);
  };

  if(deckId){
    const url = `/decks/${deckId}`;
    history.push(url)
  }

  return (
    <>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/">Home</Link></li>
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