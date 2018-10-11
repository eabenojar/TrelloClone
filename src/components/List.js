import React, { Component } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import "../styles/List.css";
import { FaEllipsisH, FaPencilAlt } from "react-icons/fa";

const List = props => {
  console.log("LIST FROM LIST", props);
  return (
    <div className="board-canvas__lists--container" key={props.index}>
      <div className="list-title-section">
        <h1 className="lists--container list-title">{props.list.listTitle}</h1>
        <button className="list-title-button" onClick={props.editList}>
          <FaEllipsisH
            size={20}
            color={"#026AA7"}
            style={{ margin: "0 15px" }}
          />
        </button>
      </div>

      <Droppable droppableId={props.list.id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="list-box"
          >
            {props.list.cards !== null
              ? props.list.cards.map((card, index) => {
                  return (
                    // <div key={i}>
                    <Draggable draggableId={card.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          key={index}
                          className="card-container"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          isDragging={snapshot.isDragging}
                          onMouseEnter={() => props.hoverEditCard(card)}
                          onMouseLeave={e => props.hoverEditCardEnd(e, card)}
                        >
                          <div
                            style={{
                              height: "100%",
                              backgroundColor: `${
                                snapshot.isDragging ? "#026AA7" : "#FFF"
                              }`,
                              width: "100%",
                              display: "flex",
                              alignItems: "center",
                              display: "flex",
                              justifyContent: "space-between"
                            }}
                          >
                            <h1
                              className="card-container-title"
                              style={{
                                color: `${
                                  snapshot.isDragging ? "#FFF" : "#17394d"
                                }`
                              }}
                            >
                              {card.cardTitle}
                            </h1>
                            {props.showEditCard === false ? (
                              <button
                                className="list-title-button"
                                onClick={props.editCard}
                              >
                                <FaPencilAlt
                                  size={20}
                                  color={"#026AA7"}
                                  style={{ margin: "0 15px" }}
                                />
                              </button>
                            ) : (
                              <h1>Hello</h1>
                            )}
                          </div>
                        </div>
                      )}
                    </Draggable>
                    // </div>
                  );
                })
              : null}
            {props.showAddCard === "1" ? (
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
                      placeholder="Enter list title...,"
                      onChange={props.onHandleChangeCard}
                    />
                  </label>
                  <input type="submit" value="Add List" />
                </form>
                <button onClick={e => props.exitForm(e, props.list)}>X</button>
              </div>
            )}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default List;
