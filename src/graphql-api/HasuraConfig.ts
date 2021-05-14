import {
  UsersFieldsFragmentDoc,
  TodosFieldsFragmentDoc
} from './generated/graphql';

const HasuraConfig = {
  users: {
    typename: 'users',
    primaryKey: ['id'],
    fieldFragment: UsersFieldsFragmentDoc,
  },
  todos: {
    typename: 'todos',
    primaryKey: ['id'],
    fieldFragment: TodosFieldsFragmentDoc,
  }
};

export default HasuraConfig;
