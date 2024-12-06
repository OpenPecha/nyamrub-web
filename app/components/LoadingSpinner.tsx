export default function LoadingSpinner({size=8}) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className={`w-${size} h-${size} border-4 border-secondary-500 border-t-transparent border-solid rounded-full animate-spin`}></div>
      </div>
    );
}
