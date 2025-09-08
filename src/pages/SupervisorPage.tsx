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
    queryKey: ["timeOffRequests"], // this replaces the array shorthand
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
      // Update the cache directly without refetching
      queryClient.setQueryData<TimeOffRequest[]>(["timeOffRequests"], (old) =>
        old?.map((r) => (r.id === updatedRequest.id ? updatedRequest : r)),
      );
    },
  });

  const handleDecision = (id: string, status: "Approved" | "Rejected") => {
    decisionMutation.mutate({ id, status });
  };

  const goBackToMenu = () => {
    history.push("/"); // adjust menu route if needed
  };

  if (isLoading) {
    return (
      <IonPage>
        <LoadingIndicator message="Loading requests..." />
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goBackToMenu}>Back</IonButton>
          </IonButtons>
          <IonTitle>Supervisor Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <RequestList requests={requests} onDecision={handleDecision} />
      </IonContent>
    </IonPage>
  );
};
