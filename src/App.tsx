import React from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { LoginToggle } from "./pages/LoginToggle";
import { EmployeePage } from "./pages/EmployeePage";
import { SupervisorPage } from "./pages/SupervisorPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

// @ts-ignore
const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {/* @ts-expect-error TS2786 */}
          <Route
            path="/home"
            render={(props: any) => <LoginToggle {...props} />}
            exact
          />
          {/* @ts-expect-error TS2786 */}
          <Route
            path="/employee"
            render={(props) => <EmployeePage {...props} />}
            exact
          />
          {/* @ts-expect-error TS2786 */}
          <Route
            path="/supervisor"
            render={(props) => <SupervisorPage {...props} />}
            exact
          />
          {/* @ts-expect-error TS2786 */}
          <Route exact path="/" render={() => <Redirect to="/home" />} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </QueryClientProvider>
);

export default App;
