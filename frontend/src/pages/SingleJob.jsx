import React, { useEffect } from 'react';
import {Button, Card, CardContent, Stack, Typography } from '@mui/material';
import {Box , Container} from '@mui/system';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import LoadingBox from '../components/LoadingBox';
import {jobLoadSingleAction} from '../redux/actions/jobAction';
import { userApplyJobAction } from '../redux/actions/userAction';

 
export const SingleJob = () => {
    const dispatch = useDispatch();
    const {singleJob, loading} = useSelector(state => state.singleJob)
    const {id} = useParams();

    useEffect(()=>{
        dispatch(jobLoadSingleAction(id));

    },[id])

    const applyForAJob = () => {
        dispatch(userApplyJobAction({
            title: singleJob && singleJob.title,
            description: singleJob && singleJob.description,
            salary: singleJob && singleJob.salary,
            location: singleJob && singleJob.location

        }))
    }

  return (
    <Box sx={{bgcolor:"#fafafa"}}>
        <NavBar />
        <Box sx={{height:'85vh'}}>
            <Container sx={{pt:'30px'}}>
                <Stack
                direction={{xs:'column', sm:'row'}}
                spacing={{xs:1, sm:2, md:4}}
                >
                    <Box sx={{flex:4,p:2}}>
                        {
                            loading ? <LoadingBox /> :
                            <Card>
                                <CardContent>
                                    <Typography variant='h5' component="h3">
                                        {singleJob && singleJob.title} 

                                    </Typography>
                                    <Typography variant='body2'>
                                        Salary:
                                        <Box component='span' sx={{fontWeight:700}}>{singleJob && singleJob.salary}</Box>
                                    </Typography>
                                    <Typography variant='body2'>
                                        Location:
                                        <Box component='span' sx={{fontWeight:700}}>{singleJob && singleJob.location}</Box>
                                    </Typography>
                                    <Typography variant='body2'>
                                        Cayegory:
                                        <Box component='span' sx={{fontWeight:700}}>{singleJob && singleJob.category}</Box>
                                    </Typography>
                                    <Typography variant='body2' sx={{pt:2}}>
                                        {singleJob && singleJob.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        }

                    </Box>
                    <Box sx={{flex: 1, p:2}}>
                        <Card sx={{p:2}}>
                            <Button onClick={applyForAJob} sx={{fontSize:"12px"}} variant='contained'>Applied for this Job</Button>

                        </Card>
                    </Box>

                </Stack>

            </Container>

        </Box>
        <Footer />
    </Box>
    
  )
}
