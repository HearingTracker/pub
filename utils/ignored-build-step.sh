#!/bin/bash

echo "VERCEL_ENV: $VERCEL_ENV"
echo "AUTHOR: $VERCEL_GIT_COMMIT_AUTHOR_LOGIN"
echo "BRANCH: $VERCEL_GIT_COMMIT_REF"

if [[ "$VERCEL_ENV" == "production" ]] ; then
  echo "✅ - Production env - build can proceed"
  exit 1;

else
  echo "🛑 - ${VERCEL_ENV} env - build cancelled"
  exit 0;
fi


if [[ "$VERCEL_GIT_COMMIT_REF" == "staging" || "$VERCEL_GIT_COMMIT_REF" == "main"  ]] ; then
  echo "✅ - Branch ${VERCEL_GIT_COMMIT_REF} - build can proceed"
  exit 1;
else
  # Don't build
  echo "🛑 - Branch ${VERCEL_GIT_COMMIT_REF} - build cancelled"
  exit 0;
fi
