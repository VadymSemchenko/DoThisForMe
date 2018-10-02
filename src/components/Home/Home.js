import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import MotionsList from '../MotionsList';
import { attemptSignIn, attemptSignOut } from '../../store/actionCreators';
import { HOW_IT_WORKS, MOTION_CREATE } from '../../constants/routes';

class Home extends Component {
    static propTypes = {
        motions: PropTypes.array,
        uid: PropTypes.string,
    };
    render() {
        const { motions = [], uid } = this.props;
        return (
            <main>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Grid item={true}>
                        <IconButton component={Link} to={HOW_IT_WORKS}>
                            <PlayCircleFilledIcon color="primary" />
                        </IconButton>
                    </Grid>
                    <Grid item={true}>
                        <Link to={HOW_IT_WORKS}>How DoThis4Me Works?</Link>
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
                            handleClick={this.handleSelect}
                            motions={motions}
                            uid={uid}
                        />
                    </Grid>
                    <div>or</div>
                    <Button
                        children={'I mote!'}
                        variant="raised"
                        color="secondary"
                        component={Link}
                        to={MOTION_CREATE}
                        disabled={!uid}
                    />
                </Grid>
            </main>
        );
    }

    handleSelect = (key) => {
        console.log('motionKey ', key);
    }

}

const mapStateToProps = ({
    motionReducer: {
        motions,
    },
    authReducer: {
        uid,
        displayName,
    },
}) => ({ motions, uid, displayName });

const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
