import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from "@ionic/react";
import { RouteComponentProps, withRouter } from "react-router-dom";

interface LoginToggleProps extends RouteComponentProps {}

export const LoginToggle: React.FC<LoginToggleProps> = ({ history }) => {
  const goToEmployee = () => {
    history.push("/employee");
  };

  const goToSupervisor = () => {
    history.push("/supervisor");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Choose Role</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={goToEmployee}>
          Employee
        </IonButton>
        <IonButton expand="block" onClick={goToSupervisor}>
          Supervisor
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
