import React from "react";
import {StatComponent} from "../../components/StatComponent";
import SupervisorAccountIcon from "@mui/icons-material/Work";
import WorkIcon from "@mui/icons-material/Work";
import CategoryIcon from "@mui/icons-material/Category";
import {Chart} from 'react-google-charts';
import {data, options} from "./data/data";
import { Box, Stack, Typography } from "@mui/material";
import { ChartComponent } from "../../components/ChartComponent";


export const AdminDashboard = () => {
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
            value="45621"
            icon={
              <SupervisorAccountIcon sx={{ color: "#fafafa", fontSize: 30 }} />
            }
            description="Administrators"
            money=""
          />

          <StatComponent
            value="456" 
            icon={<WorkIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs"
            money=""
          />

          <StatComponent
            value="6548"
            icon={<CategoryIcon sx={{ color: "#fafafa", fontSize: 30 }} />}
            description="Jobs Categories"
            money=""
          />
        </Stack>

            <Stack direction={{xs:'column',sm:'row'}} sx={{mt:3}}
            spacing={{xs:1, sm:2,md:4}} >
              <ChartComponent>
              <Chart 
              chartType="Bar"
              data={data}
              options={{ ...options, version: 'current' }} // Ensure correct version is used
              width="100%"
              height="250px"
              legendToggle
            />
              </ChartComponent>
            </Stack>

      </Box>
    </>
  );
};

//npm install moment --legacy-peer-deps
