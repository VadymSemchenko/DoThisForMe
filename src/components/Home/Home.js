import React, { Component, Fragment } from 'react';
import { array, string } from 'prop-types';
import { IconButton, Button, Grid, Card, withStyles } from '@material-ui/core/';
import { PlayCircleFilled } from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';

import {attemptSignIn,
    attemptSignOut,
    removeMotion,
    joinMotion
} from '../../store/actionCreators';
import { OPERATOR_CREATE } from '../../constants/routes';
import MotionsList from '../MotionsList/MotionsList';

import styles from './styles';

class Home extends Component {

    state = {
        iFrameIsOpen: false
    }

    static propTypes = {
        motions: array.isRequired,
        userID: string.isRequired,
        userName: string.isRequired
    };

    render() {
        const { motions = [], userID, classes } = this.props;
        const { iFrameIsOpen } = this.state;
        const btnText = iFrameIsOpen ? 'CLOSE VIDEO' : 'HOW IT WORKS?';
        const btnColor = iFrameIsOpen ? 'secondary' : 'primary';
        return (
            <main className={classes.main}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    justify="space-between"
                    className={classes.mainContainer}
                >
                   {iFrameIsOpen && (
                       <Grid item>
                            <Card>
                                <iframe
                                    width="560"
                                    height="315"
                                    src="https://www.youtube.com/embed/MjJtGxG3zrc"
                                    frameBorder="0"
                                    allow="autoplay; encrypted-media"
                                    title="How It Works"
                                />
                            </Card>
                       </Grid>
                   )}
                    {!iFrameIsOpen && (
                    <Grid item container alignItems="center" justify="center" className={classes.playButtonContainer}>
                        <Grid item>
                            <IconButton
                                size="large"
                                children={<PlayCircleFilled color="primary" className={classes.playIcon} />}
                                onClick={this.toggleIFrame}
                                className={classes.playButton}
                            />
                        </Grid>
                    </Grid>)
                    }
                    <Grid item>
                        <Button
                            children={btnText}
                            variant="contained"
                            color={btnColor}
                            onClick={this.toggleIFrame}
                        />
                    </Grid>
                    <Grid item>
                        <MotionsList
                            handleClick={this.handleClick}
                            motions={motions}
                            userID={userID}
                            removeMotion={removeMotion}
                        />
                    </Grid>
                    {userID && (
                        <Fragment>
                            <Grid item>
                                <div>or</div>
                            </Grid>
                            <Grid item>
                                <Button
                                    children={'I mote!'}
                                    color='secondary'
                                    component={Link}
                                    to={OPERATOR_CREATE}
                                    variant='contained'
                                />
                            </Grid>
                        </Fragment>)
                    }
                </Grid>
            </main>
        );
    }

    toggleIFrame = () => {
        this.setState(({ iFrameIsOpen }) => ({ iFrameIsOpen: !iFrameIsOpen }))
    }

}

const mapStateToProps = ({
    motionReducer: {
        motions,
    },
    authReducer: {
        userID,
        userName,
    },
}) => ({ motions, userID, userName });

const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut, joinMotion }, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(Home);