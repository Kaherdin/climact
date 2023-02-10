"use strict";

const qs = require("qs");

const stripSlashes = (str) =>
  str ? str.replace(/^\//, "").replace(/\/$/, "") : "";

// const buildUrl = ( baseUrl, basePath, slug, params ) => {
//   const sanitizedBaseUrl = stripSlashes( baseUrl );
//   const sanitizedBasePath = stripSlashes( basePath );
//   const query = qs.stringify( params, { addQueryPrefix: true } );
//   const url = [ sanitizedBaseUrl, sanitizedBasePath, slug ].filter( i => i ).join( '/' );

//   return `${url}${query}`;
// };

const buildUrl = (baseUrl, locale, basePath, slug) => {
  const sanitizedBaseUrl = stripSlashes(baseUrl);
  const sanitizedBasePath = stripSlashes(basePath);
  // const query = qs.stringify(params, { addQueryPrefix: true });

  return `${sanitizedBaseUrl}/${locale}${sanitizedBasePath}/${slug}`;
};

module.exports = buildUrl;
