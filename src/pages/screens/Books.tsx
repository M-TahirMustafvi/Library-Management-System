import { useContext } from "react";
import Admin from "../../components/Books/Admin";
import Reader from "../../components/Books/Reader";
import { DataContext } from "../../store/data-context";


export default function Book() {
  const dataCtx = useContext(DataContext);
  const role = dataCtx.user.role?.trim().toLowerCase();

  return (
    <>
      {((role === "admin" || role === "librarian" ) && <Admin />) ||
        (role === "reader" && <Reader />) || <p>Please Sign in first.</p>}
    </>
  );
}
    