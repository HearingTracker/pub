import logger from 'lib/logger';
const log = logger({ category: 'app' });

const App = ({ Component, pageProps }) => <Component {...pageProps} />;

export default App;
