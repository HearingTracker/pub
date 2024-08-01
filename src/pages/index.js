import logger from 'lib/logger';

const log = logger({ category: 'home-next' });

const Home = () => <div>Home</div>;

const getStaticProps = async ({ preview = false }) => {
  log.info('getStaticProps log.info for index.js');
  console.log('getStaticProps console.log for index.js');
  return {
    props: {},
  };
};

export { getStaticProps };

export default Home;
