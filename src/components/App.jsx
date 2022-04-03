import s from './App.module.css';
import { useState, useEffect } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { nanoid } from 'nanoid';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
  });
  const [filter, setFilter] = useState('');

  const addContacts = e => {
    // e.preventDefault();
    const name = e.currentTarget.elements.name.value;
    const number = e.currentTarget.elements.number.value;
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      toast.warning(`${name} is already in contact`);
      return;
    }

    const newContacts = {
      id: nanoid(),
      name,
      number,
    };

    setContacts(prev => [...prev, newContacts]);
    if (localStorage.getItem('contacts')) {
      return localStorage.setItem(
        'contacts',
        JSON.stringify([...contacts, newContacts])
      );
    }
    localStorage.setItem(
      'contacts',
      JSON.stringify([...initialContacts, newContacts])
    );
  };

  const deleteContact = contactId => {
    setContacts(prev => prev.filter(contact => contact.id !== contactId));
    localStorage.setItem(
      'contacts',
      JSON.stringify(contacts.filter(contact => contact.id !== contactId))
    );
  };

  const changeFilter = e => {
    setFilter(e.target.value);
  };

  const getVisibleContact = () => {
    // const { contacts, filter } = state;
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };

  return (
    <div>
      <h2 className={s.title}>Phonebook</h2>
      <ContactForm onSubmit={addContacts} />
      <h3 className={s.title}>Contacts</h3>
      <Filter filter={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContact()}
        onDeleteContact={deleteContact}
      />
      <ToastContainer autoClose={3000} theme={'colored'} />
    </div>
  );
}

// App.propTypes = {
//   contacts: PropTypes.
// }

export default App;
