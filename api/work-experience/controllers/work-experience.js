'use strict';

const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
	async create(ctx) {
		let entity;
		if (ctx.is('multipart')) {
			const { data, files } = parseMultipartData(ctx);
			data.user = ctx.state.user.id;
			entity = await strapi.services['work-experience'].create(data, { files });
		} else {
		  	ctx.request.body.user = ctx.state.user.id;
		  	entity = await strapi.services['work-experience'].create(ctx.request.body);
		}

		return sanitizeEntity(entity, { model: strapi.models['work-experience'] });
	},
};