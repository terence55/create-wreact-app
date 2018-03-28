import React from 'react';
import { withRouter } from 'react-router-dom';
import { Bundle } from '../AsyncWrapper';

export default function routeWrapper(loadFunction) {
  return props => (
    <Bundle load={loadFunction}>
      {(Component) => {
          const RouteComponent = withRouter(Component);
          return <RouteComponent {...props} />;
          }}
    </Bundle>);
}
