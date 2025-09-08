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
    console.log("action", currentAction);
    if (currentAction) {
      onDecision?.(request.id, currentAction, note || undefined);
    }
    setShowModal(false);
  };

  return (
    <>
      <IonCard>
        <IonCardHeader>
          <IonCardTitle>{request.type}</IonCardTitle>
          <IonCardSubtitle>
            {request.startDate} → {request.endDate}
          </IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
          <p>{request.notes}</p>
          {request.supervisorNote && (
            <p>
              Supervisor Note: <strong>{request.supervisorNote}</strong>
            </p>
          )}
          <p>
            Status: <strong>{request.status}</strong>
          </p>
          {onDecision && request.status === "Pending" && (
            <>
              <IonButton
                color="success"
                onClick={function () {
                  console.log("APPROVE");
                  return openModal("Approved");
                }}
              >
                Approve
              </IonButton>
              <IonButton color="danger" onClick={() => openModal("Rejected")}>
                Reject
              </IonButton>
            </>
          )}
        </IonCardContent>
      </IonCard>

      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Add Note</IonTitle>
            <IonButtons slot="end">
              <IonButton
                data-testid="close"
                onClick={function () {
                  console.log("CLOSE");
                  return setShowModal(false);
                }}
              >
                <IonIcon icon={close} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonTextarea
            placeholder="Optional note..."
            value={note}
            onIonChange={(e) => setNote(e.detail.value!)}
          />
          <IonButton
            data-testid="confirm-action"
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
