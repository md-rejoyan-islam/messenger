import { useState } from "react";

export default function useFormFields(initialState) {
  const [inputs, setInputs] = useState(initialState);

  // handle input change
  const handleInputChange = (event) => {
    // event.persist();
    setInputs((inputs) => ({
      ...inputs,
      [event.target.name]: event.target.value,
    }));
  };

  // form reset
  const resetForm = () => {
    setInputs(initialState);
  };

  return { inputs, handleInputChange, resetForm, setInputs };
}
