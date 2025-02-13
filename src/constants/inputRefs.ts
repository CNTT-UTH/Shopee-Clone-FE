import { useRef } from 'react';

const useInputRefs = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  return {
    emailRef,
    usernameRef,
    passwordRef,
    confirmPasswordRef,
  };
};

export default useInputRefs;
