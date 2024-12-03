import { Form, useNavigation, useActionData } from "@remix-run/react";
import { useEffect, useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";

export default function GuestUser({
  setModalOpen,
  setSigningInAsGuest,
}: {
  setModalOpen: (open: boolean) => void;
  setSigningInAsGuest: (guest: boolean) => void;
}) {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<{ error?: string }>();

  // Close modal and reset states on successful submission
  useEffect(() => {
    if (navigation.state === "idle" && actionData && !actionData.error) {
      setModalOpen(false);
      setSigningInAsGuest(false);
    }
  }, [navigation.state, actionData, setModalOpen, setSigningInAsGuest]);

  return (
    <div
      className="flex items-center justify-center flex-col w-96 h-60 rounded-md bg-primary-50"
      onClick={(e) => e.stopPropagation()}
    >
      {isSubmitting ? (
        <LoadingSpinner />
      ) : (
        <Form
          method="post"
          className="flex flex-col items-center justify-center space-y-3"
        >
          {actionData?.error && (
            <div className="text-red-500 text-sm font-medium">
              {actionData.error}
            </div>
          )}

          <input
            type="text"
            name="name"
            id="name"
            placeholder="UserName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent w-80 px-4 py-2 border border-neutral-600 rounded-md text-gray-700 placeholder-neutral-500 focus:outline-none focus:ring-0 font-poppins"
            required
            disabled={isSubmitting}
          />
          <button
            type="submit"
            className="w-fit py-2 px-3 rounded-md text-sm font-medium 
             text-white bg-secondary-500 disabled:bg-secondary-300 disabled:cursor-not-allowed"
            disabled={name.trim().length === 0 || isSubmitting}
          >
            Proceed
          </button>
        </Form>
      )}
    </div>
  );
}
