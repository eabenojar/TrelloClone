import React, { Component } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = props => {
  console.log("LIST FROM LIST", props);
  return (
    <div className="board-canvas__lists--container" key={props.index}>
      <h1 className="lists--container list-title">{props.list.listTitle}</h1>
      {props.list.cards !== null
        ? props.list.cards.map((card, i) => {
            return (
              <div key={i} className="card-container">
                <h1>{card.cardTitle}</h1>
              </div>
            );
          })
        : null}
      {props.provided.placeholder}
      {props.showAddCard === true ? (
        <div className="list__button ">
          <button
            className="list__button--add"
            onClick={e => props.pressAddCard(e, props.list)}
          >
            + Add a card
          </button>
        </div>
      ) : (
        <div>
          <form onSubmit={e => props.addCard(e, props.list)}>
            <label>
              <input
                type="textarea"
                placeholder="Enter list title..."
                onChange={props.onHandleChangeCard}
              />
            </label>
            <input type="submit" value="Add List" />
          </form>
          <button onClick={e => props.exitForm(e, props.list)}>X</button>
        </div>
      )}
    </div>
  );
};

export default List;
