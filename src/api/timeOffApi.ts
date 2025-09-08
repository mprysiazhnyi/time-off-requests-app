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

const STORAGE_KEY = "timeOffRequests";

// Helper to simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const timeOffApi = {
  async getRequests(): Promise<TimeOffRequest[]> {
    await delay(300); // simulate network latency
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async addRequest(request: TimeOffRequest): Promise<TimeOffRequest> {
    await delay(300); // simulate network latency
    const stored = localStorage.getItem(STORAGE_KEY);
    const requests: TimeOffRequest[] = stored ? JSON.parse(stored) : [];
    requests.push(request);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return request;
  },

  async clearRequests(): Promise<void> {
    await delay(100);
    localStorage.removeItem(STORAGE_KEY);
  },
};
