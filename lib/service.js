'use strict';

const Service = require('egg').Service;
const MIXINS = require('./mixins');
const Op = require('sequelize').Op;

class $NameService extends Service {
  constructor(ctx) {
    super(ctx);
    Object.assign(this, MIXINS);
    this.model = ctx.model.$Name;
  }

  async create(params) {
    const ret = await this.model.create(params);
    return ret;
  }

  async getOne(id) {
    const ret = await this.model.findOne({
      where: { id }
    });
    return ret;
  }

  async getList(query={}) {
    const pagination = this.pagination(query);
    const where = this.where(query, []);
    const ret = await this.model.findAndCountAll({
      where,
      ...pagination
    });
    return ret;
  }

  async update(id, params) {
    const ret = await this.model.update(params, {
        where: { id }
      }
    );
    return ret;
  }
}

module.exports = $NameService;