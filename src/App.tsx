import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { LoginToggle } from "./pages/LoginToggle";
import { EmployeePage } from "./pages/EmployeePage";
import { SupervisorPage } from "./pages/SupervisorPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/home"
            render={(props) => <LoginToggle {...props} />}
            exact
          />
          <Route
            path="/employee"
            render={(props) => <EmployeePage {...props} />}
            exact
          />
          <Route
            path="/supervisor"
            render={(props) => <SupervisorPage {...props} />}
            exact
          />
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </QueryClientProvider>
);

export default App;
