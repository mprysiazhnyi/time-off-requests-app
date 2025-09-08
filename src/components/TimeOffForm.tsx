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
  IonText,
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
  console.log(errors);
  const onFormSubmit = (data: FormValues) => {
    const newRequest: TimeOffRequest = {
      id: Date.now().toString(),
      ...data,
      status: "Pending",
    };
    console.log("valid");
    onSubmit(newRequest);
    reset();
  };

  const startDateValue = watch("startDate");

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      {/* Start Date */}
      <IonItem>
        <IonLabel position="stacked">Start Date</IonLabel>
        <Controller
          control={control}
          name="startDate"
          rules={{ required: "Start date is required" }}
          render={({ field }) => (
            <IonInput type="date" {...field} onIonChange={field.onChange} />
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
            <IonInput type="date" {...field} onIonChange={field.onChange} />
          )}
        />
      </IonItem>

      <FieldError message={errors.endDate?.message} />

      {/* Type */}
      <IonItem>
        <IonLabel>Type</IonLabel>
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <IonSelect {...field}>
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
          render={({ field }) => <IonTextarea {...field} />}
        />
      </IonItem>

      <FieldError message={errors.notes?.message} />

      <IonButton expand="block" type="submit">
        Submit Request
      </IonButton>
    </form>
  );
};

export default TimeOffForm;
