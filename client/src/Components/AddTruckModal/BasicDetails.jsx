import React from "react";
import {
  TextInput,
  Box,
  Textarea,
  Group,
  Button,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const BasicDetails = ({
  prevStep,
  nextStep,
  truckDetails,
  setTruckDetails,
}) => {
  const form = useForm({
    initialValues: {
      driverName: truckDetails.driverName,
      license: truckDetails.license,
      truckCapacity: truckDetails.truckCapacity,
    },
    validate: {
      driverName: (value) => validateString(value),
      license: (value) => validateString(value),
      truckCapacity: (value) =>
        value < 1000 ? "Must be greater than 999 Litres" : null,
    },
  });

  const { driverName, license, truckCapacity } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setTruckDetails((prev) => ({ ...prev, driverName, license, truckCapacity }));
      nextStep();
    }
  };
  return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextInput
          withAsterisk
          label="DriverName"
          placeholder="Driver Name"
          {...form.getInputProps("driverName")}
        />
        <Textarea
          placeholder="license"
          label="Nummber Plate"
          withAsterisk
          {...form.getInputProps("license")}
        />
        <NumberInput
          withAsterisk
          label="truckCapacity"
          placeholder="Expected truckCapacity"
          min={1000}
          {...form.getInputProps("truckCapacity")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </Group>
      </form>
    </Box>
  );
};

export default BasicDetails;
