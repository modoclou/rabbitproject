import Wavebox from '../components/Wavebox';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Wavebox />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
