import React, { useState, useContext } from "react";
import { Requests } from "../../types/Lib_Types";
import { BooksStyles } from "../../styles/library-styles";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../../store/data-context";

type Props = {
  value: Requests | null | undefined;
  onClose: () => void;
  onSave: (updatedRequest: Requests) => void;
};

const RequestModalForm: React.FC<Props> = ({ value, onClose, onSave }) => {
  const isEditMode = !!value;
  const { user, searchLibrary } = useContext(DataContext);

  const userLibrary = user.library ? searchLibrary(user.library) : null;
  const books = userLibrary?.books || [];

  const [bookName, setBookName] = useState(value?.bookName || books[0]?.title || "");
  const [status, setStatus] = useState(value?.requestStatus || "submitted");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updated = new Requests(bookName, user.email);

    if (isEditMode && value) {
      updated.id = value.id;
      updated.requestDate = value.requestDate;
      updated.requestStatus = status;
    } else {
      updated.id = uuidv4();
    }

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-6 rounded w-95 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Request" : "New Request"}
        </h2>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Book Name:</span>
          <select
            className={BooksStyles.input}
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            required
          >
            {books.map((book) => (
              <option key={book.id} value={book.title}>
                {book.title}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Your Email:</span>
          <input
            className={BooksStyles.input}
            value={user.email}
            disabled
          />
        </div>

        {isEditMode && (
          <div className="mb-4 flex justify-between w-full">
            <span className="mt-2">Request Status:</span>
            <select
              className={BooksStyles.input}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            >
              <option value="submitted">Submitted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <button type="submit" className={BooksStyles.button}>
            {isEditMode ? "Save Changes" : "Submit Request"}
          </button>
          <button type="button" className={BooksStyles.button} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default RequestModalForm;
