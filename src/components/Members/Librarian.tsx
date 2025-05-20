import { useContext, useState, useEffect } from "react";
import { DataContext } from "../../store/data-context";
import { DashboardStyles, BooksStyles } from "../../styles/library-styles";
import { User } from "../../types/Lib_Types";
import ModalForm from "./ModalForm";

export default function Librarian() {
  const { user, issuedBooks, deleteUser, addUser } = useContext(DataContext);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [editingUser, setEditingUser] = useState<User | null | undefined>(null);
  
  useEffect(() => {
    const localUsers = JSON.parse(localStorage.getItem("userArray") || "[]");
    if (user.library) {
      const matchedUsers = localUsers.filter((u: User) => u.library === user.library);
      setFilteredUsers(matchedUsers);
    }
  }, [user.library]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    const localUsers = JSON.parse(localStorage.getItem("userArray") || "[]");

    if (value.trim() === "") {
      setFilteredUsers(localUsers.filter((u: User) => u.library === user.library));
      return;
    }

    const lower = value.toLowerCase();
    const filtered = localUsers.filter(
      (u: User) =>
        u.library === user.library && u.email.toLowerCase().includes(lower)
    );
    setFilteredUsers(filtered);
  };

  const handleSave = (userData: User) => {
    const localUsers = JSON.parse(localStorage.getItem("userArray") || "[]");
    const existingIndex = localUsers.findIndex((u: User) => u.id === userData.id);
  
    if (existingIndex >= 0) {
      
    } else {
      const wasAdded = addUser(userData);
      if (!wasAdded) {
        alert("Addin user was unsuccessfull, email already exists");
      }
    }
  
    const updatedUsers = JSON.parse(localStorage.getItem("userArray") || "[]");
    setFilteredUsers(updatedUsers.filter((u: User) => u.library === user.library));
    setEditingUser(null);
  };
  

  return (
    <div className={DashboardStyles.container}>
      <h1 className={DashboardStyles.title}>Library Members</h1>

      <div className={BooksStyles.searchWrapper}>
        <input
          placeholder="Search users..."
          className={BooksStyles.input}
          onChange={handleChange}
          value={searchTerm}
        />

        <button
          className={BooksStyles.button}
          onClick={() => setEditingUser(undefined)} // Add new user
        >
          Add New User
        </button>
      </div>

      {filteredUsers.length > 0 ? (
        <div className={BooksStyles.tableWrapper}>
          <table className={BooksStyles.table}>
            <thead className={BooksStyles.thead}>
              <tr>
                <th className={BooksStyles.th}>Email</th>
                <th className={BooksStyles.th}>Library</th>
                <th className={BooksStyles.th}>Role</th>
                <th className={BooksStyles.th}>Books Issued</th>
                <th className={BooksStyles.th}></th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u) => {
                const userBooks = issuedBooks.filter((usr) => usr.userId === u.id);
                return (
                  <tr key={u.id} className={BooksStyles.tr}>
                    <td className={BooksStyles.td}>{u.email}</td>
                    <td className={BooksStyles.td}>{u.library}</td>
                    <td className={BooksStyles.td}>{u.role}</td>
                    <td className={BooksStyles.td}>{userBooks.length}</td>
                    <td className={BooksStyles.td}>
                      <button
                        className={BooksStyles.button}
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteUser(u.id);
                          const updatedUsers = filteredUsers.filter((usr) => usr.id !== u.id);
                          setFilteredUsers(updatedUsers);
                          //localStorage.setItem("userArray", JSON.stringify(updatedUsers));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-300">No users found or no library selected.</p>
      )}

      {editingUser !== null && (
        <ModalForm
          userData={editingUser ?? undefined}
          onClose={() => setEditingUser(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
