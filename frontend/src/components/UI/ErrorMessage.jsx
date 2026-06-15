export const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-error-container text-on-error-container rounded-xl p-lg text-center">
      <span className="material-symbols-outlined text-4xl mb-2">error</span>
      <p className="font-body-md mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg font-label-md"
        >
          Try Again
        </button>
      )}
    </div>
  );
};