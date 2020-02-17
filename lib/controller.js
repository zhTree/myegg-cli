'use strict';

const Controller = require('egg').Controller;
const MIXINS = require('./mixins');

class $NameController extends Controller {
  constructor(ctx) {
    super(ctx);
    Object.assign(this, MIXINS);
  }

  index() {
    this.success('hi');
  }

  async list() {
    const params = this.validateParams();
    const ret = await this.service.$name.getList(params);
    this.success(ret);
  }

  async getOne() {
    const { id } = this.validateParams({
      id: 'numberString'
    }, this.ctx.params);
    const ret = await this.service.$name.getOne(id);
    return ret;
  }
}

module.exports = $NameController;
