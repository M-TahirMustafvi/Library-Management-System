import { useContext } from "react";

import { DataContext } from "../../store/data-context";
import Librarian from "../../components/Members/Librarian";

export default function Members() {
  const dataCtx = useContext(DataContext);
  const role = dataCtx.user.role?.trim().toLowerCase();

  return (
    <>
      {((role === "librarian") && <Librarian />)  || <p>Please Sign in first.</p>}
    </>
  );
}
    