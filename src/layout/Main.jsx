import React from 'react';
import loadable from '@loadable/component';

const AsyncHomeComponent = loadable(() => import('../containers/Home'));

const Main = () => (
  <main className="container">
    <AsyncHomeComponent />
  </main>
);
export default Main;
