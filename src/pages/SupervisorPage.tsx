import React, { useState } from "react";
import { IonContent, IonPage, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { TimeOffRequest } from "../data/mockData";
import RequestList from "../components/RequestList";

const SupervisorPage: React.FC = () => {
    const [requests, setRequests] = useState<TimeOffRequest[]>([]);

    const handleDecision = (id: string, status: "Approved" | "Rejected") => {
        setRequests(prev =>
            prev.map(r => (r.id === id ? { ...r, status } : r))
        );
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Supervisor Portal</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <RequestList requests={requests} onDecision={handleDecision} />
            </IonContent>
        </IonPage>
    );
};

export default SupervisorPage;
