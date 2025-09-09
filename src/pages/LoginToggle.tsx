import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";

interface LoginToggleProps extends RouteComponentProps {}

export const LoginToggle: React.FC<LoginToggleProps> = ({ history }) => {
  const goToEmployee = () => {
    history.push("/employee");
  };

  const goToSupervisor = () => {
    history.push("/supervisor");
  };

  return (
    <IonPage data-testid="login-toggle-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle data-testid="login-toggle-title">Choose Role</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" data-testid="login-toggle-content">
        <IonButton
          expand="block"
          onClick={goToEmployee}
          data-testid="employee-button"
        >
          Employee
        </IonButton>
        <IonButton
          expand="block"
          onClick={goToSupervisor}
          data-testid="supervisor-button"
        >
          Supervisor
        </IonButton>
      </IonContent>
    </IonPage>
  );
};
