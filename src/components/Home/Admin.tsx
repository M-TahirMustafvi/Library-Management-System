import { useContext } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles } from "../../styles/library-styles";
import { User, Library, Books } from "../../types/Lib_Types";

export default function Librarian() {
  const data = useContext(DataContext);

  const user = data.user;
  const libraryArray: Library[] = JSON.parse(localStorage.getItem("libraryArray") || "[]");
  const userArray: User[] = JSON.parse(localStorage.getItem("userArray") || "[]");

  const getLibraryStats = (library: Library) => {
    const books: Books[] = library.books || [];
    const members = userArray.filter((u) => u.library === library.id);
    
    // const issuedBooks = data.issuedBooks.filter((book) => book.isIssued).length;
    // const availableBooks = books.filter((book) => !book.isIssued).length;

    return {
      totalBooks: books.length,
      // issuedBooks,
      // availableBooks,
      // issuedPercentage: books.length
      //   ? ((issuedBooks / books.length) * 100).toFixed(2)
      //   : "0.00",
      membersCount: members.length,
    };
  };

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>
        Welcome, {user.email.split("@")[0]}!
      </h1>

      <h2 className="text-2xl font-bold text-white mb-6">Library System Overview</h2>

      {libraryArray.length === 0 && (
        <p className="text-gray-300">No libraries found in the system.</p>
      )}

      <div className={DashboardStyles.cardsWrapper}>
        {libraryArray.map((lib) => {
            const stats = getLibraryStats(lib);
        

            return (

            <div key={lib.id} className={DashboardStyles.card}>
                <h3 className={DashboardStyles.cardTitle}>{lib.name}</h3>
                <p className={DashboardStyles.cardContent}>
                Librarian: {lib?.librarian || "Not Assigned"}
                </p>
                <p className={DashboardStyles.cardContent}>
                Total Books: {stats.totalBooks}
                </p>
                {/* <p className={DashboardStyles.cardContent}>
                Issued Books: {stats.issuedBooks}
                </p>
                <p className={DashboardStyles.cardContent}>
                Available Books: {stats.availableBooks}
                </p>
                <p className={DashboardStyles.cardContent}>
                Issued %: {stats.issuedPercentage}%
                </p> */}
                <p className={DashboardStyles.cardContent}>
                Total Members: {stats.membersCount}
                </p>
            </div>
            );
        })}
      </div>
    </div>
  );
}
