import { useAuth0 } from "@auth0/auth0-react";
import { Container, MantineProvider, Modal, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import BasicDetails from "./BasicDetails";
import UploadImage from "./UploadImage";

const AddTruckModal = ({ truckOpened, setTruckOpened }) => {
  const isMobile = useMediaQuery("(max-width : 50em");
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const { user, isAuthenticated } = useAuth0();
  const [truckDetails, setTruckDetails] = useState({
    driverName: "",
    truckEmail: user?.email,
    license: "",
    truckCapacity: 0,
    image: null,
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setTruckDetails((prevDetails) => ({
        ...prevDetails,
        truckEmail: user?.email,
      }));
    }
  }, [user, isAuthenticated]);

  return (
    <MantineProvider>
      <Modal
        opened={truckOpened}
        onClose={() => setTruckOpened(false)}
        closeOnClickOutside
        size={"50rem"}
        fullScreen={isMobile}
        transitionProps={{ transition: "fade", duration: 200 }}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Container h={"40rem"} w={"100%"}>
          <Stepper
            active={active}
            onStepClick={setActive}
            allowNextStepsSelect={false}
            color="orange"
          >
            <Stepper.Step label="Basic" description="Details">
              <BasicDetails
                nextStep={nextStep}
                prevStep={prevStep}
                truckDetails={truckDetails}
                setTruckDetails={setTruckDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Upload" description="Image">
              <UploadImage
                prevStep={prevStep}
                truckDetails={truckDetails}
                setTruckDetails={setTruckDetails}
                setTruckOpened={setTruckOpened}
                setActive={setActive}
              />
            </Stepper.Step>
          </Stepper>
        </Container>
      </Modal>
    </MantineProvider>
  );
};

export default AddTruckModal;
