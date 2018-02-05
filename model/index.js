var bookshelf = require('./db');
var md5 = require('../utils/md5');
var models = {
  Pet: bookshelf.Model.extend({
    tableName: 'pet',
    user() {
      return this.belongsTo(models.User,'userId','userId');
    }
  }),
  User: bookshelf.Model.extend({
    tableName: 'user',
    hasTimestamps: ['created_time', 'updated_time'],
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
  Admin: bookshelf.Model.extend({
    tableName: 'admin',
    hasTimestamps: ['created_time', 'updated_time'],
    format(attr){//存
      if(attr.password){
        attr.password =  md5.hex_md5(attr.password);
      }
      return attr;
    }
  }),
  Upload: bookshelf.Model.extend({
    tableName: 'upload',
    hasTimestamps: ['created_time', 'updated_time']
  }),
}
module.exports = models;
