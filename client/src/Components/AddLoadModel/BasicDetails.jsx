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
  loadDetails,
  setLoadDetails,
}) => {
  const form = useForm({
    initialValues: {
      title: loadDetails.title,
      description: loadDetails.description,
      price: loadDetails.price,
    },
    validate: {
      title: (value) => validateString(value),
      description: (value) => validateString(value),
      price: (value) =>
        value < 1000 ? "Must be greater than 999 Rupees" : null,
    },
  });

  const { title, description, price } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setLoadDetails((prev) => ({ ...prev, title, description, price }));
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
          label="Title"
          placeholder="Item Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="Expected Price"
          min={1000}
          {...form.getInputProps("price")}
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
