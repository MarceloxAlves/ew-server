module.exports  = {
  success: function(object) {
    return {
      "status": "success",
      "result": object
    };
  },
  error: function(msg) {
    if (msg == null) msg = "Error no servidor"
    return {
      "status": 'error',
      "msg": msg

    };
  }
}
