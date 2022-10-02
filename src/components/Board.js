import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Board.css";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import TaskModal from "../modals/TaskModal";
import Column from "./Column";
import DeleteModal from "../modals/DeleteModal";
import boardsSlice from "../redux/boardsSlice";
import openModalsSlice from "../redux/openModalsSlice";
import EmptyBoard from "./EmptyBoard";

export default function Board() {
  const dispatch = useDispatch();
  const modalsState = useSelector((state) => state.openModals);
  const toggleBoardModal = modalsState.toggleBoardModal;
  const toggleTaskModal = modalsState.toggleTaskModal;
  const toggleDeleteModal = modalsState.toggleDeleteModal;

  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  const onDeleteBtnClick = (e) => {
    if (e.target.textContent === "Delete") {
      dispatch(boardsSlice.actions.deleteBoard());
      dispatch(boardsSlice.actions.setBoardActive({ index: 0 }));
      dispatch(openModalsSlice.actions.toggleDeleteModal({ type: "" }));
    } else {
      dispatch(openModalsSlice.actions.toggleDeleteModal({ type: "" }));
    }
  };

  return (
    <div className="board">
      {columns.length > 0 ? (
        columns.map((col, index) => {
          return <Column key={index} colIndex={index} />;
        })
      ) : (
        <EmptyBoard type="edit" />
      )}

      {toggleBoardModal.isOpen && (
        <AddEditBoardModal type={toggleBoardModal.type} />
      )}
      {toggleTaskModal.isOpen && <TaskModal />}
      {toggleDeleteModal.isOpen && toggleDeleteModal.type === "board" && (
        <DeleteModal
          type="board"
          title={board.name}
          onDeleteBtnClick={onDeleteBtnClick}
        />
      )}
    </div>
  );
}
