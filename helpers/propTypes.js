import {
  shape,
  string,
  number,
  arrayOf,
} from 'prop-types';

export const daysDataDate = shape({
  fullDate: string.isRequired,
  month: string.isRequired,
  number: number.isRequired,
});

export const daysDataItemRolePerson = shape({
  name: string.isRequired,
  lastName: string.isRequired,
});

export const daysDataItemRole = shape({
  id: number,
  name: string.isRequired,
  person: daysDataItemRolePerson.isRequired,
});


export const daysData = {
  item: shape({
    date: daysDataDate.isRequired,
    roles: arrayOf(daysDataItemRole).isRequired,
  }),
};
