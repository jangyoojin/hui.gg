#!/bin/bash
echo REACT_APP_PUBLIC_URL=$1 >> .env
echo RIOT_API_KEY=$2 >> .env
echo REACT_APP_MATCH_COUNT=$3 >> .env