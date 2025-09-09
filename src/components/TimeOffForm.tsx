import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  useIonToast,
} from "@ionic/react";
import { TimeOffRequest } from "../api/timeOffApi";
import FieldError from "./FieldError";

interface Props {
  onSubmit: (request: TimeOffRequest) => void;
}

interface FormValues {
  startDate: string;
  endDate: string;
  type: "Vacation" | "Sick" | "Personal";
  notes: string;
}

const TimeOffForm: React.FC<Props> = ({ onSubmit }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      startDate: "",
      endDate: "",
      type: "Vacation",
      notes: "",
    },
  });

  const [present] = useIonToast();

  const onFormSubmit = (data: FormValues) => {
    const newRequest: TimeOffRequest = {
      id: Date.now().toString(),
      ...data,
      status: "Pending",
    };
    onSubmit(newRequest);
    reset();

    present({
      message: "Request submitted successfully!",
      duration: 2000,
      color: "success",
      position: "bottom",
    });
  };

  const onError = () => {
    present({
      message: "Please fix the validation errors before submitting.",
      duration: 2000,
      color: "danger",
      position: "bottom",
    });
  };

  const startDateValue = watch("startDate");

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit, onError)}
      aria-label="Time off request form"
    >
      {/* Start Date */}
      <IonItem>
        <IonLabel position="stacked">Start Date</IonLabel>
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <IonInput
              data-testid="start-date-input"
              type="date"
              value={field.value}
              onIonChange={field.onChange}
              aria-required="true"
              aria-invalid={!!errors.startDate}
            />
          )}
        />
      </IonItem>
      <FieldError message={errors.startDate?.message} />

      {/* End Date */}
      <IonItem>
        <IonLabel position="stacked">End Date</IonLabel>
        <Controller
          control={control}
          name="endDate"
          rules={{
            required: "End date is required",
            validate: (value) =>
              !startDateValue ||
              value >= startDateValue ||
              "End date cannot be before start date",
          }}
          render={({ field }) => (
            <IonInput
              data-testid="end-date-input"
              type="date"
              value={field.value}
              onIonChange={field.onChange}
              aria-required="true"
              aria-invalid={!!errors.endDate}
            />
          )}
        />
      </IonItem>
      <FieldError message={errors.endDate?.message} />

      {/* Type */}
      <IonItem>
        <IonLabel position="stacked">Type</IonLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <IonSelect
              data-testid="type-select"
              value={field.value}
              onIonChange={field.onChange}
              aria-label="Select request type"
            >
              <IonSelectOption value="Vacation">Vacation</IonSelectOption>
              <IonSelectOption value="Sick">Sick</IonSelectOption>
              <IonSelectOption value="Personal">Personal</IonSelectOption>
            </IonSelect>
          )}
        />
      </IonItem>

      {/* Notes */}
      <IonItem>
        <IonLabel position="stacked">Notes</IonLabel>
        <Controller
          control={control}
          name="notes"
          rules={{
            maxLength: {
              value: 500,
              message: "Notes cannot exceed 500 characters",
            },
          }}
          render={({ field }) => (
            <IonTextarea
              data-testid="notes-textarea"
              value={field.value}
              onIonInput={field.onChange}
              aria-invalid={!!errors.notes}
              aria-describedby={errors.notes ? "notes-error" : undefined}
            />
          )}
        />
      </IonItem>
      <FieldError message={errors.notes?.message} />

      <IonButton
        data-testid="submit-request-button"
        expand="block"
        type="submit"
        aria-label="Submit time off request"
      >
        Submit Request
      </IonButton>
    </form>
  );
};

export default TimeOffForm;
