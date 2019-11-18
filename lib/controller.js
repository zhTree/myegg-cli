'use strict';

const Controller = require('egg').Controller;
const MIXINS = require('./mixins');

class $NameController extends Controller {
  constructor(ctx) {
    super(ctx);
    Object.assign(this, MIXINS);
    this.service = this.service.$name;
  }

  index() {
    this.success('hi');
  }

  async list() {
    const ret = await this.service.getList();
    this.success(ret);
  }
}

module.exports = $NameController;
