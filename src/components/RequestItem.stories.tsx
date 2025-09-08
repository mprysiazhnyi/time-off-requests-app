import type { Meta, StoryObj } from "@storybook/react";
import RequestItem from "./RequestItem";
import { TimeOffRequest } from "../data/mockData";

const meta: Meta<typeof RequestItem> = {
    title: "Components/RequestItem",
    component: RequestItem,
};
export default meta;

type Story = StoryObj<typeof RequestItem>;

const sampleRequest: TimeOffRequest = {
    id: "1",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    type: "Vacation",
    notes: "Trip with family",
    status: "Pending"
};

export const Pending: Story = {
    args: {
        request: sampleRequest,
    },
};

export const Approved: Story = {
    args: {
        request: { ...sampleRequest, status: "Approved" },
    },
};