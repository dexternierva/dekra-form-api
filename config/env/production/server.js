module.exports = ({ env }) => ({
	proxy: true,
	url: env('STRAPI_URL')
});