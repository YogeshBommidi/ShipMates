import { Container, MantineProvider, Modal, Stepper } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import BasicDetails from "./BasicDetails";
import UploadImage from "./UploadImage";
import AddFromLocation from "./AddFromAddress";
import AddToLocation from "./AddToLocation";

const AddLoadModel = ({ loadOpened, setLoadOpened }) => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [active, setActive] = useState(0);
  const nextStep = () =>
    setActive((current) => (current < 4 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const { user, isAuthenticated } = useAuth0();

  const [loadDetails, setLoadDetails] = useState({
    title: "",
    description: "",
    price: 0,
    fromAddress: "",
    toAddress: "",
    image: null,
    userEmail: user?.email || "",
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      setLoadDetails((prevDetails) => ({
        ...prevDetails,
        userEmail: user.email,
      }));
    }
  }, [user, isAuthenticated]);

  return (
    <MantineProvider>
      <Modal
        opened={loadOpened}
        onClose={() => setLoadOpened(false)}
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
                loadDetails={loadDetails}
                setLoadDetails={setLoadDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Location" description="From Address">
              <AddFromLocation
                nextStep={nextStep}
                prevStep={prevStep}
                loadDetails={loadDetails}
                setLoadDetails={setLoadDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Location" description="To Address">
              <AddToLocation
                prevStep={prevStep}
                nextStep={nextStep}
                loadDetails={loadDetails}
                setLoadDetails={setLoadDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="Upload" description="Image">
              <UploadImage
                prevStep={prevStep}
                loadDetails={loadDetails}
                setLoadDetails={setLoadDetails}
                setLoadOpened={setLoadOpened}
                setActive={setActive}
              />
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>
        </Container>
      </Modal>
    </MantineProvider>
  );
};

export default AddLoadModel;
