import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, Button, Typography, TextField, FormControlLabel, FormGroup, FormLabel, CircularProgress, Paper } from '@material-ui/core';
import moment from 'moment';
import CountdownTimer from 'react-awesome-countdowntimer';

import {
    getMotion,
    throwError,
    initDeal,
    checkMotionForRequestorDeals
} from '../../../store/actionCreators';
import { runInThisContext } from 'vm';

class Requestor extends Component {

    state = {
        inputs: {
            text: '',
            money: '10'
        },
        isLoaded: false
    };

    async componentDidMount() {
        const {
            getMotion,
            newMotionItem,
            location: { pathname },
            history,
            requestor: { uid },
            checkMotionForRequestorDeals
            } = this.props;
            console.log('PROPS', this.props);
            const { key } = newMotionItem;
        if(Object.keys(newMotionItem).length === 0){
            getMotion(pathname);
        }
        const result = await checkMotionForRequestorDeals({
            key,
            history,
            uid
        });
        console.log('RESULT', result);
        this.setState(() => ({ isLoaded: true }));
    }

    render() {
        const { isLoaded, text, money } = this.state;
        if(!isLoaded){
            return (
                <Paper>
                    <CircularProgress color='secondary'/>
                    <CircularProgress color='secondary'/>
                    <CircularProgress color='secondary'/>
                    <CircularProgress color='secondary'/>
                    <CircularProgress color='secondary'/>
                </Paper>);
        }
        const {
            requestor,
            newMotionItem: {
                operator,
                task,
                time: {
                    finishTime
                }
            },
        } = this.props;
        return (
            <Grid
            container
            direction="column"
            alignItems="center"
            >
                <Grid item>
                    <Typography
                        children={task.name}
                        variant="display3"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <Typography
                        children={operator.displayName}
                        variant="display2"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <CountdownTimer
                        endDate={moment(finishTime)}
                    />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Please, buy something for me"
                        name="text"
                        value={text}
                        onChange={this.handleTextChange}
                        multiline
                        rows="5"
                    />
                </Grid>
                <Grid item>
                        <FormLabel component="legend">My Bid</FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                label="UAH"
                                control={<TextField
                                            name="money"
                                            value={money}
                                            onChange={this.handleTextChange}
                                        />}
                            />
                        </FormGroup>
                </Grid>
                <Button
                    variant="raised"
                    color="primary"
                    onClick={
                        this.handleSubmit
                    }
                    children="Submit"
                />
            </Grid>
        );
    }

    handleTextChange = ({ target: { name, value } }) => {
        this.setState(({ inputs }) => ({
            inputs: {
                ...inputs,
                [name]: value
            }
        }));
    };

    handleSubmit = () => {
        const {
            inputs: {
                text,
                money
            }
        } = this.state;
        const {
            requestor,
            initDeal,
            history,
            newMotionItem: {
                operator,
                key
            },
        } = this.props;
            const newDeal = {
                text,
                currentBid: money,
                motionReference: key,
                requestor,
                operator,
                accepted: {
                    requestor: true,
                    operator: false,
                    rejected: false
                }
            };
           initDeal({ newDeal, history });
        };

}

const mapStateToProps = ({
    authReducer: requestor,
    motionReducer: {
        newMotionItem
    }
}) => ({ requestor, newMotionItem });
const mapDispatchToProps = dispatch => bindActionCreators({ getMotion, throwError, initDeal, checkMotionForRequestorDeals }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);