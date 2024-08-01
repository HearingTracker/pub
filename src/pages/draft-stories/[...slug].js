import logger from 'lib/logger';
const log = logger({ category: 'draft-stories' });

const Story = ({ slug }) => (
  <div>SSR: {slug}</div>
);

const getServerSideProps = async ({ params, query, preview }) => {
  log.info('getServerSideProps log.info for stories.js: %o', params);
  console.log('getServerSideProps console.log for stories.js: %o', params);
  return {
    props: {
      slug: params.slug
    }
  };
};

export { getServerSideProps };

export default Story;
