export type RequestStatus = "Pending" | "Approved" | "Rejected";
export type TimeOffType = "Vacation" | "Sick" | "Personal";

export interface TimeOffRequest {
    id: string;
    startDate: string;
    endDate: string;
    type: TimeOffType;
    notes?: string;
    status: RequestStatus;
    supervisorNote?: string;
}

export const mockRequests: TimeOffRequest[] = [];
