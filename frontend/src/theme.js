import {createTheme} from '@mui/material/styles';
import {blue, lightBlue} from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary :{
            main: blue[500]
        },
        secondary :{
            main: lightBlue[800],
            midNightBlue: "#003346"
        }
    }
})

export default theme;