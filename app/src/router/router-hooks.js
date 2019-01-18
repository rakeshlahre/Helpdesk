import store from '../store'

export const beforeEach = ((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isAuthenticated) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.requiresVisitor)) {
    if (store.getters.isAuthenticated) {
      next({
        name: 'home',
      })
    } else {
      next()
    }
  } else {
    next()
  }
});

export const onError = (error) => {
  if (error.response) {
    console.error(error.response);
  }

  console.error(error);
};
