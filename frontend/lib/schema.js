import { schema } from 'normalizr';

export const task = new schema.Entity('tasks');
export const tasks = { tasks: [ task ] }
/*
  input:
  {
    tasks: [{id: 1, title: 'sdf'}, {id: 2, title: 'sdasad'}]
  }

  outcome:
  {
    result: [1, 2],
    entities: {
      tasks: { 1: {}, 2: {} }
    }
  }
*/
