export interface GreetingsFormMethods {
  submit(): void;
}

export interface GreetingsFormValues {
  isAgree: boolean;
  nickName: string;
}

export interface GreetingsFormProps {
  initialValues: GreetingsFormValues;
  onReset?(): void;
  onSubmit?(values: GreetingsFormValues): void;
}
