module.exports  = {
  success: function(object) {
    return {
      "status": "success",
      "result": object
    };
  },
  error: function(msg) {
    return {
      "status": 'error',
      "msg": msg

    };
  }
}
