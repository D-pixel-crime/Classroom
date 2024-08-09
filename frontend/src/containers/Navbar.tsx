import { Home, List } from "lucide-react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex-center w-full justify-between text-white py-6 px-20 lg:text-xl border-b-2 border-b-slate-700 shadow-lg shadow-black">
      <ul className="flex justify-between w-full items-center">
        <li
          className={`${
            pathname == "/"
              ? "border-b-4 hover:cursor-default py-1 text-indigo-400"
              : "hover:text-indigo-400 transition hover:-translate-y-[5%]"
          } border-indigo-400 w-fit rounded-b-md`}
        >
          <Link
            to="/"
            className={`${
              pathname == "/" ? "hover:cursor-default" : ""
            } flex items-center gap-2`}
          >
            <Home />
            Home
          </Link>
        </li>
        <li className="flex items-center gap-2">
          <List />
          Actions
        </li>
      </ul>
    </nav>
  );
};
export default Navbar;
