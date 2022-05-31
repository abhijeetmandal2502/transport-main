import { useEffect, useState } from 'react';
import '../styles/globals.css';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { SnackbarProvider } from 'notistack';
import Grow from '@material-ui/core/Grow';
import { SessionProvider } from 'next-auth/react';
import { BiltyDataProvider } from '../helpers/BiltyData';
import LoadingScreen from '../components/loadingScreen';
import ErrorBoundary from '../components/ErrorBoundary';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
// import {BiltyDataProvider} from ''

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const Router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <RecoilRoot>
        <BiltyDataProvider>
          <SnackbarProvider
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            TransitionComponent={Grow}
          >
            <Layout>
              {!loading ? (
                <ErrorBoundary>
                  <Component {...pageProps} />
                </ErrorBoundary>
              ) : (
                <LoadingScreen />
              )}
            </Layout>
            {/* index */}
          </SnackbarProvider>
        </BiltyDataProvider>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
