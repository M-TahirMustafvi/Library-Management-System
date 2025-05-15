import { useContext } from "react";

import { DataContext } from "../../store/data-context";
import Reader from "../../components/Home/Reader";
import Librarian from "../../components/Home/Librarian";
import Admin from "../../components/Home/Admin";

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