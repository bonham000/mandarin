#!/bin/bash

# Create an empty placeholder env file
echo "
export const SENTRY_DSN = \"\";
export const SENTRY_AUTH_TOKEN = \"\";
export const GOOGLE_WEB_API_KEY = \"\";
export const ANDROID_CLIENT_ID = \"\";
export const ANDROID_STANDALONE_CLIENT_ID = \"\";
export const IOS_CLIENT_ID = \"\";
export const DRAGON_URI = \"\";
export const AMAZON_CLOUD_FRONT = \"\";
export const FORVO_API_KEY = \"\";
export const GOOGLE_TRANSLATE_API_KEY = \"\";
export const PINYIN_CONVERSION_SERVICE_URL = \"\";
export const PINYIN_CONVERSION_SERVICE_API_KEY = \"\";
export const STARGAZER_SERVER_URL = \"\";"> env.ts