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
    queryKey: ["timeOffRequests"], // this replaces the array shorthand
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
          <IonTitle>Employee Portal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <TimeOffForm onSubmit={addRequest} />
        <br />
        <RequestList requests={requests} />
      </IonContent>
    </IonPage>
  );
};
