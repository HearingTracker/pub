import logger from 'lib/logger';
const log = logger({ category: 'stories' });

const Story = ({ slug }) => (
  <div>SSG: {slug}</div>
);

const getStaticProps = async ({ params, query, preview }) => {
  log.info('getStaticProps log.info for stories.js: %o', params);
  console.log('getStaticProps console.log for stories.js: %o', params);
  return {
    props: {
      slug: params.slug
    }
  };
};

const getStaticPaths = () => ({ paths: [], fallback: false });

export { getStaticProps, getStaticPaths };

export default Story;
