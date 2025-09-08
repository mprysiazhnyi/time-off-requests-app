import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TimeOffForm from "./TimeOffForm";
import React from "react";
import { vi, describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

describe("TimeOffForm", () => {
  it("submits a time off request with required fields", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TimeOffForm onSubmit={handleSubmit} />);

    fireEvent(
      screen.getByTestId("start-date-input"),
      new CustomEvent("ionChange", { detail: { value: "2025-09-10" } }),
    );
    fireEvent(
      screen.getByTestId("end-date-input"),
      new CustomEvent("ionChange", { detail: { value: "2025-09-12" } }),
    );

    await user.click(screen.getByTestId("submit-request"));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));

    expect(handleSubmit).toHaveBeenCalledWith({
      endDate: "2025-09-12",
      id: expect.any(String),
      notes: "",
      startDate: "2025-09-10",
      status: "Pending",
      type: "Vacation",
    });
  });
});
