import { useState, useEffect } from "react";
import Joyride from "react-joyride";

const LeaderBoardTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    const hasSeenTour = localStorage.getItem("hasSeenLeaderBoardTour");
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const steps = [
    {
      target: "#step-11",
      content: "Edit your profile",
      disableBeacon: true,
    },
    {
      target: "#step-12",
      content: "Top contributors",
    },
  ];

  const handleTourCallback = (data) => {
    const { status } = data;
    if (["finished", "skipped"].includes(status)) {
      setRun(false); 
      localStorage.setItem("hasSeenLeaderBoardTour", "true"); 
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

export default LeaderBoardTour;
