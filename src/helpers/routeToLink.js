import changeCase from 'change-case';

export const routeToLink = (route) => ({
    route,
    text: changeCase.titleCase(route.slice(1))
});