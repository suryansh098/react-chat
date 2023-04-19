// import components
import Navbar from "./Navbar";
import Search from "./Search";
import UserList from "./UserList";
// import css module
import classes from "./Sidebar.module.css";

const Sidebar = () => {
  return (
    <div className={classes["sidebar"]}>
      <Navbar />
      <Search />
      <UserList />
    </div>
  );
};

export default Sidebar;
