import React, { useState } from "react";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonText,
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

  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEndDateError] = useState("");
  const [notesError, setNotesError] = useState("");

  const validate = (): boolean => {
    let isValid = true;

    setStartDateError("");
    setEndDateError("");
    setNotesError("");

    if (!startDate) {
      setStartDateError("Start date is required.");
      isValid = false;
    }

    if (!endDate) {
      setEndDateError("End date is required.");
      isValid = false;
    }

    if (startDate && endDate && startDate > endDate) {
      setEndDateError("End date cannot be before start date.");
      isValid = false;
    }

    if (notes.length > 500) {
      setNotesError("Notes cannot exceed 500 characters.");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const newRequest: TimeOffRequest = {
      id: Date.now().toString(),
      startDate,
      endDate,
      type,
      notes,
      status: "Pending",
    };

    onSubmit(newRequest);

    // Reset form
    setStartDate("");
    setEndDate("");
    setType("Vacation");
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
      {startDateError && (
        <IonText color="danger">
          <p style={{ margin: "0 0 10px 15px" }}>{startDateError}</p>
        </IonText>
      )}

      <IonItem>
        <IonLabel position="stacked">End Date</IonLabel>
        <IonInput
          data-testid="end-date-input"
          type="date"
          value={endDate}
          onIonChange={(e) => setEndDate(e.detail.value!)}
        />
      </IonItem>
      {endDateError && (
        <IonText color="danger">
          <p style={{ margin: "0 0 10px 15px" }}>{endDateError}</p>
        </IonText>
      )}

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
      {notesError && (
        <IonText color="danger">
          <p style={{ margin: "0 0 10px 15px" }}>{notesError}</p>
        </IonText>
      )}

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
