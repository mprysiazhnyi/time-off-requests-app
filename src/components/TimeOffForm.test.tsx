import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TimeOffForm from "./TimeOffForm";
import React from "react";
import { vi, describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

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
    IonTextarea: ({ value, onIonInput, ...props }: any) => (
      <textarea
        {...props}
        value={value}
        onChange={(e) => onIonInput(e.target.value)}
      />
    ),
    IonSelect: ({ value, onIonChange, children, ...props }: any) => (
      <select
        {...props}
        value={value}
        onChange={(e) => onIonChange(e.target.value)}
      >
        {children}
      </select>
    ),
    IonSelectOption: ({ value, children }: any) => (
      <option value={value}>{children}</option>
    ),
    IonButton: ({ children, ...props }: any) => (
      <button {...props}>{children}</button>
    ),
    useIonToast: () => [vi.fn()],
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

  it("shows validation error if end date is before start date", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TimeOffForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByTestId("start-date-input"), {
      target: { value: "2025-09-12" },
    });
    fireEvent.change(screen.getByTestId("end-date-input"), {
      target: { value: "2025-09-10" },
    });

    await user.click(screen.getByTestId("submit-request-button"));

    await waitFor(() => {
      expect(
        screen.getByText("End date cannot be before start date"),
      ).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  it("allows selecting a different type and adding notes", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TimeOffForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByTestId("start-date-input"), {
      target: { value: "2025-09-10" },
    });
    fireEvent.change(screen.getByTestId("end-date-input"), {
      target: { value: "2025-09-12" },
    });
    fireEvent.change(screen.getByTestId("type-select"), {
      target: { value: "Sick" },
    });
    fireEvent.change(screen.getByTestId("notes-textarea"), {
      target: { value: "Feeling unwell" },
    });

    await user.click(screen.getByTestId("submit-request-button"));

    await waitFor(() => expect(handleSubmit).toHaveBeenCalledTimes(1));
    expect(handleSubmit).toHaveBeenCalledWith({
      endDate: "2025-09-12",
      id: expect.any(String),
      notes: "Feeling unwell",
      startDate: "2025-09-10",
      status: "Pending",
      type: "Sick",
    });
  });

  it("shows error when notes exceed max length", async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<TimeOffForm onSubmit={handleSubmit} />);

    const longNotes = "a".repeat(501);
    fireEvent.change(screen.getByTestId("notes-textarea"), {
      target: { value: longNotes },
    });

    await user.click(screen.getByTestId("submit-request-button"));

    await waitFor(() => {
      expect(
        screen.getByText("Notes cannot exceed 500 characters"),
      ).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });
});
