import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  prettyDOM,
  act,
} from "@testing-library/react";
import RequestItem from "./RequestItem";
import { TimeOffRequest } from "../api/timeOffApi";
import { describe, vi, it, expect } from "vitest";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("RequestItem", () => {
  const request: TimeOffRequest = {
    id: "123",
    type: "Vacation",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    notes: "Some notes",
    status: "Pending",
    supervisorNote: "Existing note",
  };

  it("renders request info including supervisor note", () => {
    render(<RequestItem request={request} />);

    expect(screen.getByText("Vacation")).toBeInTheDocument();
    expect(screen.getByText("2025-09-10 → 2025-09-12")).toBeInTheDocument();
    expect(screen.getByText("Some notes")).toBeInTheDocument();
    expect(screen.getByText(/Supervisor Note:/i).innerHTML).toBe(
      "Supervisor Note: <strong>Existing note</strong>",
    );
    expect(screen.getByText(/Status:/i).innerHTML).toBe(
      "Status: <strong>Pending</strong>",
    );
  });

  it("opens modal and calls onDecision with note when approved", async () => {
    const user = userEvent.setup();
    const handleDecision = vi.fn();
    render(<RequestItem request={request} onDecision={handleDecision} />);
    await act(async () => {
      await user.click(screen.getByText("Approve"));
    });

    await act(async () => {
      console.log(prettyDOM(screen.getByText("Approve")));

      // Modal should open

      const [textarea] = screen.getAllByPlaceholderText("Optional note...");
      fireEvent(
        textarea,
        new CustomEvent("ionChange", { detail: { value: "Approved note" } }),
      );
    });
    await act(async () => {
      //    await act(async () => await user.click(screen.getByTestId("close")));

      /*  fireEvent(
        screen.getByTestId("close"),
        new CustomEvent("click", { detail: { value: "" } }),
      );
*/
      await user.click(screen.getByTestId("confirm-action"));
    });
    //await user.click(screen.getByTestId("close"));
    //console.log(prettyDOM(screen.getByTestId("close")));
    //await new Promise((r) => setTimeout(r, 3000));
    //screen.debug();
    /*await user.click(screen.getByTestId("confirm-action"));
    await waitFor(() =>
      expect(handleDecision).toHaveBeenCalledWith(
        "123",
        "Approved",
        "Approved note",
      ),
    );*/
    await act(async () => {
      await waitFor(() =>
        expect(screen.getByTestId("confirm-action")).not.toBeInTheDocument(),
      );
    });
    // screen.debug();

    expect(handleDecision).toHaveBeenCalledWith(
      "123",
      "Approved",
      "Approved note",
    );
  });

  it("opens modal and calls onDecision with note when rejected", () => {
    const handleDecision = vi.fn();
    render(<RequestItem request={request} onDecision={handleDecision} />);

    // Click Reject button
    fireEvent.click(screen.getByText("Reject"));

    // Modal should open
    const textarea = screen.getByPlaceholderText("Optional note...");
    fireEvent.change(textarea, { target: { value: "Rejected note" } });

    // Click Confirm
    fireEvent.click(screen.getByText(/Confirm Rejected/i));

    expect(handleDecision).toHaveBeenCalledWith(
      "123",
      "Rejected",
      "Rejected note",
    );
  });

  it("calls onDecision with undefined note if textarea is empty", async () => {
    const user = userEvent.setup();
    const handleDecision = vi.fn();
    render(<RequestItem request={request} onDecision={handleDecision} />);

    await user.click(screen.getByText("Approve")); //fireEvent.click(screen.getByText("Approve"));
    await user.click(screen.getByTestId("confirm-action"));

    expect(handleDecision).toHaveBeenCalledWith("123", "Approved", undefined);
  });
});
