let middleware = [];
let context = {
  data: []
};
function compose(middleware) {
  return function (ctx) {
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) {
        return
      }
      try {
        return Promise.resolve(fn(ctx, () => {
          dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
  }
}
middleware.push(async(ctx, next) => {
  console.log('action 001');
  ctx.data.push(2);
  await next();
  console.log('action 006');
  ctx.data.push(5);
});

middleware.push(async(ctx, next) => {
  console.log('action 002');
  ctx.data.push(2);
  await next();
  console.log('action 005');
  ctx.data.push(5);
});

middleware.push(async(ctx, next) => {
  console.log('action 003');
  ctx.data.push(2);
  await next();
  console.log('action 004');
  ctx.data.push(5);
});

const fn = compose(middleware);

fn(context)
  .then(() => {
    console.log('end');
    console.log('context = ', context);
  });

  // next = middleware[i + 1]