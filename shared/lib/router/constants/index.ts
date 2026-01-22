import * as ROUTES from './routes';
type RouterAddress = (typeof ROUTES)[keyof typeof ROUTES];

export {ROUTES, type RouterAddress};
