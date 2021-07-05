import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu } from "semantic-ui-react";

const PageHeader = () => {
  const { pathname } = window.location;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path || "home");
  const handleMenuItemChange = (e, { name }) => {
    setActiveItem(name);
  };
  return (
    <Menu pointing secondary as="header" size="large">
      <Menu.Item
        name="home"
        as={NavLink}
        active={activeItem === "home"}
        onClick={handleMenuItemChange}
        to="/home"
      />
      <Menu.Item
        name="about"
        as={NavLink}
        active={activeItem === "about"}
        onClick={handleMenuItemChange}
        to="/about"
      />
      <Menu.Menu position="right">
        <Menu.Item
          name="login"
          as={NavLink}
          active={activeItem === "login"}
          onClick={handleMenuItemChange}
          to="/login"
        />
        <Menu.Item
          name="register"
          as={NavLink}
          active={activeItem === "register"}
          onClick={handleMenuItemChange}
          to="/register"
        />
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={handleMenuItemChange}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default PageHeader;
