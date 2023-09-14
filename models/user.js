const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// User Schema
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.getUserById = function (id) {
    return User.findById(id).exec();
  };

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
};

module.exports.addUser = function(newUser){
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (err) return reject(err); 
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) return reject(err); 
                newUser.password = hash;
                const user = new User(newUser); 
                user.save()
                    .then(user => resolve(user)) 
                    .catch(err => reject(err)); 
            });
        });
    });
}

module.exports.comparePassword = async function(candidatePassword, hash) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash);
        return isMatch;
    } catch (err) {
        throw err;
    }
}