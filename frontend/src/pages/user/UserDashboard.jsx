import React from "react";
import { Stack } from "@mui/system";
import { Typography, Box } from "@mui/material";
import { StatComponent } from "../../components/StatComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import { useSelector } from "react-redux";

const UserDashboard = () => {
  const { user } = useSelector(state => state.userProfile);
  console.log(user);

  return (
    <>
      <Box>
        <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
          Dashboard
        </Typography>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
        >
          <StatComponent
            value={user && user.createdAt}
            icon={<CalendarMonthIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Member since"
            money=""
          />

          <StatComponent
            value={user?.jobsHistory?.length || 0} // Use 0 as a fallback value
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Member of jobs submitted"
            money=""
          />
        </Stack>
      </Box>
    </>
  );
};

export default UserDashboard;
