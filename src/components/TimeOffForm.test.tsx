import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TimeOffForm from "./TimeOffForm";
import React from "react";
import { vi, describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";

vi.mock("@ionic/react", async () => {
  const actual = await vi.importActual("@ionic/react");
  return {
    ...actual,
    IonInput: ({ value, onIonChange, ...props }: any) => (
      <input
        {...props}
        value={value}
        onChange={(e) => onIonChange(e.target.value)}
      />
    ),
  };
});

describe("TimeOffForm", () => {
  it("submits a time off request with required fields", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TimeOffForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByTestId("start-date-input"), {
      target: { value: "2025-09-10" },
    });
    fireEvent.change(screen.getByTestId("end-date-input"), {
      target: { value: "2025-09-12" },
    });

    await user.click(screen.getByTestId("submit-request-button"));

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
