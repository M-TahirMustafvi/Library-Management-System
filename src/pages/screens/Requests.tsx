import { useContext } from "react";

import { DataContext } from "../../store/data-context";
import Reader from "../../components/Requests/Reader";
import Admin from "../../components/Requests/Admin";

const Requests: React.FC = () => {
  const { user: { role } } = useContext(DataContext);

  return (
    <>
          {((role === "admin" || role === "librarian" ) && <Admin />) ||
            (role === "reader" && <Reader />) || <p>Please Sign in first.</p>}
        </>
  );
}

export default Requests;