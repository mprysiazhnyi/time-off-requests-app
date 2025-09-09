import React from "react";
import { IonText } from "@ionic/react";

interface FieldErrorProps {
  message?: string;
}

const FieldError: React.FC<FieldErrorProps> = ({ message }) => {
  if (!message) return null;

  return (
    <IonText color="danger">
      <p
        style={{ margin: "5px 0 10px 15px" }}
        data-testid="field-error-message"
      >
        {message}
      </p>
    </IonText>
  );
};

export default FieldError;
