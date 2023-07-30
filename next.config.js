/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
}


module.exports = nextConfig


module.exports = {
	webpack: function (config, options) {
	  config.module.noParse = /gun\.js$/;
	  return config;
	},
  };

  module.exports = {
	images: {
	  domains: ['arweave.net'],
	},
  };
  