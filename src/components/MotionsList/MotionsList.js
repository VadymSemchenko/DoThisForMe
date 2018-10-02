import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';

export default class MotionList extends React.Component {
  static propTypes = {
    handleClick: PropTypes.func.isRequired,
    motions: PropTypes.array.isRequired,
    uid: PropTypes.string,
  };

  render() {
    console.log(this.props);
    const { motions } = this.props;
    return (
      <List>{motions.map(this.renderListItem)}</List>
    );
  }

  renderListItem = (listItem) => {
    const { key, displayName, uid, value } = listItem;
    const isAuthor = (uid === this.props.uid);
    const btnText = isAuthor ? 'DELETE' : 'JOIN';
    const btnColor = isAuthor ? 'secondary' : 'primary';
    return (
      <List key={key}>
        <ListItem>
          <ListItemText>
            <span>{`${displayName}: ${value}`}</span>
            <Button
              color={btnColor}
              onClick={() => {this.props.handleClick(key)}}
              children={btnText}
            />
          </ListItemText>
        </ListItem>
        <Divider/>
      </List>
    );
  }
}
