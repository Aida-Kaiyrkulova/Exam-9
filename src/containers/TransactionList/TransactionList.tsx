import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks.ts";
import {
  fetchTransactions,
  deleteTransaction,
} from "../../store/thunks/transactionThunks.ts";
import { RootState } from "../../app/store.ts";
import TransactionForm from "../TransactionForm/TransactionForm.tsx";
import Modal from "../../components/Modal/Modal.tsx";
import dayjs from "dayjs";
import { Transaction } from "../../types";

const TransactionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector(
    (state: RootState) => state.transactions.transactions,
  );
  const [showModal, setShowModal] = useState(false);
  const [transactionToEdit, setTransactionToEdit] =
    useState<Transaction | null>(null);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this transaction?",
    );
    if (isConfirmed) {
      dispatch(deleteTransaction(id));
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setTransactionToEdit(transaction);
    setShowModal(true);
  };

  const handleAdd = () => {
    setTransactionToEdit(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTransactionToEdit(null);
  };

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const totalExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);

  const total = totalIncome - totalExpense;

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="transactions-container">
      <div className="total-balance">
        <h2>Total: {total.toLocaleString()} KGS</h2>
        <button onClick={handleAdd} className="btn btn-primary">
          Add Transaction
        </button>
      </div>
      <ul>
        {sortedTransactions.map((transaction) => (
          <li key={transaction.id}>
            <div className="transaction-item">
              <span className="transaction-date">
                {dayjs(transaction.createdAt).format("DD.MM.YYYY HH:mm")}
              </span>
              <span className="transaction-category">
                {transaction.category}
              </span>
              <span className="transaction-amount">
                {transaction.type === "income" ? "+" : "-"}{" "}
                {transaction.amount.toLocaleString()} KGS
              </span>

              <div>
                <button
                  className="btn btn-edit"
                  onClick={() => handleEdit(transaction)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(transaction.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

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

export default TransactionList;
