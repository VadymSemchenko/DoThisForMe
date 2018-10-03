import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Button, Grid } from '@material-ui/core/';

import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut, removeMotion, joinMotion } from '../../store/actionCreators';
import { HOW_IT_WORKS, MOTION_CREATE } from '../../constants/routes';
import MotionsList from '../MotionsList/MotionsList';

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
                            handleClick={this.handleClick}
                            motions={motions}
                            uid={uid}
                        />
                    </Grid>
                    {uid &&
                        <Fragment>
                            <div>or</div>
                            <Button
                                children={'I mote!'}
                                color='secondary'
                                disabled={!uid}
                                component={Link}
                                to={MOTION_CREATE}
                            />
                        </Fragment>
                    }
                </Grid>
            </main>
        );
    }

    handleClick = ({ condition, key }) => {
        const { joinMotion, history } = this.props;
        if(condition){
            removeMotion(key)
         } else{
             joinMotion({ key, history })
        }
    };

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

const mapDispatchToProps = dispatch => bindActionCreators({ attemptSignIn, attemptSignOut, joinMotion }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
