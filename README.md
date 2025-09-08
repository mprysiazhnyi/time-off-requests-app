# Time Off Requests App

A **React + Ionic** application for managing employee time-off requests with a supervisor approval workflow.

## Features

- Display a list of employee time-off requests.
- View request details: type, dates, employee notes, and supervisor notes.
- Approve or reject requests with optional supervisor notes.
- Modal input for adding notes when approving or rejecting.
- Fully controlled inputs for real-time updates.

## Tech Stack & Libraries

- **Frontend:** React, TypeScript, Ionic React, Vite
- **UI Components:** Ionic Framework (`IonCard`, `IonModal`, `IonTextarea`, `IonButton`, `IonToolbar`, etc.)
- **Icons:** Ionicons
- **State Management:** React `useState`, Tanstack Query
- **Mock API:** Tanstack Query, Local storage
- **Testing (optional):** @testing-library/react, Vitest 

## Installation
 
Install dependencies using Yarn:

```bash
yarn install
```

Start the development server:

```bash
yarn dev
```

Open the app in your browser (at [http://localhost:5173](http://localhost:5173)).

## Running Storybook

Install Storybook dependencies (if not installed):

```bash
npx sb init
```

Run Storybook:

```bash
yarn storybook
```

Access Storybook in your browser (usually at [http://localhost:6006](http://localhost:6006)).

### Example: Create stories for `RequestItem`

```tsx
import React from "react";
import { Meta, Story } from "@storybook/react";
import RequestItem from "../components/RequestItem";
import { TimeOffRequest } from "../api/timeOffApi";

export default {
  title: "Components/RequestItem",
  component: RequestItem,
} as Meta;

const Template: Story<{ request: TimeOffRequest }> = (args) => (
  <RequestItem {...args} />
);

export const PendingRequest = Template.bind({});
PendingRequest.args = {
  request: {
    id: "1",
    type: "Vacation",
    startDate: "2025-09-10",
    endDate: "2025-09-12",
    notes: "Family trip",
    supervisorNote: "",
    status: "Pending",
  },
};
```

## Component Overview

### `RequestItem`

**Props:**

```ts
interface Props {
  request: TimeOffRequest;
  onDecision?: (
    id: string,
    status: "Approved" | "Rejected",
    supervisorNote?: string
  ) => void;
}
```

**Handles:**

- Displaying request details (`type`, `startDate`, `endDate`, `notes`, `status`)
- Supervisor actions: Approve / Reject
- Modal for adding optional notes

**Usage Example:**

```tsx
<RequestItem
  request={{
    id: '123',
    type: 'Vacation',
    startDate: '2025-09-10',
    endDate: '2025-09-12',
    notes: 'Family trip',
    supervisorNote: '',
    status: 'Pending'
  }}
  onDecision={(id, status, supervisorNote) => {
    console.log(id, status, supervisorNote);
  }}
/>
```

## How It Works

- Each request is displayed as an `IonCard`.
- Pending requests show **Approve** and **Reject** buttons.
- Clicking a button opens a modal (`IonModal`) to add an optional note.
- The note is controlled via React state (`useState`) and updates on every keystroke (`onIonInput`).
- Confirming the action calls `onDecision` with the latest note.

## License

MIT License

