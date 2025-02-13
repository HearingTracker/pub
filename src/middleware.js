import { NextResponse } from 'next/server';
import logger from './lib/logger';

const log = logger({ category: 'middleware' });

const middleware = async (request) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  log.info('path: %s', pathname);
  if (pathname === '/n4/hearing-aids/oticon-more') {
    const newUrl = nextUrl.clone();
    newUrl.pathname = `draft-stories${newUrl.pathname}/A`;
    log.info('Rewriting url from %s to %s', pathname, newUrl.pathname);
    return NextResponse.rewrite(newUrl);
  }
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/((?!_next|.*\\.).*)'],
};

export default middleware;
