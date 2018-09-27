import React from 'react';
import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../../constants/routes';

const InfoPage = props => {
    console.log(props);
    const { pathname } = props.location;
    return <span>{pathname}</span>
}

export default InfoPage;