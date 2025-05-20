  import { useContext, useEffect, useState, Fragment } from "react";
  import { DataContext } from "../../store/data-context";
  import { DashboardStyles, BooksStyles } from "../../styles/library-styles";
  import type { Books } from "../../types/Lib_Types";
  import AccordionRow from "./AccordionRow";
  import ModalForm from "./ModalForm";

  import { Library } from "../../types/Lib_Types";

  export default function Librarian() {
    const { user, books, issuedBooks, deleteBook, updateBook, addBook, searchLibrary, updateLibrary } = useContext(DataContext);

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredBooks, setFilteredBooks] = useState<Books[]>([]);
    const [openAccordion, setOpenAccordion] = useState<string | null>(null);
    const [editingBook, setEditingBook] = useState<Books | null | undefined>(null);

    useEffect(() => {
      const libraryBooks = searchLibrary(user.library ?? "")?.books || [];

      const term = searchTerm.toLowerCase().trim();
      const filtered = term
        ? libraryBooks.filter(
            (book: Books) =>
              book.title.toLowerCase().includes(term) ||
              book.author.toLowerCase().includes(term)
          )
        : libraryBooks;

      setFilteredBooks(filtered);
    }, [books, searchTerm, user.library]);

    const toggleAccordion = (bookId: string) => {
      setOpenAccordion((prev) => (prev === bookId ? null : bookId));
    };

    const handleDelete = (id: string) => {
      deleteBook(id);
    };

    const handleSave = (book: Books) => {
      
      if (books.find((b) => b.id === book.id)) {
        updateBook(book);
      
        const library: Library = searchLibrary(user.library ?? "");
      
        // Filter out the old version of the book using its unique ID
        const LibraryWithoutUpdate = library.books?.filter((buk) => buk.id !== book.id);
      
        // Add the updated version of the book
        const updatedBooks = [...(LibraryWithoutUpdate || []), book];
      
        library.books = updatedBooks;
        updateLibrary(library);
      }
      else {
        const library : Library = searchLibrary(user.library ?? "");
        library.books = [...library.books || [], book];
        updateLibrary(library);
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
                    <Fragment key={book.id}>
                      <tr
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
                                    {new Date(issuedBook.issueDate).toLocaleDateString()}
                                  </td>
                                  <td className={BooksStyles.td}>
                                    {issuedBook.returnDate
                                      ? new Date(issuedBook.returnDate).toLocaleDateString()
                                      : "N/A"}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </AccordionRow>
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-300">No books found or no library selected.</p>
        )}

        {editingBook !== null && (
          <ModalForm
            book={editingBook ?? undefined}
            onClose={() => setEditingBook(null)}
            onSave={handleSave}
          />
        )}
      </div>
    );
  }
