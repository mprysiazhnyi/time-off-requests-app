import React, { useState } from "react";
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonTextarea,
  IonButtons,
  IonIcon,
  IonItem,
} from "@ionic/react";
import { close } from "ionicons/icons";
import { TimeOffRequest } from "../api/timeOffApi";

interface Props {
  request: TimeOffRequest;
  onDecision?: (
    id: string,
    status: "Approved" | "Rejected",
    supervisorNote?: string,
  ) => void;
}

const RequestItem: React.FC<Props> = ({ request, onDecision }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentAction, setCurrentAction] = useState<
    "Approved" | "Rejected" | null
  >(null);
  const [note, setNote] = useState("");

  const openModal = (action: "Approved" | "Rejected") => {
    setCurrentAction(action);
    setNote("");
    setShowModal(true);
  };

  const handleConfirm = () => {
    if (currentAction) {
      onDecision?.(request.id, currentAction, note || undefined);
    }
    setShowModal(false);
  };

  return (
    <>
      <IonCard data-testid={`request-card-${request.id}`}>
        <IonCardHeader>
          <IonCardTitle data-testid="request-type">{request.type}</IonCardTitle>
          <IonCardSubtitle data-testid="request-dates">
            {request.startDate} → {request.endDate}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p data-testid="request-notes">{request.notes}</p>
          {request.supervisorNote && (
            <p data-testid="request-supervisor-note">
              Supervisor Note: <strong>{request.supervisorNote}</strong>
            </p>
          )}
          <p data-testid="request-status">
            Status: <strong>{request.status}</strong>
          </p>
          {onDecision && request.status === "Pending" && (
            <>
              <IonButton
                data-testid="approve-button"
                color="success"
                onClick={() => openModal("Approved")}
              >
                Approve
              </IonButton>
              <IonButton
                data-testid="reject-button"
                color="danger"
                onClick={() => openModal("Rejected")}
              >
                Reject
              </IonButton>
            </>
          )}
        </IonCardContent>
      </IonCard>

      <IonModal
        data-testid="action-modal"
        isOpen={showModal}
        onDidDismiss={() => setShowModal(false)}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Note</IonTitle>
            <IonButtons slot="end">
              <IonButton
                data-testid="close-button"
                onClick={() => setShowModal(false)}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTextarea
            data-testid="note-textarea"
            placeholder="Optional note..."
            value={note}
            onIonChange={(e) => setNote(e.detail.value!)}
          />
          <IonButton
            data-testid="confirm-action-button"
            expand="full"
            onClick={() => handleConfirm()}
            className="ion-margin-top"
          >
            Confirm {currentAction}
          </IonButton>
        </IonContent>
      </IonModal>
    </>
  );
};

export default RequestItem;
