import { Schema, model } from 'mongoose';
import { Fact } from '../entities/fact.js';

const factsSchema = new Schema<Fact>({
  title: {
    type: String,
    required: true,
  },
  fact: {
    type: String,
    required: true,
  },
  isVeryImportant: {
    type: Boolean,
    required: true,
    default: false,
  },
});

factsSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwd;
  },
});

export const FactModel = model('Fact', factsSchema);
