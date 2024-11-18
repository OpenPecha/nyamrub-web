export default function LoadingSpinner() {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary-700 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    );
}
