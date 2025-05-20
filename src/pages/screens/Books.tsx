import { useContext } from "react";
import Admin from "../../components/Books/Admin";
import Reader from "../../components/Books/Reader";
import { DataContext } from "../../store/data-context";
import Librarian from "../../components/Books/Librarian";


export default function Book() {
  const dataCtx = useContext(DataContext);
  const role = dataCtx.user.role?.trim().toLowerCase();

  return (
    <>
      {((role === "admin") && <Admin />) ||
        (role === "librarian" && <Librarian />) ||
        (role === "reader" && <Reader />) || <p>Please Sign in first.</p>}
    </>
  );
}
    