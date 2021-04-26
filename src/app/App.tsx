import React, { Suspense } from 'react';

import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter, Switch } from 'react-router-dom';

import { Layout, Loader } from '@/app/layout';
import { RoutePublic } from '@/app/router';
import { Error404, ErrorBoundary } from '@/errors';

import { PageISSLocation } from './pages/PageISSLocation';

export const App = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/app/">
        <Layout>
          <Suspense fallback={<Loader />}>
            <Switch>
              <RoutePublic exact path="/" render={() => <PageISSLocation />} />

              <RoutePublic path="*" render={() => <Error404 />} />
            </Switch>
          </Suspense>
        </Layout>
      </BrowserRouter>
      <ReactQueryDevtools />
    </ErrorBoundary>
  );
};
