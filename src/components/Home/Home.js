import React, { Component, Fragment } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import { connect } from 'react-redux';
import { func } from 'prop-types';
import { bindActionCreators } from 'redux';

import { attemptSignIn, attemptSignOut, throwError } from '../../store/actionCreators';
import { HOW_IT_WORKS, MOTION_CREATE } from '../../constants/routes';
import MotionsListItem from '../../shared/MotionsListItem/MotionsListItem';

class Home extends Component {
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
                        </Grid>
                    </Grid>
                    <Grid item>
                        <List>
                            {motions.map((item) => {
                                const { key, uid: motionAuthorUid } = item;
                                const isAuthor = uid === motionAuthorUid;
                                const buttonAttributes = isAuthor
                                ? {
                                    text: 'DELETE',
                                    color: 'secondary',
                                    buttonHandler: this.handleDelete,
                                }
                                : {
                                    text: 'JOIN',
                                    color: 'primary',
                                    buttonHandler: this.handleJoin,
                                };
                                return <MotionsListItem
                                            key={key}
                                            buttonAttributes={buttonAttributes}
                                            item={item}
                                            />;
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

    handleDelete = ({ target: { value } }) => {
        console.log(value);
    };

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