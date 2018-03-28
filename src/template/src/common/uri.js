import { MockHost } from '../mock';

export default {
  doubanInTheaters: () => '/doubanApi/v2/movie/in_theaters',
  getUserList: () => `${MockHost}/user`,
  getUser: id => `${MockHost}/user/${id}`
};
