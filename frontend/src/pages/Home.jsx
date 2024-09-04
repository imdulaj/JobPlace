import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Header from "../components/Header";
import {
  Box,
  Card,
  Container,
  ListItem,
  MenuItem,
  MenuList,
  Pagination,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@emotion/react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { jobLoadAction } from "../redux/actions/jobAction";
import CardElement from "../components/CardElement";
import Footer from "../components/Footer";
import SelectComponent from "../components/SelectComponent";
import { jobTypeLoadAction } from "../redux/actions/jobTypeAction";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function Home() {
  const { jobs, pages, loading, error, setUniqueLocation } = useSelector(
    (state) => state.loadJobs
  );
  const { palette } = useTheme();
  const dispatch = useDispatch();
  const { keyword, location } = useParams();

  const [page, setPage] = useState(1);
  const [cat, setCat] = useState("");

  useEffect(() => {
    dispatch(jobLoadAction(page, keyword, cat, location));
  }, [dispatch, page, keyword, cat, location]);

  useEffect(() => {
    dispatch(jobTypeLoadAction());
  }, []);

  const handleChangeCategory = (e) => {
    setCat(e.target.value);
  };

  return (
    <>
      <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
        <NavBar />
        <Header />
        <Container>
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <Box sx={{ flex: 2, p: 2 }}>
              <Card sx={{ minHeight: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter job by category
                  </Typography>
                </Box>
                <SelectComponent
                  handleChangeCategory={handleChangeCategory}
                  cat={cat}
                />
              </Card>

              <Card sx={{ minHeight: 150, mb: 3, mt: 3, p: 2 }}>
                <Box sx={{ pb: 2 }}>
                  <Typography
                    component="h4"
                    sx={{ color: palette.secondary.main, fontWeight: 600 }}
                  >
                    Filter job by location
                  </Typography>

                  <MenuList>
                    {setUniqueLocation &&
                      setUniqueLocation.map((location, i) => (
                        <MenuItem key={i}>
                          <ListItem>
                            <LocationOnIcon
                              sx={{
                                color: palette.secondary.main,
                                fontSize: 18,
                              }}
                            />
                          </ListItem>
                          <Link
                            style={{
                              textDecoration: "none",
                              color: palette.secondary.main,
                            }}
                            to={`/search/location/${location}`}
                          >
                            {location}
                          </Link>
                        </MenuItem>
                      ))}
                  </MenuList>
                </Box>
              </Card>
            </Box>
            <Box sx={{ flex: 5, p: 2 }}>
              {loading ? (
                <Typography>Loading jobs...</Typography>
              ) : error ? (
                <Typography color="error">Error: {error}</Typography>
              ) : jobs && jobs.length > 0 ? (
                jobs.map((job, i) => (
                  <CardElement
                    key={i}
                    id={job._id}
                    jobTitle={job.title}
                    description={job.description}
                    category={
                      job.jobtype ? job.jobtype.jobtypeName : "No category"
                    }
                    location={job.location}
                  />
                ))
              ) : (
                <Typography>No jobs found.</Typography>
              )}
              <Stack spacing={2}>
                <Pagination
                  page={page}
                  count={pages === 0 ? 1 : pages}
                  onChange={(event, value) => setPage(value)}
                />
              </Stack>
            </Box>
          </Stack>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

// import React, { useEffect, useState } from "react";
// import NavBar from "../components/NavBar";
// import Header from "../components/Header";
// import { Box, Card, Container, Stack, Typography } from "@mui/material";
// import { useTheme } from "@emotion/react";
// import { useDispatch, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { jobLoadAction } from "../redux/actions/jobAction";
// import CardElement from "../components/CardElement";

// export default function Home() {
//   const { jobs, setUniqueLocation, pages, loading } = useSelector(
//     state => state.loadJobs
//   );
//   const { palette } = useTheme();
//   const dispatch = useDispatch();
//   const { keyword, location } = useParams();

//   const [page, setPage] = useState(1);
//   const [cat, setCat] = useState("");

//   useEffect(() => {
//     dispatch(jobLoadAction(page, keyword, cat, location));
//   }, [dispatch,page, keyword, cat, location]);

//   return (
//     <>
//       <Box sx={{ bgcolor: "#fafafa", minHeight: "100vh" }}>
//         <NavBar />
//         <Header />

//         <Container>
//           <Stack
//             direction={{ xs: "column", sm: "row" }}
//             spacing={{ xs: 1, sm: 2, md: 4 }}
//           >
//             <Box sx={{ flex: 2, p: 2 }}>
//               <Card sx={{ minHeight: 150, mb: 3, mt: 3, p: 2 }}>
//                 <Box sx={{ pb: 2 }}>
//                   <Typography
//                     component="h4"
//                     sx={{ color: palette.secondary.main, fontWeight: 600 }}
//                   >
//                     Filter job by category
//                   </Typography>
//                 </Box>
//               </Card>
//             </Box>
//             <Box sx={{ flex: 5, p: 2 }}>
//               {jobs &&
//                 jobs.map((job,i) => (
//                   <CardElement

//                   key={i}
//                   id={job._id}
//                   jobTitle={job.title}
//                   description={job.description}
//                   category={job.jobType ? job.jobtype.jobtypeName : "No category"}
//                   location={job.location}

//                   />
//                 ))}
//             </Box>
//           </Stack>
//         </Container>
//       </Box>
//     </>
//   );
// }
