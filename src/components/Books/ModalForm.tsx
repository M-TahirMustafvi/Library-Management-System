import React, { useState } from "react";
import { Books } from "../../types/Lib_Types";
import { BooksStyles } from "../../styles/library-styles";
import { v4 as uuidv4 } from "uuid";

type Props = {
  book?: Books; // Optional for 'Add' mode
  onClose: () => void;
  onSave: (updatedBook: Books) => void;
};

const ModalForm: React.FC<Props> = ({ book, onClose, onSave }) => {
  const isEditMode = !!book;

  const [title, setTitle] = useState(book?.title || "");
  const [author, setAuthor] = useState(book?.author || "");
  const [quantity, setQuantity] = useState(book?.quantity || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default HTML form submission behavior

    const updated = new Books(title.trim(), author.trim(), quantity);

    if (isEditMode && book) {
      updated.id = book.id;
      updated.isAvailable = book.isAvailable;
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
          {isEditMode ? "Edit Book" : "Add Book"}
        </h2>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Title:</span>
          <input
            className={BooksStyles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Author:</span>
          <input
            className={BooksStyles.input}
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author"
            required
          />
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Quantity:</span>
          <input
            className={BooksStyles.input}
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            placeholder="Quantity"
            required
            min={1}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="submit" className={BooksStyles.button}>
            {isEditMode ? "Save Changes" : "Add Book"}
          </button>
          <button type="button" className={BooksStyles.button} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
