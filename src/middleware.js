import { NextResponse } from 'next/server';
import logger from './lib/logger';

const log = logger({ category: 'middleware' });

const middleware = async (request) => {
  const { nextUrl } = request;
  const { pathname } = nextUrl;
  log.info('path: %s', pathname);
  return NextResponse.next();
};

export const config = {
  matcher: ['/', '/((?!_next|.*\\.).*)'],
};

export default middleware;
