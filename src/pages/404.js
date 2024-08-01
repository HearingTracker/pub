const Custom404 = () => (
  <div style={{ textAlign: 'center', height: '30vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Page Not Found</div>
);

Custom404.getLayout = (children, pageProps) => <div {...pageProps}>{children}</div>;

const getStaticProps = async () => {
  const slug = '/404';
  const results = {
    props: {
      is404: true,
      noindex: true,
      title: 'Page Not Found',
    }
  };
  return results;
};

export { getStaticProps };

export default Custom404;
