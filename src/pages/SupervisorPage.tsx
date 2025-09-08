import React, { useState } from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import RequestList from "../components/RequestList";
import { TimeOffRequest } from "../api/timeOffApi";
import { RouteComponentProps } from "react-router-dom";

interface SupervisorPageProps extends RouteComponentProps {}

export const SupervisorPage: React.FC<SupervisorPageProps> = ({ history }) => {
  const [requests, setRequests] = useState<TimeOffRequest[]>([]);

  const handleDecision = (id: string, status: "Approved" | "Rejected") => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  };

  const goBackToMenu = () => {
    history.push("/"); // replace "/menu" with your actual menu route
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goBackToMenu}>Back</IonButton>
          </IonButtons>{" "}
          <IonTitle>Supervisor Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <RequestList requests={requests} onDecision={handleDecision} />
      </IonContent>
    </IonPage>
  );
};
