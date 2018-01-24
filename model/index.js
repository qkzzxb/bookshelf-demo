var bookshelf = require('./bookshelf');
var models = {
  Pet: bookshelf.Model.extend({
    tableName: 'pet',
    user() {
      return this.belongsTo(models.User,'userId','userId');
    }
  }),
  User: bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: true,
    pets(){
      return this.hasMany(models.Pet,'userId','userId');
    },
    parse(resp){
      if(typeof(resp.hobby) == 'string'){
        resp.hobby =resp.hobby.split(',');
      }
      return resp;
    },
    format(attr){
      if(Array.isArray(attr.hobby)){
        attr.hobby = attr.hobby.join(',');
      }
      return attr;
    }
  }),
}
module.exports = models;
