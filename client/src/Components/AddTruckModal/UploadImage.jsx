import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "../AddLoadModel/UploadImage.css";
import { Button, Group } from "@mantine/core";
import UserDetailContext from "../Context/UserDetailContext";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { toast } from "react-toastify";
import { createTruck } from "../../utils/api";

const UploadImage = ({
  prevStep,
  truckDetails,
  setTruckDetails,
  setTruckOpened,
  setActive,
}) => {
  const [imageUrl, setImageUrl] = useState(truckDetails.image);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const { user, isAuthenticated } = useAuth0();
  const {
    userDetails: { token },
  } = useContext(UserDetailContext);

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "daajue6i2",
        uploadPreset: "kp0zflpc",
        maxFiles: 1,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageUrl(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to upload an image", {
        position: "bottom-right",
      });
      return;
    }

    mutate();
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: () =>
      createTruck(
        {
          ...truckDetails,
          image: imageUrl,
        },
        token
      ),
    onError: ({ response }) => {
      if (response.status === 401) {
        toast.error("You are not authorized to perform this action", {
          position: "bottom-right",
        });
      } else {
        toast.error(response.data.message, {
          position: "bottom-right",
        });
      }
    },
    onSettled: () => {
      toast.success("Added Successfully", { position: "bottom-right" });
      setTruckDetails({
        driverName: "",
        truckEmail: user?.email,
        license: "",
        truckCapacity: 0,
        image: null,
      });
      setTruckOpened(false);
      setActive(0);
    },
  });

  return (
    <div className="upload-wrapper">
      {!imageUrl ? (
        <div className="uploadZone" onClick={() => widgetRef.current.open()}>
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImage" onClick={() => widgetRef.current.open()}>
          <img src={imageUrl} alt="Uploaded" />
        </div>
      )}
      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button
          type="submit"
          color="green"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Submitting" : "Add Truck"}
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
