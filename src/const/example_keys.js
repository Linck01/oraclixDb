const keys = {
  production: {
    dbApiAuth: '',
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    dbName: ''
  },
  development: {
    dbApiAuth: '',
    dbHost: '',
    dbUser: '',
    dbPassword: '',
    dbName: ''
  }
};

module.exports.get = () => {
  if (process.env.NODE_ENV == 'production')
    return keys.production;
  else
    return keys.development;
}
