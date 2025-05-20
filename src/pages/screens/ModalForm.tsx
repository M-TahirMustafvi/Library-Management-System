import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import type { MultiValue } from "react-select";
import { ModalStyles } from "../../styles/library-styles";
import { DataContext } from "../../store/data-context";
import type { Books, Library, User } from "../../types/Lib_Types";

type OptionType = {
  value: string;
  label: string;
};

interface ModalFormProps {
  value: Library | null | undefined;
  onClose: () => void;
}

const ModalForm: React.FC<ModalFormProps> = ({ value, onClose }) => {
  const { books, addLibrary, updateLibrary } = useContext(DataContext);
  const allUser = JSON.parse(localStorage.getItem("userArray") || "[]") as User[];

  const [libraryName, setLibraryName] = useState("");
  const [librarian, setLibrarian] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<OptionType[]>([]);

  const bookOptions: OptionType[] = books.map((book) => ({
    value: book.title,
    label: book.title,
  }));

  useEffect(() => {
    if (value) {
      setLibraryName(value.name || "");
      setLibrarian(value.librarian || "");
      const selected = value.books?.map((book: Books) => ({
        value: book.title,
        label: book.title,
      })) || [];
      setSelectedBooks(selected);
    } else {
      setLibraryName("");
      setLibrarian("");
      setSelectedBooks([]);
    }
  }, [value]);

  const handleBookSelection = (selected: MultiValue<OptionType>) => {
    setSelectedBooks(selected as OptionType[]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedBookTitles = selectedBooks.map((book) => book.value);
    const selectedBooksData = books.filter((book) =>
      selectedBookTitles.includes(book.title)
    );

    const libraryData: Library = {
      id: value ? value.id : new Date().toISOString(),
      name: libraryName,
      librarian,
      books: selectedBooksData,
    };

    if (value) {
      updateLibrary(libraryData);
    } else {
      addLibrary(libraryData);
    }

    onClose();
  };

  return (
    <div className={ModalStyles.container}>
      <div className={ModalStyles.modal}>
        <h1 className={ModalStyles.title}>
          {value ? "Edit Library" : "Add New Library"}
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Library Name */}
          <div className="m-2 flex justify-between items-center">
            <label htmlFor="libraryName" className="mr-2">Library Name:</label>
            <input
              type="text"
              id="libraryName"
              value={libraryName}
              onChange={(e) => setLibraryName(e.target.value)}
              placeholder="Enter library name"
              className="p-1 border rounded w-full"
              required
            />
          </div>

          {/* Librarian */}
          <div className="m-2 flex justify-between items-center">
            <label htmlFor="librarianSelect" className="mr-2">Librarian:</label>
            <select
              id="librarianSelect"
              value={librarian}
              onChange={(e) => setLibrarian(e.target.value)}
              className="p-1 border rounded w-full"
              required
            >
              <option value="">Select a librarian</option>
              {allUser
                .filter((user) => user.role === "librarian")
                .map((user) => (
                  <option key={user.id} value={user.email}>
                    {user.email}
                  </option>
                ))}
            </select>
          </div>

          {/* Books */}
          <div className="m-2 flex flex-col">
            <label htmlFor="booksSelect" className="mb-1">Books:</label>
            <Select
              inputId="booksSelect"
              options={bookOptions}
              value={selectedBooks}
              onChange={handleBookSelection}
              isMulti
              className="text-black"
              placeholder="Select books..."
              getOptionLabel={(e) => e.label}
              getOptionValue={(e) => e.value}
            />
          </div>

          {/* Submit / Cancel */}
          <div className="m-2 flex justify-end gap-2">
            <button
              type="submit"
              className="px-4 py-1 bg-green-600 rounded text-white"
            >
              {value ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              className="px-4 py-1 bg-red-500 rounded text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalForm;

