import { data } from "@remix-run/react";
import { useState, useEffect } from "react";
import Joyride from "react-joyride";

const HomeTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if the user has completed the tour or if it was interrupted
    const hasSeenTour = localStorage.getItem("hasSeenHomeTour");
    if (!hasSeenTour) {
      setRun(true); // Start or continue the tour
    }
  }, []);

  const steps = [
    {
      target: "#step-1",
      content: "Welcome to the guided tour!",
      disableBeacon: true,
    },
    {
      target: "#step-2",
      content: "Scroll down to see more.",
    },
    {
      target: "#step-3",
      content: "Know more about the nyamrub.",
    },
    { target: "#step-4", content: "Click here to register/login." },
    {
      target: "#step-test-4",
      content: "Click here to contribute without login.",
    },
  ];

  const handleTourCallback = (data) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      setRun(false);
      localStorage.setItem("hasSeenHomeTour", "true"); // Mark as completed
    } 
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleTourCallback}
      continuous={true}
      disableOverlayClose
      showSkipButton
      showProgress
      styles={{
        options: {
          primaryColor: "#5e72e4",
          zIndex: 1000,
        },
      }}
    />
  );
};

export default HomeTour;
