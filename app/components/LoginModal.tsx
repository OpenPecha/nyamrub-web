import {
  Form,
  useActionData,
  useLoaderData,
  useLocation,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { useAuth0 } from "~/Hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";
import { FaUser } from "react-icons/fa";
export default function LoginModal({ isModalOpen, setModalOpen }) {

  const location = useLocation()
  const navigation = useNavigation();
  const isHomePage = location.pathname === "/";
  const isSubmitting = navigation.state === "submitting"
  const actionData = useActionData<{ success?: boolean; error?: string }>();
  const { auth, user, guestUser } = useLoaderData();
  const submit = useSubmit();

  const auth0Config = {
    domain: auth.domain,
    clientID: auth.clientId,
    redirectUri: auth.host + "/callback",
    responseType: "token id_token",
    scope: "email profile openid",
  };
  const { loginWithGoogle, loginWithApple } = useAuth0(auth0Config);

  // Close modal on successful guest login
  useEffect(() => {
    if (actionData?.success) {
      setModalOpen(false);
    }
  }, [actionData]);

  // Handle guest login submission
  const handleGuestLogin = (e) => {
    e.preventDefault();
    submit(e.currentTarget);
  };

  return (
    <div className="flex-1 flex items-center justify-end">
      {!user && (
        <div className="flex space-x-2">
          {isSubmitting ? (
            <div className="flex item-center justify-center">
              <LoadingSpinner size={6} />
            </div>
          ) : (
            !guestUser && (
              <Form
                method="post"
                onSubmit={handleGuestLogin}
                className="flex flex-col items-center justify-center space-y-3"
              >
                {actionData?.error && (
                  <div className="text-red-500 text-sm font-medium">
                    {actionData.error}
                  </div>
                )}

                <button className="relative inline-block py-1 px-2 md:py-2 md:px-4 rounded-md bg-secondary-400 text-sm text-white hover:text-primary-200">
                  Participate <span className="hidden md:inline">now</span>
                </button>
              </Form>
            )
          )}
          <button
            className="relative inline-block py-1 px-2 md:py-2 md:px-4 rounded-md bg-secondary-400 text-sm text-white hover:text-primary-200"
            onClick={() => setModalOpen(true)}
          >
            {guestUser ? <FaUser /> : "Register/login"}
            {/* following it login indicator currently not in use */}
          </button>
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-96 py-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-primary-950">
              Sign In to Nyamrub
            </h2>
            <p className="text-primary-950 text-sm font-medium mt-1">
              Welcome back! Please sign in to continue
            </p>
            <div className="border-b border-neutral-900 mt-5"></div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-center space-x-5 mt-5">
                <button
                  className="bg-primary-100 py-3 px-4 rounded-md hover:bg-primary-200"
                  onClick={loginWithGoogle}
                >
                  <FcGoogle size={30} />
                </button>
                <button
                  className="bg-primary-100 p-3 rounded-md hover:bg-primary-200"
                  onClick={loginWithApple}
                >
                  <IoLogoApple size={30} color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
