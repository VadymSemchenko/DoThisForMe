import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



import { HOW_IT_WORKS, MOTION_CREATE } from '../../constants/routes';

class Home extends Component {
    state = {
        motionCode: null
    };
    render() {
        return (
            <main>
                <Grid
                container
                direction="column"
                alignItems="center"
                >
                    <Grid item>
                        <IconButton
                        component={Link}
                        to={HOW_IT_WORKS}
                        >
                            <PlayCircleFilledIcon color="primary"/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Link
                        to={HOW_IT_WORKS}
                        >
                        How DoThis4Me Works?
                        </Link>
                    </Grid>
                    <Grid item>
                        <Grid
                        container
                        direction="row"
                        justify="center"
                        >
                            <Grid item>
                                <TextField
                                placeholder="Enter motion code"
                                variant="outlined"
                                onChange={this.handleChange}
                                name="motionCode"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                variant="contained"
                                color="primary"
                                onClick={this.handleJoin}
                                >
                                    Join!
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <div>
                        or
                    </div>
                    <Button
                    variant="raised"
                    color="secondary"
                    component={Link}
                    to={MOTION_CREATE}
                    >
                        I mote!
                    </Button>
                </Grid>
            </main>);
    }

    handleChange = ({ target: { name, value } }) => {
        this.setState(() => ({
            [name]: value
        }));
    };

    handleJoin = () => {
        console.log(this.state.motionCode);
    }

}

export default Home;
