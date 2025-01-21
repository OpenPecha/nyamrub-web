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
      content: "Contribute your content here.",
      disableBeacon: true,
    },
    {
      target: "#step-6",
      content: "Validate contributions from others.",
    },
    {
      target: "#step-7",
      content: "Add a translation here.",
    },
    {
      target: "#step-8",
      content: "Skip this step if needed.",
    },
    {
      target: "#step-9",
      content: "Submit your translation here.",
    },
    {
      target: "#speak",
      content: "Upload your audio contribution.",
    },
    {
      target: "#listen",
      content: "Review or listen to contributed text.",
    },
    {
      target: "#OCR",
      content: "Submit text extracted from images.",
    },
    {
      target: "#step-10",
      content: "View the leaderboard here.",
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
