import { useDispatch, useSelector } from 'react-redux';
import css from './App.module.css';

import { Form } from './Form/Form';
import { ContactList } from './ContactsList/ContactsList';
import { Filter } from './Filter/Filter';
import { addContact, deleteContact } from 'redux/contacts/contacts.slice';
import { filterContacts } from 'redux/filter/filter.slice';

export const App = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(state => state.contacts);

  const filter = useSelector(state => state.filter);

  const handleSubmit = (id, name, number) => {
    const verifiedContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!verifiedContact) {
      const newContact = {
        id,
        name,
        number,
      };
      dispatch(addContact(newContact));
    } else {
      return alert(`Contact ${name} already exists`);
    }
  };

  const changeFilter = evt => {
    const { value } = evt.currentTarget;
    dispatch(filterContacts(value));
  };

  const handleDelete = id => {
    dispatch(deleteContact(id));
  };

  const newContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <div className={css.wrapper}>
        <h1>Phonebook</h1>
        <Form onSubmit={handleSubmit} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={newContacts} onDelete={handleDelete} />
      </div>
    </>
  );
};
