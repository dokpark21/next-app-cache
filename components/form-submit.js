'use client';
import { useActionState } from 'react';

export default function FormSubmit() {
  const { status } = useActionState();

  if (status === 'pending') {
    return <p className="form-actions">Sending...</p>;
  }
  return (
    <p className="form-actions">
      <button type="reset">Reset</button>
      <button>Create post</button>
    </p>
  );
}
