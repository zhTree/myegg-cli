'use strict';

module.exports = app => {
  const { STRING, INTEGER, TINYINT, TEXT } = app.Sequelize;
  /**
   * https://sequelize.org/v5/variable/index.html#static-variable-DataTypes
   */
  const model = app.model.define('$Name', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true }
  }, {
    tableName: '$names',
    timestamps: false
  });

  return model;
};