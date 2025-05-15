import React, { type ReactNode, useEffect, useState, createContext } from "react";
import { User, Books, Library, IssuedBooks } from "../types/Lib_Types";
import { englishBooks, urduBooks } from "./books-data";

type dataType = {
  user: User;
  library: Library[];
  books: Books[];
  issuedBooks: IssuedBooks[];
  signUp: (email: string, pwd: string, library: string) => boolean;
  login: (email: string, pwd: string) => boolean;
  logout: () => void;
  searchLibrary: (name: string) => Library;
  addBook: (book: Books) => void;
  updateBook: (book: Books) => void;
  deleteBook: (bookId: string) => void;
};

const defaultUser = new User("", "", "");

export const DataContext = createContext<dataType>({
  user: defaultUser,
  library: [],
  books: [],
  issuedBooks: [],
  signUp: () => true,
  login: () => true,
  logout: () => {},
  searchLibrary: () => new Library(""),
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
});

const DataContextProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [activeUser, setActiveUser] = useState<User>(defaultUser);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [books, setBooks] = useState<Books[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBooks[]>([]);

  useEffect(() => {
    const storedUsers = localStorage.getItem("userArray");
    const storedBooks = localStorage.getItem("bookArray");
    const storedLibraries = localStorage.getItem("libraryArray");
    const storedIssuedBooks = localStorage.getItem("issuedBooksArray");

    // Books
    if (!storedBooks) {
      const defaultBooks = [...englishBooks, ...urduBooks];
      localStorage.setItem("bookArray", JSON.stringify(defaultBooks));
      setBooks(defaultBooks);
    } else {
      const parsed = JSON.parse(storedBooks);
      const bookInstances = parsed.map((book: any) => {
        const newBook = new Books(book.title, book.author, book.quantity);
        newBook.id = book.id;
        return newBook;
      });
      setBooks(bookInstances);
    }

    // Libraries
    if (!storedLibraries) {
      const defaultLibraries = [
        new Library("English Library", "aunarchy@librarian.com", englishBooks),
        new Library("Urdu Library", "johnny@librarian.com", urduBooks),
      ];
      localStorage.setItem("libraryArray", JSON.stringify(defaultLibraries));
      setLibraries(defaultLibraries);
    } else {
      const parsed = JSON.parse(storedLibraries);
      const libraryInstances = parsed.map((lib: any) => {
        const newLib = new Library(lib.name);
        newLib.id = lib.id;
        newLib.librarian = lib.librarian;
        newLib.books = lib.books || [];
        return newLib;
      });
      setLibraries(libraryInstances);
    }

    // Users
    if (!storedUsers) {
      const urduLibrarian = new User("johnny@librarian.com", "library123", "librarian");
      urduLibrarian.library = "Urdu Library";
      const englishLibrarian = new User("aunarchy@librarian.com", "library123", "librarian");
      englishLibrarian.library = "English Library";
      const defaultUsers = [
        urduLibrarian,
        englishLibrarian,
        new User("tahir@admin.com", "admin123", "admin"),
      ];
      localStorage.setItem("userArray", JSON.stringify(defaultUsers));
    }

    // Active User
    const storedUser = localStorage.getItem("activeUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const activeUser = new User(parsedUser.email, parsedUser.password, parsedUser.role);
      activeUser.library = parsedUser.library;
      setActiveUser(activeUser);
    }

    // Issued Books
    if (storedIssuedBooks) {
      const parsed = JSON.parse(storedIssuedBooks);
      const issuedInstances = parsed.map((issue: any) => {
        const issued = new IssuedBooks(issue.bookId, issue.userId);
        issued.id = issue.id;
        issued.issueDate = new Date(issue.issueDate);
        issued.returnDate = issue.returnDate ? new Date(issue.returnDate) : undefined;
        return issued;
      });
      setIssuedBooks(issuedInstances);
    } else {
      localStorage.setItem("issuedBooksArray", JSON.stringify([]));
    }
  }, []);

  const signUpHandler = (email: string, password: string, libraryName: string) => {
    const newUser = new User(email, password);
    newUser.library = libraryName;

    const storedUsers = localStorage.getItem("userArray");
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

    const userExists = usersArray.some((user: User) => user.email === email);
    if (userExists) return false;

    const updatedUser = [...usersArray, newUser];
    localStorage.setItem("userArray", JSON.stringify(updatedUser));

    setActiveUser(newUser);
    localStorage.setItem("activeUser", JSON.stringify(newUser));

    return true;
  };

  const loginHandler = (email: string, password: string) => {
    const storedUsers = localStorage.getItem("userArray");
    const usersArray = storedUsers ? JSON.parse(storedUsers) : [];

    const foundUser = usersArray.find(
      (user: { email: string; password: string }) =>
        user.email === email && user.password === password
    );

    if (foundUser) {
      const loggedInUser = new User(foundUser.email, foundUser.password, foundUser.role);
      loggedInUser.library = foundUser.library;
      setActiveUser(loggedInUser);
      localStorage.setItem("activeUser", JSON.stringify(loggedInUser));
      return true;
    }

    console.warn("Invalid email or password.");
    return false;
  };

  const logoutHandler = () => {
    localStorage.removeItem("activeUser");
    setActiveUser(new User("", ""));
    window.location.reload();
  };

  const findLibraryByName = (name: string) => {
    const foundLibrary = libraries.find((lib) => lib.name === name);
    return foundLibrary || new Library("Default Library");
  };

 
  const addBook = (newBook: Books) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    localStorage.setItem("bookArray", JSON.stringify(updatedBooks));
  };

  
  const updateBook = (updatedBook: Books) => {
    const updatedBooks = books.map((b) => (b.id === updatedBook.id ? updatedBook : b));
    setBooks(updatedBooks);
    localStorage.setItem("bookArray", JSON.stringify(updatedBooks));
  };

  
  const deleteBook = (bookId: string) => {
    const updatedBooks = books.filter((b) => b.id !== bookId);
    setBooks(updatedBooks);
    localStorage.setItem("bookArray", JSON.stringify(updatedBooks));
  };

  const contextValue: dataType = {
    user: activeUser,
    library: libraries,
    books: books,
    issuedBooks: issuedBooks,
    signUp: signUpHandler,
    login: loginHandler,
    logout: logoutHandler,
    searchLibrary: findLibraryByName,
    addBook,
    updateBook,
    deleteBook,
  };

  return <DataContext value={contextValue}>{props.children}</DataContext>;
};

export default DataContextProvider;
