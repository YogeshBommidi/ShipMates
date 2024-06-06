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
        <Menu.Dropdown style={{background: "#F6F1EE"}}>
          <Menu.Item
            onClick={() => navigate("./favourities", { replace: true })}
          >
            Favourities
          </Menu.Item>
          <Menu.Item onClick={() => navigate("./bids", { replace: true })}>
            Bids
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
