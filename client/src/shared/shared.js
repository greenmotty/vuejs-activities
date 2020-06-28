import lodash from 'lodash';

export default {
  getImage(activity) {
    const images = require.context('@/assets/topics/', false, /\.png$/);
    const path = lodash.get(activity, 'topic_data.icon_path', null);
    const filename = lodash.split(path, '/');
    if (filename && filename.length) {
      return images(`./${filename[filename.length - 1]}`);
    }
    return '';
  },
};
