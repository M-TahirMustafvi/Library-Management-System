import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles, BooksStyles } from "../../styles/library-styles";
import type { Books } from "../../types/Lib_Types";
import AccordionRow from "./AccordionRow";
import ModalForm from "./ModalForm";

export default function Admin() {
  const { books, issuedBooks, deleteBook, updateBook, addBook } = useContext(DataContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState<Books[]>(books);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [editingBook, setEditingBook] = useState<Books | null | undefined>(null); // undefined = add mode

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (term === "") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(
        books.filter(
          (book: Books) =>
            book.title.toLowerCase().includes(term) ||
            book.author.toLowerCase().includes(term)
        )
      );
    }
  }, [books, searchTerm]);

  const toggleAccordion = (bookId: string) => {
    setOpenAccordion((prev) => (prev === bookId ? null : bookId));
  };

  const handleDelete = (id: string) => {
    deleteBook(id);
  };

  const handleSave = (book: Books) => {
    if (books.find((b) => b.id === book.id)) {
      updateBook(book);
    } else {
      addBook(book);
    }
    setEditingBook(null);
  };

  const handleAddBook = () => {
    setEditingBook(undefined); 
  };

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>Books</h1>

      <div className={BooksStyles.searchWrapper}>
        <input
          placeholder="Search books..."
          className={BooksStyles.input}
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        <button className={BooksStyles.button} type="button" onClick={() => {}}>
          Search
        </button>

        <button
          className={`ml-10 ${BooksStyles.button}`}
          type="button"
          onClick={handleAddBook}
        >
          Add Book
        </button>
      </div>

      {filteredBooks.length > 0 ? (
        <div className={BooksStyles.tableWrapper}>
          <table className={BooksStyles.table}>
            <thead className={BooksStyles.thead}>
              <tr>
                <th className={BooksStyles.th}>Title</th>
                <th className={BooksStyles.th}>Author</th>
                <th className={BooksStyles.th}>Quantity</th>
                <th className={BooksStyles.th}>Available</th>
                <th className={BooksStyles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book: Books) => {
                const isOpen = openAccordion === book.id;
                return (
                  <>
                    <tr
                      key={book.id}
                      className={BooksStyles.tr}
                      onClick={() => toggleAccordion(book.id)}
                    >
                      <td className={BooksStyles.td}>{book.title}</td>
                      <td className={BooksStyles.td}>{book.author}</td>
                      <td className={BooksStyles.td}>{book.quantity}</td>
                      <td className={BooksStyles.td}>
                        {book.isAvailable ? "Yes" : "No"}
                      </td>
                      <td className={BooksStyles.td}>
                        <button
                          className={BooksStyles.button}
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingBook(book);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className={BooksStyles.button}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(book.id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                    <AccordionRow isOpen={isOpen}>
                      <table className={BooksStyles.table}>
                        <thead className={BooksStyles.thead}>
                          <tr>
                            <th className={BooksStyles.th}>Reader Name</th>
                            <th className={BooksStyles.th}>Issued Date</th>
                            <th className={BooksStyles.th}>Return Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {issuedBooks
                            .filter((issuedBook) => issuedBook.bookId === book.id)
                            .map((issuedBook) => (
                              <tr key={issuedBook.id}>
                                <td className={BooksStyles.td}>{issuedBook.userId}</td>
                                <td className={BooksStyles.td}>
                                  {new Date(
                                    issuedBook.issueDate
                                  ).toLocaleDateString()}
                                </td>
                                <td className={BooksStyles.td}>
                                  {issuedBook.returnDate
                                    ? new Date(
                                        issuedBook.returnDate
                                      ).toLocaleDateString()
                                    : "N/A"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </AccordionRow>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300">No books found or no library selected.</p>
      )}

      {(editingBook !== null) && (
        <ModalForm
          book={editingBook ?? undefined}
          onClose={() => setEditingBook(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
