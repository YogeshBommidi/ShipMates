import React from "react";
import { Avatar, MantineProvider, Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <MantineProvider>
      <Menu>
        <Menu.Target>
          <Avatar
            variant="filled"
            radius="xl"
            size="md"
            color="orange"
            src=""
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            onClick={() => navigate("./favourities", { replace: true })}
          >
            Favourities
          </Menu.Item>
          <Menu.Item onClick={() => navigate("./bookings", { replace: true })}>
            Bookings
          </Menu.Item>
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
