'use strict';

module.exports = app => {
  const { router, controller } = app;

  router.get('/$name', controller.$name.index);
  router.get('/$name/list', controller.$name.list);
  router.get('/$name/:id', controller.$name.getOne);
  router.post('/$name/create', controller.$name.create);
  router.post('/$name/update', controller.$name.update);
  router.post('/$name/delete', controller.$name.delete);
  router.post('/$name/recover', controller.$name.recover);

};
