import RouteWrapper from '../../components/RouteWrapper';

const Route = {
  path: '/home',
  component: RouteWrapper(() => import('./Home'))
};

export default Route;
