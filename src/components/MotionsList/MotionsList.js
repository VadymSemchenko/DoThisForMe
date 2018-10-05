import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { DEALS } from '../../constants/routes';

class MotionList extends Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    motions: PropTypes.array.isRequired,
    uid: PropTypes.string,
  };

  render() {
    const { motions } = this.props;
    return (
      <List>{motions.map(this.renderListItem)}</List>
    );
  }

  renderListItem = (listItem) => {
    const { key, operator: { displayName, uid: operatorUid }, task: { name } } = listItem;
    const { uid: authorisationUid } = this.props;
    const isAuthor = (operatorUid === authorisationUid);
    const btnText = isAuthor ? 'DELETE' : 'JOIN';
    const btnColor = isAuthor ? 'secondary' : 'primary';
    return (
      <List key={key}>
        <ListItem>
          <ListItemText>
            <span>{`${displayName}: ${name}`}</span>
            {isAuthor &&
            <Button
              component={Link}
              to={`${DEALS}/${key}`}
              variant='raised'
              color='primary'
              children='Manage'
            />}
            {authorisationUid &&
            <Button
              color={btnColor}
              onClick={() => {this.props.handleClick({ condition: isAuthor, key })}}
              children={btnText}
            />}
          </ListItemText>
        </ListItem>
        <Divider/>
      </List>
    );
  }
}

const mapStateToProps = ({ authReducer: { uid } }) => ({ uid });

export default connect(mapStateToProps)(MotionList);