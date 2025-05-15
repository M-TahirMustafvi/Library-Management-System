

function generateUUID(): string  {
  return crypto.randomUUID(); 
} 
  

export class Books {
    id: string;
    title: string;
    author: string;
    quantity: number;
    isAvailable: boolean;
  
    constructor(title: string, author: string, quantity: number) {
      this.id = generateUUID();
      this.title = title;
      this.author = author;
      this.quantity = quantity;
      this.isAvailable = quantity > 0;
    }
  }
  
  export class Library {
    id: string;
    name: string;
    librarian?: string;
    books?: Books[];
  
    constructor(name: string, librarian?: string, books?: Books[]) {
      this.id = generateUUID();
      this.name = name;
      this.librarian = librarian;
      this.books = books || [];
    }
  }
  
  export class User {
    id: string;
    email: string;
    password: string;
    role?: string;
    library?: string;
  
    constructor(email: string, password: string, role: string = 'reader') {
      this.id = generateUUID();
      this.email = email;
      this.password = password;
      this.role = role;
    }
  }
  
  export class IssuedBooks {
    id: string;
    bookId: string;
    userId: string;
    issueDate: Date;
    returnDate?: Date;
  
    constructor(bookId: string, userId: string  ) {
      this.id = generateUUID();
      this.bookId = bookId;
      this.userId = userId;
      this.issueDate = new Date();
      this.returnDate = new Date(this.issueDate.getTime() + 14 * 24 * 60 * 60 * 1000); 
    }
  }
  

  export class Requests {
    id: string;
    bookId: string;
    userId: string;
    requestDate: Date;
    requestStatus?: string;
  
    constructor(bookId: string, userId: string) {
      this.id = generateUUID();
      this.bookId = bookId;
      this.userId = userId;
      this.requestDate = new Date();
      this.requestStatus = "submitted";
    }
  }