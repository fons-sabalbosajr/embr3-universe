import React, { useEffect } from "react";

const Dashboard = ({ refreshKey }) => {
  useEffect(() => {
    // Add your refresh logic here
    console.log("Dashboard refreshed!");
  }, [refreshKey]);

  return (
    <div>
      Dashboard
    </div>
  );
};

export default Dashboard;