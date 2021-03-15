export const statusOptions = [
  {
      label: 'All',
    value: ''
  },
  {
    label: 'Active',
    value: 'active'
  },
  {
    label: 'Done',
    value: 'done'
  }
];

export const sortOptions = [
  {
    label: 'All',
    value: ''
  },
  {
    label: 'A-Z',
    value: 'a-z'
  },
  {
    label: 'Z-A',
    value: 'z-a'
  },
  {
    label: 'Creation sate oldest',
    value: 'creation_date_oldest'
  },
  {
    label: 'Creation date newest',
    value: 'creation_date_newest'
  },
  {
    label: 'Completion date oldest',
    value: 'completion_date_oldest'
  },
  {
    label: 'Completion date newest',
    value: 'completion_date_newest'
  },
];

export const dateOptions = [
  {
    label: 'Created early then',
    value: 'create_lte',
  },
  {
    label: 'Created late then',
    value: 'create_gte',
  },
  {
    label: 'Completed early then',
    value: 'complete_lte',
  },
  {
    label: 'Completed late then',
    value: 'complete_gte',
  },
];