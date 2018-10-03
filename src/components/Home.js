import React, { Component } from "react";
import "../styles/Home.css";
import uuidv1 from "uuid/v1";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [],
      hideForm: true,
      boardTitle: "",
      showModal: false,
      items: getItems(10)
    };
    this.onChange = this.onChange.bind(this);
    this.addList = this.addList.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }
  onDragEnd(result) {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    console.log("DRAG ITEMS", this.state.items, "RESULT", result);
    const items = reorder(
      this.state.items,
      result.source.index,
      result.destination.index
    );

    this.setState({
      items
    });
  }
  componentDidMount() {
    var data = localStorage.getItem("boards");
    data = JSON.parse(data);
    this.setState({
      boards: data
    });
    console.log("DATA", data);
  }
  onPress() {
    console.log("Pressed");
  }
  addList() {
    console.log("ADD LIST");
    this.setState({ showModal: true });
  }
  hideModal() {
    this.setState({ showModal: false });
  }
  onChange(event) {
    console.log("ONCHAGE");
    this.setState({
      boardTitle: event.target.value
    });
    console.log(this.state.boardTitle);
  }
  addBoard = event => {
    event.preventDefault();
    console.log("ADDED");
    const obj = {
      boardTitle: this.state.boardTitle,
      id: uuidv1(),
      lists: []
    };
    console.log("OBJECT", obj);
    const addBoard = this.state.boards === null ? [] : [...this.state.boards];
    addBoard.push(obj);
    console.log(addBoard);
    this.setState({
      boards: addBoard,
      boardTitle: ""
    });
    localStorage.setItem("boards", JSON.stringify(addBoard));
  };
  onDragStart = () => {
    console.log("ON START DRAG");
  };
  onDragUpdate = () => {
    console.log("ON UPDATE DRAG");
  };
  // onDragEnd = () => {
  //   console.log("ON END DRAG");

  //   // the only one that is required
  // };
  render() {
    console.log("RENDER", this.state.boards);

    return (
      <div className="container">
        <div className="board-container">
          <div className="board-container all-boards">
            {this.state.boards !== null
              ? this.state.boards.map((board, i) => {
                  return (
                    <Link
                      to={{
                        pathname: `/board/${board.id}`,
                        state: {
                          board
                        }
                      }}
                      key={i}
                    >
                      <div board={board} className="board-box">
                        <h1 className="board-box__title">{board.boardTitle}</h1>
                      </div>
                    </Link>
                  );
                })
              : null}
            <a className="add-board button" onClick={this.addList}>
              <span>+ Create new board...</span>
            </a>
            <Modal
              showModal={this.state.showModal}
              handleClose={this.hideModal}
              handleAddBoard={this.addBoard}
              props={{ ...this.state }}
              handleChange={this.onChange}
            >
              <p>Modal</p>
              <p>Data</p>
              <h1>TESTSETTES</h1>
            </Modal>
            {this.state.showModal === true ? (
              <div className="board-container__form">
                <form onSubmit={this.addBoard}>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter list title"
                    value={this.state.boardTitle}
                    onChange={this.onChange}
                  />
                  <input type="submit" value="Add List" />
                  <button>X</button>
                </form>
              </div>
            ) : null}
          </div>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <DragDropContext onDragEnd={this.onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {this.state.items.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          {item.content}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </div>
    );
  }
}

export default Home;
