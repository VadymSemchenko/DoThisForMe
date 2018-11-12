import React,
{
    Component,
    Fragment
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { compose } from 'recompose';
import FlagIconFactory from 'react-flag-icon-css'
import {
    Menu,
    MenuItem,
    withStyles,
    IconButton
} from '@material-ui/core';

import styles from './styles';
import { selectLang } from '../../store/actionCreators';

const FlagIcon = FlagIconFactory(React, { useCssModules: false });

const locales = [
    {
        name: 'English',
        code: 'en'
    },
    {
        name: 'Русский',
        code: 'ru',
    }
]

class LanguageSelect extends Component {

    state = {
        menuIsOpen: false,
        anchorEl: null
    };

    render() {
        const { menuIsOpen, anchorEl } = this.state;
        let { lang } = this.props;
        const { classes, buttonClass } = this.props;
        if (lang === 'en') {
            lang = 'gb'
        };
        return (
            <Fragment>
                <IconButton onClick={this.handleOpen} style={{ position: 'relative', top: "-7px" }} onClick={this.handleOpen}>
                    <FlagIcon code={lang} size='2x'/>
                </IconButton>
                <Menu
                    className={classes.menu}
                    open={menuIsOpen}
                    onClose={this.handleClose}
                    anchorEl={anchorEl}
                >
                    {locales.map((option) => {
                        const { name, code } = option;
                        let flagCode = code;
                        if (flagCode === 'en') {
                            flagCode = 'gb'
                        };
                        return (
                                <MenuItem
                                    key={name}
                                    disabled={lang === code}
                                    onClick={() => this.handleSelect(code)}
                                    >
                                    <FlagIcon code={flagCode} size='3x' />
                                    {name}
                                </MenuItem>
                        );
                    })}
                </Menu>
            </Fragment>
        );
    };

    handleSelect = code => {
        const { selectLang } = this.props;
        this.setState({ menuIsOpen: false });
        selectLang(code);
    };

    handleClose = () => {
        this.setState({ menuIsOpen: false, anchorEl: null });
    };

    handleOpen = ({ currentTarget }) => {
        this.setState({ menuIsOpen: true, anchorEl: currentTarget });
    }

};

const mapStateToProps = ({ langReducer: { lang } }) => ({ lang });

const mapDispatchToProps = dispatch => bindActionCreators({ selectLang }, dispatch);

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withStyles(styles)
)(LanguageSelect);