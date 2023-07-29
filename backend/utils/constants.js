const OK_STATUS = 200;
const CREATED_STATUS = 201;
const regexAvatar = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
const regexLink = /^https?:\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\\/~+#-]*[\w@?^=%&\\/~+#-])/im;
const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

module.exports = {
  OK_STATUS,
  CREATED_STATUS,
  regexAvatar,
  regexLink,
  PORT,
  DB_URL,
};
