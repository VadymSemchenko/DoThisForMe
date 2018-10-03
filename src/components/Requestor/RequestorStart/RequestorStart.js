import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Grid, FormControl, Typography, TextField, FormControlLabel, FormGroup, FormLabel } from '@material-ui/core';
import queryString from 'query-string';

import { getMotion } from '../../../store/actionCreators';

class Requestor extends Component {

    state = {
        textValue: '',
        moneyValue: '10',
        currentMotion: {}
    };

    // static getDerivedStateFromProps = async ({ newMotion, getMotion }) => {
    //     const deal = await getMotion(newMotion);
    //     console.log(deal);
    //     return { deal: deal };
    // };

    async componentDidMount() {
        const { newMotion, getMotion, location: { search } } = this.props;
        const currentMotion = await getMotion(queryString.parse(search).motionkey);
        console.log(currentMotion);
        this.setState(() => ({
            currentMotion
        }));
    }

    render() {
        const { displayName, newMotion } = this.props;
        const { textValue, moneyValue, currentMotion: { value } }= this.state;
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
            >
                <Grid item>
                    <Typography
                        children={value}
                        variant="display1"
                        align="center"
                        gutterBottom
                    />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Please, buy something for me"
                        name="textValue"
                        value={textValue}
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
                                            name="moneyValue"
                                            value={moneyValue}
                                            onChange={this.handleTextChange}
                                        />}
                            />
                        </FormGroup>
                </Grid>
            </Grid>
        );
    }

    handleTextChange = ({ target: { name, value } }) => {
        this.setState(() => ({
            [name]: value
        }));
    };

    handleSubmit = () => {

    }

}

const mapStateToProps = ({ authReducer: { uid, displayName }, motionReducer: { newMotion } }) => ({ newMotion });
const mapDispatchToProps = dispatch => bindActionCreators({ getMotion }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);