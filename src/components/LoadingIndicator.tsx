// components/LoadingIndicator.tsx
import React from "react";
import styled from "styled-components";
import { IonSpinner, IonText } from "@ionic/react";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 9999;
`;

const Message = styled(IonText)`
  margin-top: 12px;
  font-size: 16px;
  color: #444;
`;

interface LoadingIndicatorProps {
  message?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
  message = "Loading...",
}) => {
  return (
    <Overlay>
      <IonSpinner name="crescent" />
      <Message>{message}</Message>
    </Overlay>
  );
};

export default LoadingIndicator;
