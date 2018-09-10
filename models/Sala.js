const  AppModel = require('./AppModel');
module.exports  = {
  construct: function(object) {
    let model = AppModel.construct('sala')
    return new model(object);
  }
}
