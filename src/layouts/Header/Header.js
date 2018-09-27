import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const Header = ( props ) => (
  <AppBar position="static" color="default">
    <Typography variant='display4' align='center' gutterBottom>
        Do This For Me
      </Typography>
  </AppBar>
);

export default Header;