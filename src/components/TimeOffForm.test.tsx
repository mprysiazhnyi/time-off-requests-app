import { render, screen, fireEvent } from "@testing-library/react";
import TimeOffForm from "./TimeOffForm";

test("submits a time off request with required fields", () => {
    const handleSubmit = jest.fn();

    render(<TimeOffForm onSubmit={handleSubmit} />);

    fireEvent.change(screen.getByLabelText(/Start Date/i), { target: { value: "2025-09-10" } });
    fireEvent.change(screen.getByLabelText(/End Date/i), { target: { value: "2025-09-12" } });

    fireEvent.click(screen.getByText(/Submit Request/i));

    expect(handleSubmit).toHaveBeenCalled();
    expect(handleSubmit.mock.calls[0][0]).toMatchObject({
        startDate: "2025-09-10",
        endDate: "2025-09-12",
        status: "Pending",
    });
});
