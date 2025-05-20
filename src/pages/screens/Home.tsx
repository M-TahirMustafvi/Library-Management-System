import { useContext } from "react";

import { DataContext } from "../../store/data-context";
import Reader from "../../components/Home/Reader";
import Librarian from "../../components/Home/Librarian";
import Admin from "../../components/Home/Admin";


export function HomePage() {
  const dataCtx = useContext(DataContext);
  const role = dataCtx.user.role?.trim().toLowerCase();

  return (
    <>
      {(role === "admin" && <Admin />) ||
        ((role === "librarian") && <Librarian />) ||
        (role === "reader" && <Reader />)}
    </>
  );
}
