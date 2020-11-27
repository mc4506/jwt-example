const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    firstname: String,
    lastName: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false
    },
    tempPassword: {
        type: Boolean,
        default: false
    },
    googleId: String,
    loginAttempts: {
        type: Number, required: true, default: 0
    },
    lockUntil: Number
});

UserSchema.set('timestamps', true);
UserSchema.pre('save', function(next) {
    const user = this;
    
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate salt
    const saltRounds = 10;
    bcrypt.hash(user.password, saltRounds, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

const User = mongoose.model('Use', UserSchema);

User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = User;