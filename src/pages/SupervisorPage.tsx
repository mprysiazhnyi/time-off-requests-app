import React from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import RequestList from "../components/RequestList";

import { RouteComponentProps } from "react-router-dom";
import { timeOffApi, TimeOffRequest } from "../api/timeOffApi";
import LoadingIndicator from "../components/LoadingIndicator";

interface SupervisorPageProps extends RouteComponentProps {}

export const SupervisorPage: React.FC<SupervisorPageProps> = ({ history }) => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery<TimeOffRequest[], Error>({
    queryKey: ["timeOffRequests"],
    queryFn: timeOffApi.getRequests,
  });

  const decisionMutation = useMutation<
    TimeOffRequest,
    Error,
    { id: string; status: "Approved" | "Rejected"; supervisorNote?: string }
  >({
    mutationFn: ({ id, status, supervisorNote }) =>
      timeOffApi.updateTimeOffRequest(id, status, supervisorNote)!,
    onSuccess: (updatedRequest) => {
      queryClient.setQueryData<TimeOffRequest[]>(["timeOffRequests"], (old) =>
        old?.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)),
      );
    },
  });

  const handleDecision = (
    id: string,
    status: "Approved" | "Rejected",
    supervisorNote?: string,
  ) => {
    decisionMutation.mutate({ id, status, supervisorNote });
  };

  const goBackToMenu = () => {
    history.push("/");
  };

  if (isLoading) {
    return (
      <IonPage data-testid="supervisor-page-loading">
        <LoadingIndicator message="Loading requests..." />
      </IonPage>
    );
  }

  return (
    <IonPage data-testid="supervisor-page" aria-label="Supervisor portal page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={goBackToMenu}
              data-testid="back-button"
              aria-label="Go back to main menu"
            >
              Back
            </IonButton>
          </IonButtons>
          <IonTitle data-testid="supervisor-page-title">
            Supervisor Portal
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        className="ion-padding"
        data-testid="supervisor-page-content"
        role="main"
      >
        <RequestList
          requests={requests}
          onDecision={handleDecision}
          data-testid="request-list"
        />
      </IonContent>
    </IonPage>
  );
};
