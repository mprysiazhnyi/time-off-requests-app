import React, { ReactNode, useEffect } from "react";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";
import { LoginToggle } from "./pages/LoginToggle";
import { EmployeePage } from "./pages/EmployeePage";
import { SupervisorPage } from "./pages/SupervisorPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";

import { withRouter, RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {
  children: ReactNode;
}
// fixes aria-hidden warning
const RouteBlur: React.FC<Props> = ({ children, history }) => {
  useEffect(() => {
    const unlisten = history.listen(() => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    });
    return () => unlisten();
  }, [history]);

  return <>{children}</>;
};

const RouterBlur = withRouter(RouteBlur);

/* TS2786 React 18 + React Router v5 (deprecated) types incompatibility */

const App: React.FC = function () {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          {/* @ts-expect-error TS2786 */}
          <RouterBlur>
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
          </RouterBlur>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
