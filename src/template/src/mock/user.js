export default {
  user: () => {
    const size = 20;
    const result = {};
    result.code = 10000;
    result.data = [];
    for (let i = 0; i < size; i++) {
      result.data.push({
        id: `id_${i}`,
        name: `user_${i}`,
        info: new Date().toString()
      });
    }
    return result;
  },
  '/user/:userId': (url, options) => {
    const result = {};
    result.code = 10000;
    result.data = {
      id: `id_${options.params.userId}`,
      name: `user_${options.params.userId}`,
      info: new Date().toString()
    };
    return result;
  }
};
