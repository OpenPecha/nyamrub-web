import {
  Form,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import LoadingSpinner from "./LoadingSpinner";
import LoginPortal from "./LoginPortal";
export default function LoginModal({ isModalOpen, setModalOpen }) {
  const { user, guestUser } = useLoaderData();
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting" || fetcher.state === "loading";

   const handleParticipant = async () => {
     fetcher.submit(null, {
       method: "post",
       action: "/api/participate",
     });
  };

  return (
    <div className="flex-1 hidden md:flex items-center justify-end ">
      {!user && (
        <div className="flex space-x-2">
          {!guestUser && (
              <button
                className={`inline-block py-1 px-2 md:py-2 md:px-4 rounded-md bg-secondary-400 text-sm text-white hover:text-primary-200"
                id="step-test-4 ${isSubmitting ? "cursor-not-allowed bg-transparent" : ""}`}
              disabled={isSubmitting}
              onClick={handleParticipant}
              >
                {isSubmitting ? (
                  <LoadingSpinner size={6}/>
                ) : (
                  <>
                    Participate <span className="hidden md:inline">now</span>
                  </>
                )}
              </button>
          )}
          <button
            className="relative inline-block py-1 px-2 md:py-2 md:px-4 rounded-md bg-secondary-400 text-sm text-white hover:text-primary-200"
            onClick={() => setModalOpen(true)}
            id="step-4"
          >
           Register/login
          </button>
        </div>
      )}

      {/* Modal Overlay */}
      <LoginPortal isModalOpen={isModalOpen} setModalOpen={setModalOpen}/>
    </div>
  );
}
