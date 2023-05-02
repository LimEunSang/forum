"use client";

export default function Error({ error, reset }) {
  return (
    <>
      <h4>error..!!</h4>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
    </>
  );
}
