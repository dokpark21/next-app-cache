'use client';
// import { useActionState } from 'react';

export default function FormSubmit({ isPending }) {
  // const [isPending] = useActionState();

  if (isPending) {
    console.log('isPending:', isPending);
    return <p className="form-actions">Sending...</p>;
  }
  return (
    <p className="form-actions">
      <button type="reset">Reset</button>
      <button>Create post</button>
    </p>
  );
}
