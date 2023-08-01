/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
	  domains: ['arweave.net'],
	},
	webpack: function (config, options) {
	  config.module.noParse = /gun\.js$/;
	  return config;
	},
  };
  
  module.exports = nextConfig;
  