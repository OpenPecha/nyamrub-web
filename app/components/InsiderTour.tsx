import { useState, useEffect } from "react";
import Joyride from "react-joyride";

const InsiderTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenInsiderTour");
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: "#step-5",
      content: "Click here to contribute",
    },
    {
      target: "#step-6",
      content: "Click here to contribute translation",
    },
    {
      target: "#step-7",
      content: "Click here to skip",
    },
    {
      target: "#step-8",
      content: "Click here to contribute your translation",
    },
    {
      target: "#step-9",
      content: "Click here to contribute image text",
    },
    {
      target: "#step-10",
      content: "Click here to see leaderboard",
    },
  ];

  const handleTourCallback = (data) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      setRun(false); // Stop the tour
      localStorage.setItem("hasSeenInsiderTour", "true"); // Save completion state in localStorage
    }
  };

  return (
    <Joyride
      steps={steps}
      run={run}
      callback={handleTourCallback}
      continuous
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

export default InsiderTour;
