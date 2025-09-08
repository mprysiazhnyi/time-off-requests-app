import React, { useState } from "react";
import { IonButton, IonPage, IonContent, IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import EmployeePage from "./EmployeePage";
import SupervisorPage from "./SupervisorPage";

const LoginToggle: React.FC = () => {
    const [role, setRole] = useState<"employee" | "supervisor" | null>(null);

    if (!role) {
        return (
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Choose Role</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <IonButton expand="block" onClick={() => setRole("employee")}>Employee</IonButton>
                    <IonButton expand="block" onClick={() => setRole("supervisor")}>Supervisor</IonButton>
                </IonContent>
            </IonPage>
        );
    }

    return role === "employee" ? <EmployeePage /> : <SupervisorPage />;
};

export default LoginToggle;
