import React from "react";
import {
  IonContent,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import TimeOffForm from "../components/TimeOffForm";
import RequestList from "../components/RequestList";
import { timeOffApi, TimeOffRequest } from "../api/timeOffApi";
import LoadingIndicator from "../components/LoadingIndicator";

interface EmployeePageProps extends RouteComponentProps {}

export const EmployeePage: React.FC<EmployeePageProps> = ({ history }) => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery<TimeOffRequest[], Error>({
    queryKey: ["timeOffRequests"],
    queryFn: timeOffApi.getRequests,
  });

  const addRequestMutation = useMutation<TimeOffRequest, Error, TimeOffRequest>(
    {
      mutationFn: timeOffApi.addRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["timeOffRequests"] });
      },
    },
  );

  const addRequest = (req: TimeOffRequest) => {
    addRequestMutation.mutate(req);
  };

  const goBackToMenu = () => {
    history.push("/");
  };

  if (isLoading) {
    return (
      <IonPage data-testid="employee-page-loading">
        <LoadingIndicator message="Loading requests..." />
      </IonPage>
    );
  }

  return (
    <IonPage data-testid="employee-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={goBackToMenu} data-testid="back-button">
              Back
            </IonButton>
          </IonButtons>
          <IonTitle data-testid="employee-page-title">Employee Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" data-testid="employee-page-content">
        <TimeOffForm onSubmit={addRequest} data-testid="timeoff-form" />
        <br />
        <RequestList requests={requests} data-testid="request-list" />
      </IonContent>
    </IonPage>
  );
};
