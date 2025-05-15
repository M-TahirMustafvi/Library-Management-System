import { useContext } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles } from "../../styles/library-styles";

export default function Reader() {
  const data = useContext(DataContext);
  const { user } = data;

  const books = user.library
    ? data.searchLibrary(user.library)?.books || []
    : [];

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>
        Welcome, {user.email.substring(0, user.email.indexOf('@'))}! in {user.library}
      </h1>

      <h2 className="text-2xl font-bold text-white mb-4">
        Books in your library:
      </h2>

      {books.length > 0 ? (
        <div className={DashboardStyles.cardsWrapper}>
          {books.map((book) => (
            <div key={book.id} className={DashboardStyles.card}>
              <h3 className={DashboardStyles.cardTitle}>{book.title}</h3>
              <p className={DashboardStyles.cardContent}>Author: {book.author}</p>
              <p className={DashboardStyles.cardContent}>Quantity: {book.quantity}</p>
              <p className={DashboardStyles.cardContent}>Issued: {book.isAvailable ? "Yes" : "No"}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No books found or no library selected.</p>
      )}
    </div>
  );
}
