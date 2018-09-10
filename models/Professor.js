const  AppModel = require('./AppModel');
module.exports  = {
  construct: function(object) {
    let model = AppModel.construct('professor')
    return new model(object);
  }
}
