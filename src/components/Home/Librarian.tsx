import { useContext } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles } from "../../styles/library-styles";
import { User } from "../../types/Lib_Types";

export default function Librarian() {
  const data = useContext(DataContext);
  const { user } = data;

  const library = user.library ? data.searchLibrary(user.library) : null;
  const books = user.library ? library?.books || [] : [];

  const userArray: [] = JSON.parse(localStorage.getItem("userArray") || "[]");

  let membersCount: number = 0;
  userArray.forEach((currUser: User) => {
    if (currUser.library === user.library) {
      membersCount++;
    }
  });

  // const totalMembers = user.library ? data.getTotalMembers(user.library) : 0;

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>
        Welcome, {user.email.substring(0, user.email.indexOf("@"))}! in{" "}
        {user.library}
      </h1>

      <h2 className="text-2xl font-bold text-white mb-4">Available Books</h2>

      {books.length > 0 ? (
        <div className={DashboardStyles.cardsWrapper}>
          {books.map((book) => (
            <div key={book.id} className={DashboardStyles.card}>
              <h3 className={DashboardStyles.cardTitle}>{book.title}</h3>
              <p className={DashboardStyles.cardContent}>
                Author: {book.author}
              </p>
              <p className={DashboardStyles.cardContent}>
                Quantity: {book.quantity}
              </p>
              <p className={DashboardStyles.cardContent}>
                Issued: {book.isAvailable ? "Yes" : "No"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-300">No books found or no library selected.</p>
      )}

      <h3 className="text-lg font-semibold text-white mb-4 mt-10">
        Total Books: {books.length} <br />
        Issued Books: {books.filter((book) => !book.isAvailable).length} <br />
        Available Books: {books.filter((book) => book.isAvailable).length} <br />
        Issued Books Percentage: {((books.filter((book) => !book.isAvailable).length / books.length) * 100).toFixed(2)}% <br />
        Total Members in {user.library} : {membersCount}
      </h3>
    </div>
  );
}
