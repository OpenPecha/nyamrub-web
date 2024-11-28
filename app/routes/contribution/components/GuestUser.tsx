import { Form, useNavigation, useActionData } from "@remix-run/react";
import { useState } from "react";
import LoadingSpinner from "~/components/LoadingSpinner";

export default function GuestUser() {
  const [name, setName] = useState("");
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const actionData = useActionData<{ error?: string }>();

  return (
    <div className="flex items-center justify-center flex-col h-3/4 w-full bg-primary-50">
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
              <div>Sorry for inconvenience</div>
            </div>
          )}

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent w-80 px-4 py-2 border border-neutral-600 rounded-md text-gray-700 placeholder-neutral-500 focus:outline-none focus:ring-0 font-poppins"
            required
            disabled={actionData?.error}
          />
          <button
            type="submit"
            className="w-fit py-2 px-3 rounded-md text-sm font-medium 
             text-white bg-secondary-500 disabled:bg-secondary-300 disabled:cursor-not-allowed"
            disabled={name.trim().length === 0 || actionData?.error}
          >
            Proceed
          </button>
        </Form>
      )}
    </div>
  );
}
