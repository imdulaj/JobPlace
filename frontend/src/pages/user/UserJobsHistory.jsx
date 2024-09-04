import React from 'react';
import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import CardElement from '../../components/CardElement';

export const UserJobsHistory = () => {
    const { user } = useSelector(state => state.userProfile);

    // Ensure user and user.jobsHistory are defined and handle cases where they are not
    const jobsHistory = user && user.jobsHistory ? user.jobsHistory : [];

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" sx={{ color: "#fafafa", mb: 2 }}>
                Jobs History
            </Typography>

            <Box>
                {jobsHistory.length > 0 ? (
                    jobsHistory.map((history, i) => (
                        <CardElement
                            key={i}
                            id={history._id}
                            jobTitle={history.title}
                            description={history.description}
                            category=''
                            location={history.location}
                        />
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: "#fafafa" }}>
                        No job history available.
                    </Typography>
                )}
            </Box>
        </Box>
    );
};
