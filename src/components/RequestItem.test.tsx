import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RequestItem from "./RequestItem";
import { TimeOffRequest } from "../api/timeOffApi";
import "@testing-library/jest-dom";
import React from "react";
import userEvent from "@testing-library/user-event";

const mockRequest: TimeOffRequest = {
  id: "1",
  type: "Vacation",
  startDate: "2025-09-10",
  endDate: "2025-09-15",
  notes: "Family trip",
  supervisorNote: "Existing note",
  status: "Pending",
};

describe("RequestItem", () => {
  it("renders request details correctly", () => {
    render(<RequestItem request={mockRequest} />);
    expect(screen.getByText(mockRequest.type)).toBeInTheDocument();
    expect(
      screen.getByText(`${mockRequest.startDate} → ${mockRequest.endDate}`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockRequest.notes)).toBeInTheDocument();
    expect(screen.getByText(/Supervisor Note:/i).innerHTML).toBe(
      "Supervisor Note: <strong>Existing note</strong>",
    );
    expect(screen.getByText(/Status:/i).innerHTML).toBe(
      "Status: <strong>Pending</strong>",
    );
  });

  it("shows approve and reject buttons when status is Pending", () => {
    const handleDecision = vi.fn();
    render(<RequestItem request={mockRequest} onDecision={handleDecision} />);
    expect(screen.getByText("Approve")).toBeInTheDocument();
    expect(screen.getByText("Reject")).toBeInTheDocument();
  });

  it("opens modal when Approve button is clicked", async () => {
    const user = userEvent.setup();
    const handleDecision = vi.fn();
    render(<RequestItem request={mockRequest} onDecision={handleDecision} />);
    await user.click(screen.getByText("Approve"));
    const [textarea] = screen.getAllByPlaceholderText("Optional note...");
    expect(textarea).toBeInTheDocument();
    expect(screen.getByText("Confirm Approved")).toBeInTheDocument();
  });

  it("opens modal when Reject button is clicked", async () => {
    const user = userEvent.setup();
    const handleDecision = vi.fn();
    render(<RequestItem request={mockRequest} onDecision={handleDecision} />);

    await user.click(screen.getByText("Reject"));
    const [textarea] = screen.getAllByPlaceholderText("Optional note...");
    expect(textarea).toBeInTheDocument();
    expect(screen.getByText("Confirm Rejected")).toBeInTheDocument();
  });
});
