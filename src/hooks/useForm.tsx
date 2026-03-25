import { useState } from "react";

function useForm({ initialFormState, submitFn }: {
  initialFormState: Record<string, string>;
  submitFn: (formData: Record<string, string>) => void;
}) {
  const [formState, setFormState] = useState(initialFormState);

  function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
    const field_name = event.target.name;
    const field_value = event.target.value;
    setFormState((prevFormState) => {
      return {
        ...prevFormState,
        [field_name]: field_value,
      };
    });
  }

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitFn(formState);
  }

  return {
    handleChangeInput,
    onSubmit,
    formState,
  };
}

export default useForm;
