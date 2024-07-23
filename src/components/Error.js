import React from 'react';

const Error = ({ error }) => {
  if (!error) return null; // Handle the case where `error` is `null` or `undefined`

  return (
    <>
      {error.type === 'serverError' ? (
        <ServerError message={error.message} />
      ) : error.type === 'userError' ? (
        <UserError message={error.message} />
      ) : null}
    </>
  );
};

const ServerError = ({ message }) => {
  return (
    <div role="alert" className="alert alert-error sticky top-5 z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

const UserError = ({ message }) => {
  return (
    <div role="alert" className="alert alert-error mb-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 shrink-0 stroke-current"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{message}</span>
    </div>
  );
};

export default Error;
