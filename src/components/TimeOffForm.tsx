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
import { TimeOffRequest } from "../types/mockData";

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
          type="date"
          value={startDate}
          onIonChange={(e) => setStartDate(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">End Date</IonLabel>
        <IonInput
          type="date"
          value={endDate}
          onIonChange={(e) => setEndDate(e.detail.value!)}
        />
      </IonItem>
      <IonItem>
        <IonLabel>Type</IonLabel>
        <IonSelect value={type} onIonChange={(e) => setType(e.detail.value)}>
          <IonSelectOption value="Vacation">Vacation</IonSelectOption>
          <IonSelectOption value="Sick">Sick</IonSelectOption>
          <IonSelectOption value="Personal">Personal</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel position="stacked">Notes</IonLabel>
        <IonTextarea
          value={notes}
          onIonChange={(e) => setNotes(e.detail.value!)}
        />
      </IonItem>
      <IonButton expand="block" onClick={handleSubmit}>
        Submit Request
      </IonButton>
    </>
  );
};

export default TimeOffForm;
