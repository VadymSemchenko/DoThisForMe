import React, { Component, Fragment } from 'react';
import { array, string } from 'prop-types';
import { IconButton, Button, Grid, Card } from '@material-ui/core/';
import { PlayCircleFilled } from '@material-ui/icons/';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {attemptSignIn,
    attemptSignOut,
    removeMotion,
    joinMotion
} from '../../store/actionCreators';
import { OPERATOR_CREATE } from '../../constants/routes';
import MotionsList from '../MotionsList/MotionsList';

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
        const { motions = [], userID } = this.props;
        const { iFrameIsOpen } = this.state;
        const btnText = iFrameIsOpen ? 'CLOSE VIDEO' : 'HOW IT WORKS?';
        const btnColor = iFrameIsOpen ? 'secondary' : 'primary';
        return (
            <main>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                   {iFrameIsOpen &&
                   <Card>
                        <iframe
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/MjJtGxG3zrc"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            title="How It Works"
                        />
                    </Card>}
                    {!iFrameIsOpen &&
                    <Grid item={true}>
                        <IconButton
                            children={<PlayCircleFilled color="primary" />}
                            onClick={this.toggleIFrame}
                        />
                    </Grid>}
                    <Grid item={true}>
                        <Button
                            children={btnText}
                            variant="contained"
                            color={btnColor}
                            onClick={this.toggleIFrame}
                        />
                    </Grid>
                    <Grid item={true}>
                        <Grid
                            container={true}
                            direction="row"
                            justify="center"
                        />
                    </Grid>
                    <Grid item={true}>
                        <MotionsList
                            handleClick={this.handleClick}
                            motions={motions}
                            userID={userID}
                            removeMotion={removeMotion}
                        />
                    </Grid>
                    {userID &&
                        <Fragment>
                            <div>or</div>
                            <Button
                                children={'I mote!'}
                                color='secondary'
                                component={Link}
                                to={OPERATOR_CREATE}
                            />
                        </Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);