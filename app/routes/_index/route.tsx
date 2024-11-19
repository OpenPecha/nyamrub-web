import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import { LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";
import IntroSection from "./components/IntroSection";
import Content from "./components/Content";
import Nyamrup from "./components/NyamrupBg";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.hostname;
  const isLocal = domain === "localhost";
  const auth = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    host: isLocal ? "http://" + domain + ":3000" : "https://" + domain,
  };
  const user = await getUserSession(request);
  return { auth, user };
};

export default function Index() {
  return (
    <div className="bg-primary-50 mx-auto">
      <Nyamrup />
      <IntroSection />
      <Content />
      <ContactUs />
      <Footer />
    </div>
  );
}
