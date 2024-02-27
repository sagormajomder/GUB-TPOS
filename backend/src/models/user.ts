import mongoose from 'mongoose';
import { Password } from '../services/password';

// An interface that describes the properties
// that are requried to create a new User
export interface UserAttrs {
  name: string;
  email: string;
  password: string;
  role: string;
  idNumber?: string;
  designation?: string;
  department?: string;
  imgUrl?: string;
  researchInterests?: string[]
  isActive?: boolean,
  currentGroups?: number
  maxGroups?: number
}

// An interface that describes the properties
// that a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

// An interface that describes the properties
// that a User Document has
interface UserDoc extends mongoose.Document {
  name: string;
  designation?: string;
  department?: string;
  imgUrl?: string;
  email: string;
  password: string;
  role: string;
  idNumber: string
  researchInterests?: string[]
  isActive?: boolean,
  currentGroups?: number
  maxGroups: number
}

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    designation: {
      type: String
    },
    department: {
      type: String
    },
    idNumber: {
      type: String
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String
    },
    isActive: {
      type: Boolean,
      default: true
    },
    researchInterests: {
      type: [String]
    },
    currentGroups: Number, // currentGroups < maxGroups
    maxGroups: Number, // Maximum number of groups a supervisor can accept
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      }
    }
  }
);

userSchema.pre('save', async function(done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
