
exports.setResponseHeader = (req, res , next) => {
    res.header(
      'Access-Control-Allow-Origin','*',
      'Access-Control-Allow-Methods','POST, GET, OPTIONS, PUT, DELETE',
      'Access-Control-Allow-Headers','Content-Type, X-Auth-Token, Origin, Authorization'
    );
    next()
}
