import React from "react";
import {
  IonPage,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { person, personCircle } from "ionicons/icons";

interface LoginToggleProps extends RouteComponentProps {}

export const LoginToggle: React.FC<LoginToggleProps> = ({ history }) => {
  const goToEmployee = () => history.push("/employee");
  const goToSupervisor = () => history.push("/supervisor");

  return (
    <IonPage
      data-testid="login-toggle-page"
      aria-label="Login role selection page"
      style={{
        background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
      }}
    >
      <IonHeader>
        <IonToolbar>
          <IonTitle data-testid="login-toggle-title">Choose Role</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent
        className="ion-padding"
        data-testid="login-toggle-content"
        role="main"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center",
          flexDirection: "column",
        }}
      >
        {/* Intro Text */}
        <IonText style={{ marginBottom: "2rem" }}>
          <h2>Welcome! Please select your role to continue.</h2>
          <p>Choose either Employee or Supervisor to access your dashboard.</p>
        </IonText>

        {/* Buttons */}
        <IonGrid style={{ maxWidth: "300px" }}>
          <IonRow className="ion-justify-content-center ion-align-items-center">
            <IonCol size="12">
              <IonButton
                expand="block"
                onClick={goToEmployee}
                data-testid="employee-button"
                aria-label="Login as Employee"
                fill="solid"
                color="primary"
                style={{
                  fontSize: "1.2rem",
                  padding: "1rem",
                  borderRadius: "12px",
                  marginBottom: "16px",
                }}
              >
                <IonIcon icon={person} slot="start" />
                Employee
              </IonButton>
              <IonButton
                expand="block"
                onClick={goToSupervisor}
                data-testid="supervisor-button"
                aria-label="Login as Supervisor"
                fill="outline"
                color="secondary"
                style={{
                  fontSize: "1.2rem",
                  padding: "1rem",
                  borderRadius: "12px",
                }}
              >
                <IonIcon icon={personCircle} slot="start" />
                Supervisor
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};
