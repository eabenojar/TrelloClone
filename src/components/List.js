import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/List.css";

const List = props => {
  console.log("LIST FROM LIST", props);
  return (
    <div className="board-canvas__lists--container" key={props.index}>
      <h1 className="lists--container list-title">{props.list.listTitle}</h1>
      <Droppable droppableId={props.list.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list-box"
          >
            {props.list.cards !== null
              ? props.list.cards.map((card, i) => {
                  console.log(card, "caegaekjn");
                  return (
                    <div>
                      <Draggable draggableId={card.id} index={props.index}>
                        {provided => (
                          <div
                            key={i}
                            className="card-container"
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <h1 className="card-container-title">
                              {card.cardTitle}
                            </h1>
                          </div>
                        )}
                      </Draggable>
                    </div>
                  );
                })
              : null}
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
            {/* {provided.placeholder} */}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
