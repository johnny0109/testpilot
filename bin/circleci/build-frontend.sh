#!/bin/bash
set -ex
npm install
if [[ " $TESTPILOT_STATIC_BRANCHES " =~ " $CIRCLE_BRANCH " ]]; then
    if [[ " $TESTPILOT_ENABLE_PONTOON_BRANCHES " =~ " $CIRCLE_BRANCH " ]]; then
        NODE_ENV=production ENABLE_PONTOON=1 npm run static
    else
        NODE_ENV=production ENABLE_PONTOON=0 npm run static
    fi
else
    npm run build
fi
npm test
