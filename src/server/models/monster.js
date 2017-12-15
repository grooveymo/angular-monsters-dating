var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MonsterSchema = new Schema({
                                  firstName: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'first name cannot be blank'
                                  },
                                  lastName: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'last name cannot be blank'
                                  },
                                  email: {
                                    type: String,
                                    default: '',
                                    trim: true,
                                    required: 'email cannot be blank'
                                  },
                                  imageFile: {
                                    type: String,
                                    default: '',
                                    trim: true
                                  }
                                });

module.exports.Monster = mongoose.model('Monster', MonsterSchema);
