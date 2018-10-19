import { createMuiTheme } from '@material-ui/core/styles';
import {
    lightBlue,
    red
} from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: lightBlue[500]
      },
      secondary: {
        main: red[500]
      }
    },
  });

  export default theme;