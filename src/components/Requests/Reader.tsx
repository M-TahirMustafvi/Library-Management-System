import { useContext, useState } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles, BooksStyles } from "../../styles/library-styles";
import RequestModalForm from "./ModalForm";
import { Requests } from "../../types/Lib_Types";
import { Books } from "../../types/Lib_Types";

export default function Reader() {
  const { user, requests, addRequest, updateRequest, deleteRequest, books, updateBook, library, updateLibrary } = useContext(DataContext);
  const [showModal, setShowModal] = useState<Requests | null | undefined>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const userRequests = requests.filter((r) => r.userEmail === user.email);
  const filteredRequests = userRequests.filter((r) =>
    r.bookName.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  const handleSave = (req: Requests) => {
    const existingRequest = userRequests.find((r) => r.id === req.id);
  
    if (existingRequest) {
      updateRequest(req);
    } else {
      // Find the book in the global list
      const currBook = books.find((book: Books) => book.title === req.bookName);
  
      if (currBook && currBook.quantity > 0) {
        // Add the request
        addRequest(req);
  
        // Decrease quantity globally
       // currBook.quantity--;
        updateBook(currBook);
  
        // Update the book in the user's library
        const currLib = library.find((lib) => lib.name === user.library);
  
        if (currLib && currLib.books) {
          const bookIndex = currLib.books.findIndex((book: Books) => book.title === req.bookName);
  
          if (bookIndex >= 0) {
           // currLib.books[bookIndex].quantity--;
            updateLibrary(currLib);
          }
        }
  
      } else {
        alert("Book not available");
        return;
      }
    }
  };
  
  const handleDelete = (id: string) => {
    const reqToDelete = requests.find((r) => r.id === id);
    if (!reqToDelete) return;
  
    // Increment quantity in global books
    const book = books.find((b) => b.title === reqToDelete.bookName);
    if (book) {
      book.quantity++;
      updateBook(book);
    }
  
    // Increment quantity in user's library
    const currLib = library.find((lib) => lib.name === user.library);
    if (currLib && currLib.books) {
      const libBook = currLib.books.find((b: Books) => b.title === reqToDelete.bookName);
      if (libBook) {
        libBook.quantity++;
        updateLibrary(currLib);
      }
    }
  
    // Finally delete the request
    deleteRequest(id);
  };
  

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>My Book Requests</h1>

      <div className="flex justify-between items-center mb-4">
        <input
          className={BooksStyles.input}
          placeholder="Search your requests..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className={BooksStyles.button} onClick={() => setShowModal(undefined)}>
          Submit Request
        </button>
      </div>

      {filteredRequests.length > 0 ? (
        <div className={BooksStyles.tableWrapper}>
          <table className={BooksStyles.table}>
            <thead className={BooksStyles.thead}>
              <tr>
                <th className={BooksStyles.th}>Book Name</th>
                <th className={BooksStyles.th}>Request Date</th>
                <th className={BooksStyles.th}>Status</th>
                <th className={BooksStyles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((req) => (
                <tr key={req.id} className={BooksStyles.tr}>
                  <td className={BooksStyles.td}>{req.bookName}</td>
                  <td className={BooksStyles.td}>
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className={BooksStyles.td}>{req.requestStatus}</td>
                  <td className={BooksStyles.td}>
                    {req.requestStatus !== "completed" && <button
                      className={BooksStyles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowModal(req);
                      }}
                    >
                      Edit
                    </button>}
                    <button
                      className={BooksStyles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(req.id)
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300">No matching requests found.</p>
      )}

      {showModal !== null && (
        <RequestModalForm
          value={showModal}
          onClose={() => setShowModal(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
