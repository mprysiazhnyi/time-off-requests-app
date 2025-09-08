import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
} from "@ionic/react";
import { TimeOffRequest } from "../api/timeOffApi";

interface Props {
  onSubmit: (request: TimeOffRequest) => void;
}

const TimeOffForm: React.FC<Props> = ({ onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState<"Vacation" | "Sick" | "Personal">(
    "Vacation",
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    if (!startDate || !endDate) return; // basic validation
    const newRequest: TimeOffRequest = {
      id: Date.now().toString(),
      startDate,
      endDate,
      type,
      notes,
      status: "Pending",
    };
    onSubmit(newRequest);
    setStartDate("");
    setEndDate("");
    setNotes("");
  };

  return (
    <>
      <IonItem>
        <IonLabel position="stacked">Start Date</IonLabel>
        <IonInput
          data-testid="start-date-input"
          type="date"
          value={startDate}
          onIonChange={(e) => setStartDate(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">End Date</IonLabel>
        <IonInput
          data-testid="end-date-input"
          type="date"
          value={endDate}
          onIonChange={(e) => setEndDate(e.detail.value!)}
        />
      </IonItem>

      <IonItem>
        <IonLabel>Type</IonLabel>
        <IonSelect
          data-testid="type-select"
          value={type}
          onIonChange={(e) => setType(e.detail.value)}
        >
          <IonSelectOption value="Vacation" data-testid="type-vacation">
            Vacation
          </IonSelectOption>
          <IonSelectOption value="Sick" data-testid="type-sick">
            Sick
          </IonSelectOption>
          <IonSelectOption value="Personal" data-testid="type-personal">
            Personal
          </IonSelectOption>
        </IonSelect>
      </IonItem>

      <IonItem>
        <IonLabel position="stacked">Notes</IonLabel>
        <IonTextarea
          data-testid="notes-textarea"
          value={notes}
          onIonChange={(e) => setNotes(e.detail.value!)}
        />
      </IonItem>

      <IonButton
        data-testid="submit-request-button"
        expand="block"
        onClick={handleSubmit}
      >
        Submit Request
      </IonButton>
    </>
  );
};

export default TimeOffForm;
