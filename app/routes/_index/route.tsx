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

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
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
