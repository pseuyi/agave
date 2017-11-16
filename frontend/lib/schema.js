import { schema } from 'normalizr';

export const task = new schema.Entity('tasks');
export const tasks = { tasks: [ task ] }
