import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth0 } from "~/Hooks/useAuth";

export default function LoginModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { auth, user } = useLoaderData();
  console.log(auth)
  const auth0Config = {
    domain: auth.domain,
    clientID: auth.clientId,
    redirectUri: auth.host + "/callback",
    responseType: "token id_token",
    scope: "email profile openid",
  };
  const { loginWithGoogle } = useAuth0(auth0Config);
  return (
    <div className="flex-1 flex items-center justify-end">
      {!user && (
        <button
          className="inline-block py-2 px-4 rounded-md border border-neutral-900 text-sm text- font-medium hover:text-primary-200"
          onClick={() => setModalOpen(true)}
        >
          Register/login
        </button>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setModalOpen(false)}
        >
          {/* Modal Content */}
          <div
            className="bg-white rounded-lg shadow-lg w-96 py-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/assets/logo.png"
              alt="Monlam AI Logo"
              className="w-12 mx-auto mb-4"
            />

            <h2 className="text-xl font-semibold text-primary-950">
              Sign In to Monlam AI
            </h2>
            <p className="text-primary-950 text-sm font-medium mt-1">
              Welcome back! Please sign in to continue
            </p>
            <div className="border-b border-neutral-900 my-10"></div>
            <div className="flex justify-around my-10">
              {/* <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">
                <img
                  src="/path/to/github-icon.png"
                  alt="GitHub"
                  className="w-6 h-6"
                />
              </button> */}
              <button
                className="bg-primary-100 py-3 px-4 rounded-md hover:bg-primary-200"
                onClick={loginWithGoogle}
              >
                <FcGoogle size={30} />
              </button>
              {/*<button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200">
                <img
                  src="/path/to/facebook-icon.png"
                  alt="Facebook"
                  className="w-6 h-6"
                />
              </button> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
