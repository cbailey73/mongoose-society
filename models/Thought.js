const { Schema, model, default: mongoose } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minLength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
        type: String,
        required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

thoughtSchema.virtual('formatTime').get(function () {
    const formattedTimestamp = this.createdAt.toLocaleDateString();
    return formattedTimestamp;
  });

thoughtSchema
  .virtual('numberReactions')
  .get(function () {
    return this.reactions.length;
  });

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;