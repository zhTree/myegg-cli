'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/$name', controller.$name.index);
  router.get('/$name/list', controller.$name.list);
  router.get('/$name/:id', controller.$name.getOne);

};
