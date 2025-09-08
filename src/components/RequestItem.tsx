import React from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonButton } from "@ionic/react";
import { TimeOffRequest } from "../data/mockData";

interface Props {
    request: TimeOffRequest;
    onDecision?: (id: string, status: "Approved" | "Rejected") => void;
}

const RequestItem: React.FC<Props> = ({ request, onDecision }) => (
    <IonCard>
        <IonCardHeader>
            <IonCardTitle>{request.type}</IonCardTitle>
            <IonCardSubtitle>{request.startDate} → {request.endDate}</IonCardSubtitle>
        </IonCardHeader>
        <IonCardContent>
            <p>{request.notes}</p>
            <p>Status: <strong>{request.status}</strong></p>
            {onDecision && request.status === "Pending" && (
                <>
                    <IonButton color="success" onClick={() => onDecision(request.id, "Approved")}>Approve</IonButton>
                    <IonButton color="danger" onClick={() => onDecision(request.id, "Rejected")}>Reject</IonButton>
                </>
            )}
        </IonCardContent>
    </IonCard>
);

export default RequestItem;
