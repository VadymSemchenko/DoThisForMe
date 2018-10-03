import changeCase from 'change-case';
import { HOME } from '../constants/routes';

export const routeToText = route => {
    const text = (
        (route === HOME)
            ? 'Home'
            : changeCase.titleCase(route.slice(1))
    );
    return text;
};
