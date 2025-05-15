import { useContext, useState } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles, BooksStyles } from "../../styles/library-styles";

export default function Reader() {
  const data = useContext(DataContext);
  const { user } = data;

  const originalBooks = user.library
    ? data.searchLibrary(user.library)?.books || []
    : [];

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(originalBooks);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      setFilteredBooks(originalBooks);
      return;
    }
    handleSearch();
  };

  const handleSearch = () => {
    const lowerCaseTerm = searchTerm.toLowerCase().trim();

    if (lowerCaseTerm === "") {
      setFilteredBooks(originalBooks);
      return;
    }

    const results = originalBooks.filter(
      (book) =>
        book.title.toLowerCase().includes(lowerCaseTerm) ||
        book.author.toLowerCase().includes(lowerCaseTerm)
    );

    setFilteredBooks(results);
  };

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>Books</h1>

      <div className={BooksStyles.searchWrapper}>
        <input
          placeholder="Search books..."
          className={BooksStyles.input}
          onChange={handleChange}
          value={searchTerm}
        />
        <button
          className={BooksStyles.button}
          type="button"
          onClick={handleSearch}
        >
          Search
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
                <th className={BooksStyles.th}>Avaiable</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id} className={BooksStyles.tr}>
                  <td className={BooksStyles.td}>{book.title}</td>
                  <td className={BooksStyles.td}>{book.author}</td>
                  <td className={BooksStyles.td}>{book.quantity}</td>
                  <td className={BooksStyles.td}>
                    {book.isAvailable ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300">No books found or no library selected.</p>
      )}
    </div>
  );
}
