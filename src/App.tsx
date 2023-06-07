import { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  // BrowserRouter,
  // Routes,
  // Route,
  Params
} from 'react-router-dom';

import loadable from '@loadable/component';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { CenterLoadingFallback } from '@/components/CenterLoadingFallback';
import { DialogContainer } from '@/components/DialogContainer';
import { queryClient } from '@/services/queryClient';
import theme from '@/styles/theme';
import { SnackbarProvider } from 'notistack';

const HomePage = loadable(() => import('@/pages/Home'), {
  resolveComponent: (components) => components.HomePage,
  fallback: <CenterLoadingFallback />
});

const ReactQueryPage = loadable(() => import('@/pages/ReactQuery'), {
  resolveComponent: (components) => components.ReactQueryPage,
  fallback: <CenterLoadingFallback />
});

const ReactQueryPeoplePage = loadable(() => import('@/pages/ReactQuery/People'), {
  resolveComponent: (components) => components.ReactQueryPeoplePage,
  fallback: <CenterLoadingFallback />
});

const ReactQueryPostsPage = loadable(() => import('@/pages/ReactQuery/Posts'), {
  resolveComponent: (components) => components.ReactQueryPostsPage,
  fallback: <CenterLoadingFallback />
});

// const ReactQueryPostCommentsPage = loadable(() => import('@/pages/ReactQuery/Posts/Comments'), {
//   resolveComponent: (components) => components.ReactQueryPostCommentsPage,
//   fallback: <CenterLoadingFallback />
// });

const ZustandPage = loadable(() => import('@/pages/Zustand'), {
  resolveComponent: (components) => components.ZustandPage,
  fallback: <CenterLoadingFallback />
});

const ErrorPage = loadable(() => import('@/pages/Error'), {
  resolveComponent: (components) => components.ErrorPage,
  fallback: <CenterLoadingFallback />
});

const ReactRouterPage = lazy(() => import('@/pages/ReactRouter'));

const router = createBrowserRouter([
  {
    path: '/',
    // element: <HomePage />,
    async lazy() {
      const { HomePage } = await import('@/pages/Home');
      return {
        Component: HomePage
      };
    },
  },
  {
    path: 'react-router',
    element: <ReactRouterPage />
  },
  // {
  //   path: 'react-query',
  //   element: <ReactQueryPage />,
  //   children: [
  //     {
  //       path: 'people',
  //       element: <ReactQueryPeoplePage />
  //     },
  //     {
  //       path: 'posts',
  //       element: <ReactQueryPostsPage />,
  //       children: [
  //         {
  //           path: ':postId',
  //           // element: <ReactQueryPostCommentsPage />,
  //           // loader: commentsLoader,
  //           async lazy() {
  //             const { ReactQueryPostCommentsPage } = await import('@/pages/ReactQuery/Posts/Comments');
  //             return {
  //               Component: ReactQueryPostCommentsPage,
  //               loader: commentsLoader
  //             };
  //           },
  //         },
  //       ]
  //     }
  //   ]
  // },
  {
    path: 'react-query',
    element: <ReactQueryPage />
  },
  {
    path: 'react-query/people',
    element: <ReactQueryPeoplePage />
  },
  {
    path: 'react-query/posts',
    element: <ReactQueryPostsPage />
  },
  {
    path: 'react-query/posts/:postId',
    // element: <ReactQueryPostCommentsPage />,
    // loader: commentsLoader,
    async lazy() {
      const { ReactQueryPostCommentsPage } = await import('@/pages/ReactQuery/Posts/Comments');
      return {
        Component: ReactQueryPostCommentsPage,
        loader: commentsLoader
      };
    },
  },
  {
    path: 'zustand',
    element: <ZustandPage />
  },
  {
    path: '*',
    element: <ErrorPage />
  }
]);

type CommentsParamsType = {
  params: Params<string>;
}

async function commentsLoader({params}: CommentsParamsType) {
  const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.postId}/comments`);
  const result = await response.json();
  return result;
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider maxSnack={3}>
        <QueryClientProvider client={queryClient}>
          <CssBaseline />
          <Suspense fallback={<CenterLoadingFallback />}>
            <RouterProvider router={router} fallbackElement={<CenterLoadingFallback />} />
            {/* <BrowserRouter>
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path="react-router" element={<ReactRouterPage />} />
                <Route path="react-query" element={<ReactQueryPage />} />
                <Route path="react-query/people" element={<ReactQueryPeoplePage />} />
                <Route path="react-query/posts" element={<ReactQueryPostsPage />} />
                <Route path="react-query/posts/:postId" element={<ReactQueryPostCommentsPage />} loader={commentsLoader} />
                <Route path="zustand" element={<ZustandPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
            </BrowserRouter> */}
          </Suspense>
          {localStorage.getItem('query-devtools') === 'true' && (
            <ReactQueryDevtools position="bottom-right" />
          )}
          <DialogContainer />
        </QueryClientProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
