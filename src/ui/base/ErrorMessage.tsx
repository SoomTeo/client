export const ErrorMessage = ({ error }: { error: null | string }) => {
  return (
    error && (
      <div className="mb-5 rounded bg-red-950 px-2 py-1 text-red-500">
        {error}
      </div>
    )
  );
};
