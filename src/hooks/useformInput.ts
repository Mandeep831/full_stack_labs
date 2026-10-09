import { useState } from 'react';

function useFormInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  const [message, setMessage] = useState('');

  function validate(
    validationFunction: (value: string) => string | null
  ): string | null {
    const result = validationFunction(value);

    setMessage(result ?? '');

    return result;
  }

  return {
    value,
    setValue,
    message,
    validate,
  };
}

export default useFormInput;