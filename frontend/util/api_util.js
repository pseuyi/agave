import { normalize } from 'normalizr';
import { keys } from 'lodash';

const normalizedData = (data, schema, label) => normalize({ [label]: data }, schema);

export const massageData = (res, schema, label) => {
  if (keys(res.data.data).length === 0) return res.data.data;

  const data = Array.isArray(res.data.data)
    ? res.data.data.map((d) =>  ({ ...d.attributes, id: d.id }))
    : [{ id: res.data.data.id, ...res.data.data.attributes }];

  if (schema) return normalizedData(data, schema, label);

  return data;
};
