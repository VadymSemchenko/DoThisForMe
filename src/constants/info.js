import { PRIVACY_POLICY, TERMS_OF_SERVICE } from '../../constants/routes';
import changeCase from 'change-case';

const INFO = {
    [PRIVACY_POLICY]: {
        title: changeCase.titleCase(PRIVACY_POLICY(1)),
        text: 'Will Be Added Later'
    },
    [TERMS_OF_SERVICE]: {
        title: changeCase.titleCase(TERMS_OF_SERVICE(1)),
        text: 'Will Be Added Later'
    },
};

export default INFO;