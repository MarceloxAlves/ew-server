const  AppModel = require('./AppModel');
module.exports  = {
  construct: function(object) {
    let model = AppModel.construct('usuario')
    return new model(object);
  }
}
