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

const FAKE_DELAY_VALUE = 1000;

export const timeOffApi = {
  async getRequests(): Promise<TimeOffRequest[]> {
    await delay(FAKE_DELAY_VALUE); // simulate network latency
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  },

  async addRequest(request: TimeOffRequest): Promise<TimeOffRequest> {
    await delay(FAKE_DELAY_VALUE); // simulate network latency
    const stored = localStorage.getItem(STORAGE_KEY);
    const requests: TimeOffRequest[] = stored ? JSON.parse(stored) : [];
    requests.push(request);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));
    return request;
  },

  async updateTimeOffRequest(
    id: string,
    status: "Approved" | "Rejected",
    supervisorNote?: string,
  ): Promise<TimeOffRequest> {
    await delay(FAKE_DELAY_VALUE);
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) throw new Error("No requests found");

    const requests: TimeOffRequest[] = JSON.parse(stored);
    const index = requests.findIndex((r) => r.id === id);
    if (index === -1) throw new Error("Request not found");

    requests[index] = { ...requests[index], status, supervisorNote };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests));

    return requests[index];
  },
};
