import React from 'react';
import { ListItem, ListItemText, Button } from '@material-ui/core';

const MotionsListItem = ({
    item: {
        key,
        displayName,
        uid,
        value
    },
    buttonAttributes: {
        text,
        color,
        buttonHandler
    }}) => {
        return (
            <ListItem>
                <ListItemText children={'Hello'}>
               {/* <span>{`${displayName}: ${value}`}</span> */}
                    {/* <Button
                        color={color}
                        children={text}
                        onClick={buttonHandler}
                        value={key}
                        key={key}
                        id={key}
                        /> */}
                </ListItemText>
            </ListItem>
        );
    }

export default MotionsListItem;