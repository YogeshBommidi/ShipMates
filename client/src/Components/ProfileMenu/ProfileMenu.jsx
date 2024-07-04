import React, { useState } from "react";
import { Avatar, MantineProvider, Menu } from "@mantine/core";
import "@mantine/core/styles.css";
import { useNavigate } from "react-router-dom";

const ProfileMenu = ({ user, logout }) => {
  const navigate = useNavigate();
  return (
    <MantineProvider>
      <Menu trigger="hover" openDelay={100} closeDelay={400}>
        <Menu.Target>
          <Avatar
            variant="filled"
            radius="xl"
            size="md"
            color="orange"
            src=""
          />
          {/**<Avatar src={user?.picture} alt="user image" radius={"xl"} />*/}
        </Menu.Target>
        <Menu.Dropdown style={{ background: "#F6F1EE" }}>
          <Menu.Item
            onClick={() => navigate("./favourities", { replace: true })}
          >
            Favourities
          </Menu.Item>
          <Menu.Item onClick={() => navigate("./bids", { replace: true })}>
            My Bids
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("./ownedTruck", { replace: true })}
          >
            My Truck
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("./ownedLoads", { replace: true })}
          >
            My Loads
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("./myBookings", { replace: true })}
          >
            My Bookings
          </Menu.Item>

          <Menu.Divider />

          <Menu.Item
            onClick={() => {
              localStorage.clear();
              logout();
            }}
            color="red"
          >
            logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </MantineProvider>
  );
};

export default ProfileMenu;
