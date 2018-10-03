import React, { Component } from "react";
import "../styles/Board.css";
import List from "./List";
import uuidv1 from "uuid/v1";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boardTitle: "",
      lists: [],
      listTitle: "",
      listDescription: "",
      showAddButton: false,
      showAddCard: true,
      cardTitle: "",
      cardDescription: ""
    };
    this.addList = this.addList.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.pressAddCard = this.pressAddCard.bind(this);
    this.exitForm = this.exitForm.bind(this);
    this.onHandleChangeCard = this.onHandleChangeCard.bind(this);
    this.addCard = this.addCard.bind(this);
  }
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
    console.log("DATA BOARDS", data);
  }
  check(e) {
    console.log("PRESSED");
    this.setState({
      showAddButton: true
    });
    console.log(this.props.board);
  }
  onHandleChange(event) {
    console.log(event.target.value);
    this.setState({
      listTitle: event.target.value
    });
  }
  onHandleChangeCard(event) {
    console.log(event.target.value);
    this.setState({
      cardTitle: event.target.value
    });
  }
  addList(event) {
    event.preventDefault();
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
    localStorage.setItem("boards", JSON.stringify(this.state.boards));
    console.log("ADD LIST", this.state.boards);
    const listArr = [...this.state.lists];
    listArr.push(obj);
    this.setState({
      showAddButton: false,
      lists: listArr
    });
  }
  pressAddCard(e, list) {
    console.log("PREC CARFA", list);
    this.setState({
      showAddCard: false
    });
  }
  exitForm(e) {
    console.log("EXIT PRESSED", e);
    this.setState({
      showAddCard: true
    });
  }
  addCard(event, list) {
    event.preventDefault();
    const obj = {
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
  }
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
                onClick={e => this.check(e, this.props.board)}
              >
                + Add another list
              </button>
            </div>
          ) : (
            <div className="board__form">
              <form onSubmit={this.addList}>
                <label>
                  <input
                    type="text"
                    placeholder="Enter list title..."
                    onChange={this.onHandleChange}
                  />
                </label>
                <input type="submit" value="Add List" />
              </form>
            </div>
          )}
          <div className="board-canvas__lists">
            {this.state.lists !== null
              ? this.state.lists.map((list, i) => {
                  return (
                    <div className="board-canvas__lists--container" key={i}>
                      <h1 className="lists--container list-title">
                        {list.listTitle}
                      </h1>
                      {list.cards !== null
                        ? list.cards.map((card, i) => {
                            return (
                              <div key={i} className="card-container">
                                <h1>{card.cardTitle}</h1>
                              </div>
                            );
                          })
                        : null}
                      {this.state.showAddCard === true ? (
                        <div className="list__button ">
                          <button
                            className="list__button--add"
                            onClick={e => this.pressAddCard(e, list)}
                          >
                            + Add a card
                          </button>
                        </div>
                      ) : (
                        <div>
                          <form onSubmit={e => this.addCard(e, list)}>
                            <label>
                              <input
                                type="textarea"
                                placeholder="Enter list title..."
                                onChange={this.onHandleChangeCard}
                              />
                            </label>
                            <input type="submit" value="Add List" />
                          </form>
                          <button onClick={e => this.exitForm(e, list)}>
                            X
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
