import React, { useContext, useState } from "react";
import { User } from "../../types/Lib_Types";
import { BooksStyles } from "../../styles/library-styles";
import { v4 as uuidv4 } from "uuid";
import { DataContext } from "../../store/data-context";

type Props = {
  userData?: User; // Optional for 'Add' mode
  onClose: () => void;
  onSave: (updatedUser: User) => void;
};

const ModalForm: React.FC<Props> = ({ userData, onClose, onSave }) => {
  const isEditMode = !!userData;
  const { user } = useContext(DataContext);

  const [email, setEmail] = useState(userData?.email || "");
  const [password, setPassword] = useState(userData?.password || "");
  const [role, setRole] = useState(userData?.role || "reader");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUser: User = {
      id: isEditMode && userData ? userData.id : uuidv4(),
      email: email.trim(),
      password: password.trim(),
      role,
      library: user.library ?? "",
    };

    onSave(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md backdrop-brightness-50 flex justify-center items-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-600 p-6 rounded w-95 shadow-lg"
      >
        <h2 className="text-xl font-bold mb-4">
          {isEditMode ? "Edit Member" : "Add Member"}
        </h2>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Email:</span>
          <input
            className={BooksStyles.input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Password:</span>
          <input
            className={BooksStyles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={4}
          />
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Role:</span>
          <select
            className={BooksStyles.input}
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="reader">Reader</option>
            <option value="librarian">Librarian</option>
          </select>
        </div>

        <div className="mb-4 flex justify-between w-full">
          <span className="mt-2">Library:</span>
          <input
            className={BooksStyles.input}
            value={user.library}
            disabled
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button type="submit" className={BooksStyles.button}>
            {isEditMode ? "Save Changes" : "Add Member"}
          </button>
          <button type="button" className={BooksStyles.button} onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ModalForm;
