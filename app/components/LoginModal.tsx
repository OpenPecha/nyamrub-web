import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { IoLogoApple } from "react-icons/io5";
import { useAuth0 } from "~/Hooks/useAuth";
import GuestUser from "~/components/GuestUser";

export default function LoginModal() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [signingInAsGueset, setSigningInAsGuest] = useState(false);
  const { auth, user } = useLoaderData();
  const auth0Config = {
    domain: auth.domain,
    clientID: auth.clientId,
    redirectUri: auth.host + "/callback",
    responseType: "token id_token",
    scope: "email profile openid",
  };
  const { loginWithGoogle, loginWithApple } = useAuth0(auth0Config);
  return (
    <div className="flex-1 flex items-center justify-end">
      {!user && (
        <button
          className="inline-block py-2 px-4 rounded-md bg-secondary-400 text-sm text-white  hover:text-primary-200"
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
          {!signingInAsGueset ? (
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
                <div className="flex justify-center space-x-5 mt-10">
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
                <p className="text-primary-950 text-sm font-medium">Or</p>
                <p
                  className="underline cursor-pointer text-sm"
                  onClick={() => setSigningInAsGuest(true)}
                >
                  Sign as a guest
                </p>
              </div>
            </div>
          ) : (
            <GuestUser
              setModalOpen={setModalOpen}
              setSigningInAsGuest={setSigningInAsGuest}
            />
          )}
        </div>
      )}
    </div>
  );
}
