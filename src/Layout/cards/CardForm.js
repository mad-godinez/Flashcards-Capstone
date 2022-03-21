import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function CardForm({changer, submitter, newCardData}){
  const {deckId} = useParams();
  return (
    <form className="cardFormData" onSubmit={submitter}>
      <label htmlFor="front">Front</label>
      <textarea name="front" type="text" placeholder="Front side of card"
                value={newCardData.front} onChange={changer} />
      <label htmlFor="back">Back</label>
      <textarea name="back" type="text" placeholder="Back side of card"
                value={newCardData.back} onChange={changer} />
      <div>
      <Link to={`/decks/${deckId}`}>
        <button className="btn btn-secondary done">Done</button>
      </Link>
        <button type="submit" className="btn btn-primary save">Save</button>
      </div>
    </form>
  );
};