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
    this.success(ret);
  }

  async create() {
    const payload = this.validateParams();
    const ret = await this.service.$name.create(payload);
    this.success(ret);
  }

  async update() {
    const { id } = this.validateParams();
    const payload = {};
    const ret = await this.service.$name.update(id, payload);
    this.handleUpdateService(ret);
  }

  async delete() {
    const { id } = this.validateParams();
    await this.deleteOrRecover(id, true);
  }

  async recover() {
    const { id } = this.validateParams();
    await this.deleteOrRecover(id, false);
  }

  async deleteOrRecover(id, flag) {
    const ret = await this.service.$name.update(id, { deleted: flag });
    this.handleUpdateService(ret);
  }
}

module.exports = $NameController;
