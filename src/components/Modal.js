import "../styles/Modal.css";
import React from "react";

const Modal = ({
  handleClose,
  showModal,
  children,
  props,
  handleAddBoard,
  handleChange
}) => {
  const showHideClassName = showModal
    ? "modal display-block"
    : "modal display-none";
  return (
    <div className={showHideClassName}>
      <div className="board-container__form modal-main">
        <form onSubmit={handleAddBoard}>
          <input
            type="text"
            name="name"
            className="modal-input"
            placeholder="Enter Board Title"
            value={props.boardTitle}
            onChange={handleChange}
          />
          <input type="submit" className="modal-submit" value="Add List" />
        </form>
        <button className="modal-close" onClick={handleClose}>
          X
        </button>
      </div>
    </div>
  );
};

export default Modal;
