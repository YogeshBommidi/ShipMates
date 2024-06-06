import React, { useContext, useState } from "react";
import { MantineProvider, Modal, Button, NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import { useMutation } from "react-query";
import { bookLoad } from "../../utils/api";
import { toast } from "react-toastify";
import UserDetailContext from "../Context/UserDetailContext";

const BookingModal = ({ opened, setOpened, loadId, email }) => {
  const [value, setValue] = useState(null);
  const {
    userDetails: { token },
    setUserDetails,
  } = useContext(UserDetailContext);

  const handleBidSuccess = () => {
    toast.success("Bid SuccessFull", { position: "bottom-right" });
    setUserDetails((prev) => ({
      ...prev,
      bids: [
        ...(prev.bids || []),
        {
          loadId: loadId,
          quotedPrice: value,
        },
      ],
    }));
  };
  const { mutate, isLoading } = useMutation({
    mutationFn: () => bookLoad(value, loadId, email, token),
    onSuccess: () => handleBidSuccess(),
    onError: ({ response }) => toast.error(response.data.message),
    onSettled: () => setOpened(false),
  });
  return (
    <MantineProvider>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Select your Bid"
        styles={{
          modal: {
            background: "black",
          },
          title: {
            color: "#4f4a45",
            fontSize: "1.5rem",
            fontWeight: "bold",
          },
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
            color: "#ed7d31",
            fontSize: "1rem",
          }}
        >
          <DatePicker
            minDate={new Date()}
            styles={{ input: { color: "black" }, label: { color: "#4f4a45" } }}
          />
          <NumberInput
            label="Price"
            placeholder="Enter your price"
            min={0}
            precision={2}
            icon={<span>₹</span>}
            value={value}
            onChange={setValue}
            styles={{
              input: {
                color: "#4f4a45",
                fontSize: "1.2rem",
                fontWeight: "bold",
                border: "1px solid #ed7d31",
              },
              label: {
                color: "#4f4a45",
                fontSize: "1.2rem",
                fontWeight: "bold",
              },
            }}
          />
          <Button
            className="btn"
            disabled={!value || isLoading}
            onClick={() => mutate()}
          >
            Book Visit
          </Button>
        </div>
      </Modal>
    </MantineProvider>
  );
};

export default BookingModal;
