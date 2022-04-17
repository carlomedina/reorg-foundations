import React, { useCallback } from 'react';

const useFormInputChange = (form, setForm) => {
  return useCallback(
    (event) => {
      const target = event.target;
      const value = target.type == 'checkbox' ? target.checked : target.value;
      const name = target.name;
      setForm({ ...form, [name]: value });
    },
    [form, setForm]
  );
};

export default useFormInputChange;
