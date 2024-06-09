import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button, Group } from "@mantine/core";
import { validateString } from "../../utils/common";

const AddFromLocation = ({
  loadDetails,
  setLoadDetails,
  nextStep,
  prevStep,
}) => {
  const form = useForm({
    initialValues: {
      country: "India",
      state: "",
      city: "",
      address: "",
      fromAddress: loadDetails?.fromAddress,
    },
    validate: {
      state: (value) => validateString(value),
      address: (value) => validateString(value),
      city: (value) => validateString(value),
    },
  });

  const handleSubmit = (values) => {
    const { hasError } = form.validate();
    if (!hasError) {
      const fullAddress = `${values.address}, ${values.city},${values.state}, ${values.country}`;
      form.setFieldValue("fromAddress", fullAddress);
      setLoadDetails((prevDetails) => ({
        ...prevDetails,
        fromAddress: fullAddress,
      }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(form.values);
      }}
    >
      <div style={{ flex: 1, gap: "1rem" }}>
        <TextInput
          w={"100%"}
          withAsterisk
          label="Country"
          value="India"
          readOnly
          {...form.getInputProps("country")}
        />

        <TextInput
          w={"100%"}
          withAsterisk
          label="State"
          {...form.getInputProps("state", { type: "input" })}
        />

        <TextInput
          w={"100%"}
          withAsterisk
          label="City"
          {...form.getInputProps("city")}
        />

        <TextInput
          w={"100%"}
          withAsterisk
          label="Address"
          {...form.getInputProps("address")}
        />
      </div>
      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </Group>
    </form>
  );
};

export default AddFromLocation;
