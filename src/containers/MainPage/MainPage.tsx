import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../app/hooks.ts";
import TransactionList from "../TransactionList/TransactionList.tsx";
import TransactionForm from "../TransactionForm/TransactionForm.tsx";
import { RootState } from "../../app/store.ts";
import { fetchTransactions } from "../../store/thunks/transactionThunks.ts";
import { Transaction } from "../../types";
import Modal from "../../components/Modal/Modal.tsx";
import "../../components/Modal/Modal.css";

const MainPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showModal, setShowModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);
  const { loading, error } = useAppSelector(
    (state: RootState) => state.transactions,
  );

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const closeModal = () => {
    setShowModal(false);
    setTransactionToEdit(null);
  };

  return (
    <div className="main-page">
      {loading && <div>Loading...</div>}
      {error && <div className="error">Error: {error}</div>}
      <TransactionList />
      {showModal && (
        <Modal
          show={showModal}
          closeModal={closeModal}
          title={transactionToEdit ? "Edit Transaction" : "Add Transaction"}
        >
          <TransactionForm
            transactionToEdit={transactionToEdit}
            closeModal={closeModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default MainPage;
