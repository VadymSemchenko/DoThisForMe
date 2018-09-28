import changeCase from 'change-case';
import { HOME } from '../constants/routes';


export const routeToLink = (route) => {
    const text = route === HOME
    ?'Home'
    : changeCase.titleCase(route.slice(1))
    return {
    route,
    text
}};