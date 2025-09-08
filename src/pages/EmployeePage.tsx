import React, { useState } from "react";
import { IonContent, IonPage, IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { TimeOffRequest } from "../data/mockData";
import TimeOffForm from "../components/TimeOffForm";
import RequestList from "../components/RequestList";

const EmployeePage: React.FC = () => {
    const [requests, setRequests] = useState<TimeOffRequest[]>([]);

    const addRequest = (req: TimeOffRequest) => {
        setRequests(prev => [...prev, req]);
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Employee Portal</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <TimeOffForm onSubmit={addRequest} />
                <RequestList requests={requests} />
            </IonContent>
        </IonPage>
    );
};

export default EmployeePage;
