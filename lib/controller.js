'use strict';

const Controller = require('egg').Controller;
const MIXINS = require('./mixins');

class $NameController extends Controller {
  constructor(ctx) {
    super(ctx);
    Object.assign(this, MIXINS);
  }

  index() {
    this.success();
  }
}

module.exports = $NameController;
