import RouteWrapper from '../../components/RouteWrapper';

const Route = {
  path: '/user/:userId?',
  component: RouteWrapper(() => import('./User'))
};

export default Route;
