const { Schema, model } = require('mongoose');
const validator = require('validator');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: (props) => `${props.value} is not a valid email address!`,
        },
    },
    thoughts: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
        }
    ],
    friends: [
        {
        type: Schema.Types.ObjectId,
        ref: 'User'
        }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// Find number of friends 
userSchema
  .virtual('numberFriends')
  .get(function () {
    return this.friends.length;
  })

// Initialize our User model
const User = model('User', userSchema);

module.exports = User;
