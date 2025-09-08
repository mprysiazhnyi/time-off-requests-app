import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import TimeOffForm from "./TimeOffForm";
import { TimeOffRequest } from "../api/timeOffApi";

// Metadata for Storybook
const meta: Meta<typeof TimeOffForm> = {
  title: "Components/TimeOffForm",
  component: TimeOffForm,
};

export default meta;
type Story = StoryObj<typeof TimeOffForm>;

// Default story
export const Default: Story = {
  args: {
    onSubmit: (request: TimeOffRequest) => {
      console.log("Submitted request:", request);
    },
  },
};
