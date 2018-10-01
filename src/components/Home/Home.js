import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut } from '../../store/actionCreators';
import { HOW_IT_WORKS, MOTION_CREATE } from '../../constants/routes';

class Home extends Component {
    state = {
        motionCode: null
    };
    render() {
        const { motions, uid } = this.props;
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
                            {/*<Grid item>
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
                            </Grid>*/}
                        </Grid>
                    </Grid>
                    <Grid item>
                        <List>
                            {motions.length > 0 && motions.map((item) => {
                                const { key, displayName, uid: motionId, value } = item;
                                const text = uid === motionId ? 'DELETE' : 'JOIN';
                                const color = uid === motionId ? 'secondary' : 'primary';
                                return (
                                    <Fragment key={key +'f'}>
                                        <ListItem>
                                            <ListItemText onClick={this.handleSelect} data-uid={motionId}>
                                                <span>{`${displayName}: ${value}`}</span>
                                                <Button color={color}>{text}</Button>
                                            </ListItemText>
                                        </ListItem>
                                        <Divider/>
                                    </Fragment>
                                );
                            })}
                        </List>
                    </Grid>
                    <div>
                        or
                    </div>
                    <Button
                    variant="raised"
                    color="secondary"
                    component={Link}
                    to={MOTION_CREATE}
                    disabled={!uid}
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

    handleSelect = ({ target }) => {
        console.log(target.dataset.key);
    }

}

const MapStateToProps = ({
    motionReducer: {
        motions
    },
    authReducer: {
        uid, displayName
    }
}) => ({ motions, uid, displayName });
const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut }, dispatch);

export default connect(MapStateToProps, mapDispatchToProps)(Home);