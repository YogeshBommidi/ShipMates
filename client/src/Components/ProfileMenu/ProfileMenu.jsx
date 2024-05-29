import React from "react";
import { Menu, Avatar, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const ProfileMenu = ({ user, logout }) => {
  return (
    <MantineProvider>
      <Menu>
        <Menu.Target>
          <Avatar src={user.picture} alt="user image" radius={"xl"} />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item>Favourities</Menu.Item>
          <Menu.Item>Bookings</Menu.Item>
          <Menu.Item
            onClick={() => {
              localStorage.clear();
              logout();
            }}
          >
            logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </MantineProvider>
  );
};

export default ProfileMenu;
