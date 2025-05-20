import React, { createContext, useEffect, useState, type ReactNode } from "react";
import { User, Books, Library, IssuedBooks, Requests } from "../types/Lib_Types";
import { englishBooks, urduBooks } from "./books-data";

type dataType = {
  user: User;
  library: Library[];
  books: Books[];
  issuedBooks: IssuedBooks[];
  requests: Requests[];
  signUp: (email: string, pwd: string, library: string) => boolean;
  login: (email: string, pwd: string) => boolean;
  logout: () => void;
  deleteUser: (id: string) => void;
  addUser: (newUser: User) => boolean;
  searchLibrary: (name: string) => Library;
  addBook: (book: Books) => void;
  updateBook: (book: Books) => void;
  deleteBook: (bookId: string) => void;
  addRequest: (req: Requests) => void;
  updateRequest: (req: Requests) => void;
  deleteRequest: (id: string) => void;
  deleteLibrary: (Id: string) => void;
  addLibrary: (lib:Library) => void;
  updateLibrary: (lib:Library) => void;
};

const defaultUser = new User({email: "", password: "", library: ""});

export const DataContext = createContext<dataType>({
  user: defaultUser,
  library: [],
  books: [],
  issuedBooks: [],
  requests: [],
  signUp: () => true,
  login: () => true,
  logout: () => {},
  deleteUser: () => {},
  addUser : () => true,
  searchLibrary: () => new Library(""),
  addBook: () => {},
  updateBook: () => {},
  deleteBook: () => {},
  addRequest: () => {},
  updateRequest: () => {},
  deleteRequest: () => {},
  deleteLibrary: () => {},
  addLibrary: () => {},
  updateLibrary: () => {}
});

const parseBooks = (storedBooks: any[]) => {
  return storedBooks.map((book) => {
    const instance = new Books(book.title, book.author, book.quantity);
    instance.id = book.id;
    instance.isAvailable = book.isAvailable;
    return instance;
  });
};

const parseLibraries = (storedLibraries: any[]) => {
  return storedLibraries.map((lib) => {
    const instance = new Library(lib.name, lib.librarian, lib.books);
    instance.id = lib.id;
    return instance;
  });
};

const parseIssuedBooks = (storedIssuedBooks: any[]) => {
  return storedIssuedBooks.map((issue) => {
    const instance = new IssuedBooks(issue.bookId, issue.userId);
    instance.id = issue.id;
    instance.issueDate = new Date(issue.issueDate);
    instance.returnDate = issue.returnDate ? new Date(issue.returnDate) : undefined;
    return instance;
  });
};

const parseRequests = (storedRequests: any[]) => {
  return storedRequests.map((req) => {
    const instance = new Requests(req.bookName, req.userEmail);
    instance.id = req.id;
    instance.requestDate = new Date(req.requestDate);
    instance.requestStatus = req.requestStatus;
    return instance;
  });
};

const DataContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeUser, setActiveUser] = useState<User>(defaultUser);
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [books, setBooks] = useState<Books[]>([]);
  const [issuedBooks, setIssuedBooks] = useState<IssuedBooks[]>([]);
  const [requests, setRequests] = useState<Requests[]>([]);

  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("bookArray") || "null");
    const storedLibraries = JSON.parse(localStorage.getItem("libraryArray") || "null");
    const storedIssuedBooks = JSON.parse(localStorage.getItem("issuedBooksArray") || "null");
    const storedRequests = JSON.parse(localStorage.getItem("requestArray") || "[]");

    // Books
    if (!storedBooks) {
      const defaultBooks = [...englishBooks, ...urduBooks];
      localStorage.setItem("bookArray", JSON.stringify(defaultBooks));
      setBooks(defaultBooks);
    } else {
      setBooks(parseBooks(storedBooks));
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
      setLibraries(parseLibraries(storedLibraries));
    }

    // Users
    if (!localStorage.getItem("userArray")) {
      const urduLibrarian = new User({email:"johnny@librarian.com", password:"library123", role:"librarian", library:"Urdu Library"});
      const englishLibrarian = new User({email:"aunarchy@librarian.com", password:"library123", role:"librarian", library:"English Library"});
      const defaultUsers = [
        urduLibrarian,
        englishLibrarian,
        new User({email:"tahir@admin.com", password:"admin123", role:"admin"}),
      ];
      localStorage.setItem("userArray", JSON.stringify(defaultUsers));
    }

    const storedUser = localStorage.getItem("activeUser");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      const active = new User({email: parsedUser.email, password: parsedUser.password, role: parsedUser.role, library: parsedUser.library});

      setActiveUser(active);
    }

    if (storedIssuedBooks) setIssuedBooks(parseIssuedBooks(storedIssuedBooks));
    else localStorage.setItem("issuedBooksArray", JSON.stringify([]));

    setRequests(parseRequests(storedRequests));
  }, []);

  // Auth
  const signUp = (email: string, password: string, libraryName: string) => {
    const newUser = new User({email:email, password:password, library:libraryName});
    //newUser.library = libraryName;

    const users = JSON.parse(localStorage.getItem("userArray") || "[]");
    if (users.some((u: any) => u.email === email)) return false;

    const updatedUsers = [...users, newUser];
    localStorage.setItem("userArray", JSON.stringify(updatedUsers));

    setActiveUser(newUser);
    localStorage.setItem("activeUser", JSON.stringify(newUser));
    return true;
  };

  const addUser = (newUser: User) => {
    const users = JSON.parse(localStorage.getItem("userArray") || "[]");
    if (users.some((u: any) => u.email === newUser.email)) {
      console.error('same email');
      return false;
    }
    const updatedUsers = [...users, newUser];
    localStorage.setItem("userArray", JSON.stringify(updatedUsers));
    return true;
    //newUser.library = libraryName;
  }

  const login = (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem("userArray") || "[]");
    const user = users.find((u: User) => u.email === email && u.password === password);
    if (!user) return false;

    const instance = new User({email: user.email, password:user.password, role:user.role, library: user.library});
    setActiveUser(instance);
    localStorage.setItem("activeUser", JSON.stringify(instance));
    return true;
  };

  const logout = () => {
    localStorage.removeItem("activeUser");
    setActiveUser(new User({email: "", password: "", role:""}));
    window.location.reload();
  };

  const deleteUser = (id: string) => {
    const users = JSON.parse((localStorage.getItem("userArray") || "[]"));
    const updatedUsers = users.filter((u: User) => u.id !== id);
    localStorage.setItem("userArray", JSON.stringify(updatedUsers));

    const reqUser = users.filter((u: User) => u.id === id);
    requests.forEach((request) => {
      if (request.userEmail === reqUser[0].email) {
        request.userEmail = "[Deleted User]";
      }
    localStorage.setItem("requestArray", JSON.stringify(request));
    });
  } 

  const searchLibrary = (name: string) =>
    libraries.find((lib) => lib.name === name) || new Library("Default Library");

  // Book Management
  const addBook = (book: Books) => {
    const updated = [...books, book];
    setBooks(updated);
    localStorage.setItem("bookArray", JSON.stringify(updated));
  };

  const updateBook = (updatedBook: Books) => {
    const updated = books.map((b) => (b.id === updatedBook.id ? updatedBook : b));
    setBooks(updated);
    localStorage.setItem("bookArray", JSON.stringify(updated));
  };

  const deleteBook = (id: string) => {
    const library = searchLibrary(activeUser.library || "");
    const libraryBooks: Books[] = library.books?.filter((b: Books) => b.id !== id) || [];
    library.books = libraryBooks;
    updateLibrary(library);
    
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    localStorage.setItem("bookArray", JSON.stringify(updated));
  };

  // Request Management
  const addRequest = (req: Requests) => {
    const updated = [...requests, req];
    setRequests(updated);
    localStorage.setItem("requestArray", JSON.stringify(updated));
  };

  const updateRequest = (req: Requests) => {
  const updated = requests.map((r) => (r.id === req.id ? req : r));
  setRequests(updated);
  localStorage.setItem("requestArray", JSON.stringify(updated));

  // If request is marked completed, issue the book
  if (req.requestStatus === "completed") {
    const bookToIssue = books.find((book) => book.title === req.bookName);
    if (!bookToIssue) return;

    const newIssue = new IssuedBooks(bookToIssue.id, req.userEmail); // assuming userEmail is used as userId
    const updatedIssuedBooks = [...issuedBooks, newIssue];
    setIssuedBooks(updatedIssuedBooks);
    localStorage.setItem("issuedBooksArray", JSON.stringify(updatedIssuedBooks));
  }
};


  const deleteRequest = (id: string) => {
    const updated = requests.filter((r) => r.id !== id);
    setRequests(updated);
    localStorage.setItem("requestArray", JSON.stringify(updated));
  };

  const deleteLibrary = (id: string) => {
    const updated = libraries.filter((lib) => lib.id !== id);
    setLibraries(updated);
    localStorage.setItem("libraryArray", JSON.stringify(updated));
  };

  const addLibrary = (lib: Library) => {
    const updated = [...libraries, lib];
    setLibraries(updated);
    localStorage.setItem("libraryArray", JSON.stringify(updated));  
  }
 
  const updateLibrary = (lib: Library) => {
    const changed = libraries.filter((library: Library) => library.id !== lib.id);
    const updated = [...changed, lib];
    setLibraries(updated);
    localStorage.setItem("libraryArray", JSON.stringify(updated));
  }

  return (
    <DataContext.Provider
      value={{
        user: activeUser,
        library: libraries,
        books,
        issuedBooks,
        requests,
        signUp,
        login,
        logout,
        deleteUser,
        addUser,
        searchLibrary,
        addBook,
        updateBook,
        deleteBook,
        addRequest,
        updateRequest,
        deleteRequest,
        deleteLibrary,
        addLibrary,
        updateLibrary
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContextProvider;
