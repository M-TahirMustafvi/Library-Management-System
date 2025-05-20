import { useContext, useState } from "react";
import { DataContext } from "../../store/data-context";
import { BooksStyles, DashboardStyles } from "../../styles/library-styles";
import { Books, Requests, User } from "../../types/Lib_Types";

const Admin = () => {
  const { requests, updateRequest, books, updateBook } = useContext(DataContext);

  // Track modified statuses: { [requestId]: status }
  const [editedStatuses, setEditedStatuses] = useState<Record<string, string>>({});
  const allUsers = JSON.parse(localStorage.getItem("userArray") || "[]");
  const handleStatusChange = (requestId: string, newStatus: string) => {
    setEditedStatuses((prev) => ({ ...prev, [requestId]: newStatus }));
  };

  const handleSubmit = (request: Requests) => {

    const currBook = books.filter((book: Books) => { return book.title === request.bookName});
    //console.log(currBook[0]);
    if(currBook[0].quantity > 0) {
      const updatedStatus = editedStatuses[request.id] ?? request.requestStatus;
      const updatedRequest = { ...request, requestStatus: updatedStatus };
      updateRequest(updatedRequest);
      currBook[0].quantity--;
      updateBook(currBook[0]);
      alert("Request Updated");
    }

    else{
      alert('Book Not Available');
      return;
    }
  };

  return (
    <div className={DashboardStyles.container}>
      <div className={BooksStyles.tableWrapper}>
        <table className={BooksStyles.table}>
          <thead className={BooksStyles.thead}>
            <tr>
              <th className={BooksStyles.th}>Book Name</th>
              <th className={BooksStyles.th}>Request Date</th>
              <th className={BooksStyles.th}>Status</th>
              <th className={BooksStyles.th}>User</th>
              <th className={BooksStyles.th}>LIbrary</th>
              <th className={BooksStyles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {requests.length > 0 ? (
              requests.map((request) => {
                const currentStatus = editedStatuses[request.id] ?? request.requestStatus;
                return (
                  <tr key={request.id}>
                    <td className={BooksStyles.td}>{request.bookName}</td>
                    <td className={BooksStyles.td}>
                      {new Date(request.requestDate).toLocaleDateString()}
                    </td>
                    <td className={BooksStyles.td}>
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(request.id, e.target.value)
                        }
                      >
                        <option value="submitted" className="text-gray-700">Submitted</option>
                        <option value="completed" className="text-gray-700">Completed</option>
                        <option value="rejected" className="text-gray-700">Rejected</option>
                      </select>
                    </td>
                    <td className={BooksStyles.td}>
                        {request.userEmail}
                    </td>
                    
                    <td className={BooksStyles.td}>
                        {allUsers.filter((usr: User) => usr.email === request.userEmail)[0]?.library || "Unknown LIbrary"}
                    </td>
                    <td className={BooksStyles.td}>
                        
                      <button
                        className={BooksStyles.button}
                        onClick={() => handleSubmit(request)}
                        disabled={allUsers.some((usr: User) => usr.email === "[Deleted User]")}
                      >
                        Submit
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td className={BooksStyles.td} colSpan={4}>
                  No requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
