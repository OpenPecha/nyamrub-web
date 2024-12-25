import { useLoaderData } from '@remix-run/react';
import { IoWarningOutline } from "react-icons/io5";
import { FcGoogle } from 'react-icons/fc'
import { IoLogoApple } from 'react-icons/io5'
import { useAuth0 } from "~/Hooks/useAuth";

export default function LoginPopup({isModalOpen, setModalOpen}) {
    const {currentUser,auth} = useLoaderData();
    const auth0Config = {
      domain: auth.domain,
      clientID: auth.clientId,
      redirectUri: auth.host + "/callback",
      responseType: "token id_token",
      scope: "email profile openid",
    };
  const { loginWithGoogle, loginWithApple } = useAuth0(auth0Config);

    return (
      <div
        className={`${
          !isModalOpen && "hidden"
        } fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50`}
        onClick={() => setModalOpen(false)}
      >
        <div
          className="bg-white rounded-lg shadow-lg w-96 py-6 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-lg font-semibold text-primary-950">
            Access Denied to Leaderboard
          </div>

          <div className="border-b border-neutral-900 mt-2"></div>
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
          <p className="text-neutral-500 text-xs font-medium mt-1">
            It looks like you're not signed in, so you can’t track your
            contributions on our leaderboard just yet.
          </p>
        </div>
      </div>
    );
}
