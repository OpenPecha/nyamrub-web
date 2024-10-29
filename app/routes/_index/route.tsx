import type { MetaFunction } from "@remix-run/node";
import React from "react";
import Header from "~/routes/_index/components/Header";
import Hero from "~/routes/_index/components/Hero";
import Quotation from "./components/Quotation";
import CardList from "./components/Cards";
import About from "./components/About";
import Footer from "./components/Footer";
import ContactUs from "./components/ContactUs";
import ParticipationStat from "./components/PartisipantStat";
import Tabs from "./components/Tabs";
import { LoaderFunction } from "@remix-run/node";
import { getUserSession } from "~/services/session.server";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const domain = url.hostname;
  const isLocal = domain === "localhost";
  const auth = {
    domain: process.env.AUTH0_DOMAIN,
    clientId: process.env.AUTH0_CLIENT_ID,
    host: isLocal ? "http://" + domain + ":3000" : "https://" + domain,
  };
  const user= await getUserSession(request);
  return {auth,user};
};

export default function Index() {
  return (
    <div className="bg-white">
      <Header />
      <Hero />
      <Quotation />
      <CardList />
      <About />
      <ParticipationStat />
      <Tabs />
      <ContactUs />
      <Footer />
    </div>
  );
}
