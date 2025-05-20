import { useContext, useState } from "react";
import { BooksStyles, DashboardStyles } from "../../styles/library-styles";
import { DataContext } from "../../store/data-context";
import { Library, User } from "../../types/Lib_Types";
import ModalForm from "./ModalForm";

const Libraries = () => {
  const { library, deleteLibrary } = useContext(DataContext);
  const [accordion, setAccordion] = useState<string>("");
  const [showModal, setShowModal] = useState<Library | null | undefined>(null);
  const allUser = JSON.parse(localStorage.getItem("userArray") || "[]");

  return (
    <div className={DashboardStyles.container}>
      <h1 className={`mt-10 ${DashboardStyles.title}`}>Libraries</h1>

      <button
        className={BooksStyles.button}
        onClick={() => setShowModal(undefined)} // Open modal to add new library
      >
        Add Library
      </button>

      <div className={BooksStyles.tableWrapper}>
        <table className={BooksStyles.table}>
          <thead className={BooksStyles.thead}>
            <tr>
              <th className={BooksStyles.th}>Library Name</th>
              <th className={BooksStyles.th}>Book Count</th>
              <th className={BooksStyles.th}>Members Count</th>
              <th className={BooksStyles.th}></th>
            </tr>
          </thead>
          <tbody>
            {library.map((lib) => (
              <>
                <tr
                  key={lib.id}
                  className={BooksStyles.tr}
                  onClick={() =>
                    setAccordion((prev) => (prev === lib.name ? "" : lib.name))
                  }
                >
                  <td className={BooksStyles.td}>{lib.name}</td>
                  <td className={BooksStyles.td}>{lib.books?.length}</td>
                  <td className={BooksStyles.td}>
                    {
                      allUser.filter((user: User) => user.library === lib.name)
                        .length
                    }
                  </td>
                  <td className={BooksStyles.td}>
                    <button
                      className={BooksStyles.button}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent triggering accordion
                        setShowModal(lib);   // Edit library
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className={BooksStyles.button}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteLibrary(lib.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>

                {accordion === lib.name && (
                  <tr>
                    <td colSpan={4}>
                      <div className={BooksStyles.tableWrapper}>
                        <table className={BooksStyles.table}>
                          <thead className={BooksStyles.thead}>
                            <tr>
                              <th className={BooksStyles.th}>Book Name</th>
                              <th className={BooksStyles.th}>Author</th>
                              <th className={BooksStyles.th}>Status</th>
                              <th className={BooksStyles.th}></th>
                            </tr>
                          </thead>
                          <tbody>
                            {lib.books?.map((book) => (
                              <tr key={book.id} className={BooksStyles.tr}>
                                <td className={BooksStyles.td}>{book.title}</td>
                                <td className={BooksStyles.td}>{book.author}</td>
                                <td className={BooksStyles.td}>
                                  {book.isAvailable
                                    ? "Available"
                                    : "Not Available"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

      {showModal !== null && (
        <ModalForm value={showModal} onClose={() => setShowModal(null)} />
      )}
    </div>
  );
};

export default Libraries;
