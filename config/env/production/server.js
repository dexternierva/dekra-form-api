module.exports = ({ env }) => ({
	url: env('STRAPI_URL'),
	proxy: true,
});