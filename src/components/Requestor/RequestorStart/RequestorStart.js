import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FormControl, TextField } from '@material-ui/core';

class Requestor extends Component {
    state = {
        value: ''
    };
    render() {
        const { displayName } = this.props;
        const { value }= this.state;
        return (
            <Grid
                container
                direction="column"
                alignItems="center"
                >
                <Grid item>
                    <TextField
                        value={displayName}
                        disabled
                    />
                </Grid>
                <Grid item>
                    <TextField
                        placeholder="Please, buy something forme"
                        name="value"
                        value={value}
                        onChange={}
                        multiline
                        rows="5"
                    />
                </Grid>
            </Grid>
        );
    }
}

const mapStateToProps = ({ authReducer: { displayName } }) => ({ displayName });
const mapDispatchToProps = dispatch = bindActionCreators({  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Requestor);