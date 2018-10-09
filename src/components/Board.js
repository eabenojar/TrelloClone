import React, { Component } from "react";
import "../styles/Board.css";
import uuidv1 from "uuid/v1";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import List from "./List";

class Board extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS IN CONSTRUC", props.location.state.board.lists);
    this.state = {
      boardTitle: "",
      boards: [],
      lists: [],
      listTitle: "",
      listDescription: "",
      showAddButton: false,
      showAddCard: "1",
      showEditCard: false,
      cardTitle: "",
      cardDescription: ""
    };
  }
  onDragEnd = result => {
    console.log("ON DRAG END", result);
    const { destination, source, draggableId } = result;
    console.log("CURRENT LISTS", this.state.lists);
    // Card is dropped in open space
    if (!destination) {
      return;
    }
    // Card was dropped in same location
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    // Start List
    const startList = source.droppableId;
    // List to drag too
    const finishList = destination.droppableId;
    if (startList === finishList) {
      const listCopy = [...this.state.lists];
      // Find List that card is moved in
      const listDragged = listCopy.filter(
        list => list.id === destination.droppableId
      );
      console.log("LIST COPY", listDragged[0].cards);
      // Move cards to a new index
      const card = listDragged[0].cards.splice(source.index, 1);
      listDragged[0].cards.splice(destination.index, 0, ...card);
      console.log("FINAL LIST", listDragged);
      listCopy.map(list => {
        if (list.id === listDragged[0].id) {
          list = listDragged[0];
        }
      });
      console.log("NEW AND FINAL", listCopy);
      this.setState({
        lists: listCopy
      });
      console.log("MOVE NEW LIST", this.state.boards);
      const newData = JSON.stringify(this.state.boards);
      localStorage.setItem("boards", newData);
    } else if (startList !== finishList) {
      const listCopy = [...this.state.lists];
      const startDrag = listCopy.filter(list => list.id === source.droppableId);
      const card = startDrag[0].cards.splice(source.index, 1);
      console.log(
        "LIST COPY AFTER START",
        listCopy,
        "START",
        startDrag,
        "CARD",
        card
      );
      const endDrag = listCopy.filter(
        list => list.id === destination.droppableId
      );
      console.log("ENDDDDD", endDrag);
      endDrag[0].cards.splice(destination.index, 0, card[0]);
      console.log("MOVED TO ANOTHER LIST", listCopy);
      this.setState({
        list: listCopy
      });
      const newData = JSON.stringify(this.state.boards);
      localStorage.setItem("boards", newData);
    }
  };
  componentDidMount() {
    console.log("DID MOUNT BOARD", this.props.location.state.board);
    var data = localStorage.getItem("boards");
    data = JSON.parse(data);
    const boardData = data.filter(item => {
      if (item.id === this.props.location.state.board.id) {
        return item;
      }
    });
    console.log("DID MOUNT DATA", boardData);
    this.setState({
      boards: data,
      lists: boardData[0].lists
    });
    return data.filter(board => {
      if (board.id === this.props.location.state.board.id) {
        return board;
      }
    });
  }
  showAddList(e) {
    this.setState({
      showAddButton: true
    });
  }
  onHandleChange = event => {
    this.setState({
      listTitle: event.target.value
    });
  };
  onHandleChangeCard = event => {
    this.setState({
      cardTitle: event.target.value
    });
  };
  cancelAddList = () => {
    this.setState({
      showAddButton: false
    });
  };
  hoverEditCard = card => {
    console.log("HOVER OVER CARD", card);
  };
  hoverEditCardEnd = card => {
    console.log("HOVER OVER CARD OVER", card);
  };
  addList = event => {
    event.preventDefault();
    if (this.state.listTitle.length === 0) {
      return;
    }
    var obj = {
      id: uuidv1(),
      listTitle: this.state.listTitle,
      listDescription: "",
      cards: []
    };

    this.state.boards.map(item => {
      if (item.id === this.props.location.state.board.id) {
        item.lists.push(obj);
        return item;
      }
    });

    const listArr = [...this.state.lists];
    this.setState({
      showAddButton: false,
      lists: listArr
    });
    localStorage.setItem("boards", JSON.stringify(this.state.boards));
    console.log("ADD LIST", this.state.boards);
  };
  pressAddCard = (e, list) => {
    this.setState({
      showAddCard: list.id
    });
  };
  editCard = () => {
    console.log("EDIT CARD");
    this.setState({
      showEditCard: true
    });
  };
  exitForm = e => {
    console.log("EXIT PRESSED", e);
    this.setState({
      showAddCard: true
    });
  };
  editList() {
    console.log("LIST IS GOING TO BE EDITTED!");
  }
  addCard = (event, list) => {
    event.preventDefault();
    const obj = {
      id: uuidv1(),
      cardTitle: this.state.cardTitle,
      cardTitleDescription: ""
    };
    const selectedBoard = this.state.boards.filter(item => {
      if (item.id === this.props.location.state.board.id) {
        return item;
      }
    });
    console.log(selectedBoard);
    const selectedList = selectedBoard[0].lists.filter(item => {
      if (item.id === list.id) {
        return item;
      }
    });
    console.log("LIST, BOARD", selectedList, selectedBoard);
    selectedList[0].cards.push(obj);
    const data = this.state.boards.map(board => {
      if (board.id === selectedBoard[0].id) {
        board = selectedBoard[0];
        return board;
      }
      return board;
    });
    console.log("DATA FAM", data);
    this.setState({
      boards: data
    });
    localStorage.setItem("boards", JSON.stringify(data));

    console.log("LISSSTST", this.state.boards, this.state.lists);
  };
  render() {
    console.log("RENDER BOARDS", this.state.boards);
    const { board } = this.props.location.state;
    return (
      <div className="board">
        <div className="board__header">
          <div className="board__header--title">{board.boardTitle}</div>
        </div>
        <div className="board-canvas">
          {this.state.showAddButton === false ? (
            <div className="board__button">
              <button
                className="board__button--add"
                onClick={e => this.showAddList(e, this.props.board)}
              >
                + Add another list
              </button>
            </div>
          ) : (
            <div className="board__form">
              <form onSubmit={this.addList}>
                <label>
                  <input
                    className="board__form--input"
                    type="text"
                    placeholder="Enter list title..."
                    onChange={this.onHandleChange}
                  />
                </label>
                <input
                  className="board__form--submit"
                  type="submit"
                  value="Add List"
                />
                <button
                  className="board__form--cancel"
                  onClick={this.cancelAddList}
                >
                  X
                </button>
              </form>
            </div>
          )}
          <div className="board-canvas__lists">
            <DragDropContext onDragEnd={this.onDragEnd}>
              {this.state.lists !== null
                ? this.state.lists.map((list, index) => {
                    return (
                      <List
                        key={index}
                        props
                        list={list}
                        index={index}
                        showAddCard={this.state.showAddCard}
                        showEditCard={this.state.showEditCard}
                        pressAddCard={this.pressAddCard}
                        addCard={this.addCard}
                        exitForm={this.exitForm}
                        state={this.state}
                        onHandleChangeCard={this.onHandleChangeCard}
                        editList={this.editList}
                        editCard={this.editCard}
                        hoverEditCard={this.hoverEditCard}
                        hoverEditCardEnd={this.hoverEditCardEnd}
                      />
                    );
                  })
                : null}
            </DragDropContext>
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
