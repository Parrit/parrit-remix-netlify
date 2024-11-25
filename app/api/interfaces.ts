export interface FormErrors<T> {
  server?: string;
  fields?: Record<keyof T, string | null>;
  status: 400 | 401 | 500;
}

export const isFormErrors = <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  arg: FormErrors<T> | any
): arg is FormErrors<T> => {
  return (arg as FormErrors<T>).status > 0;
};
