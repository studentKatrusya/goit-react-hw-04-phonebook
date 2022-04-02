import s from './App.module.css';
import { Component } from 'react';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContacts = data => {
    const { contacts } = this.state;

    // const names = contacts.map(contact => contact.name.toLowerCase());

    // names.includes(data.name.toLowerCase())
    //   ? alert(`${data.name} is already in contact`)
    //   : this.setState(prevState => ({
    //       contacts: [data, ...prevState.contacts],
    //     }));

    contacts.find(
      contact => contact.name.toLowerCase() === data.name.toLowerCase()
    )
      ? toast.warning(`${data.name} is already in contact`)
      : this.setState(prevState => ({
          contacts: [data, ...prevState.contacts],
        }));
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContact = () => {
    const { contacts, filter } = this.state;
    const normalizedfilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedfilter)
    );
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const contactsParsed = JSON.parse(contacts);

    if (contactsParsed) {
      this.setState({ contacts: contactsParsed });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const prevContacts = prevState.contacts;
    const nextContacts = this.state.contacts;

    if (prevContacts !== nextContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
    // console.log(prevState.contacts);
    // console.log(this.state.contacts);
  }

  useE;

  render() {
    const { filter } = this.state;
    const visibleContact = this.getVisibleContact();
    return (
      <div>
        <h2 className={s.title}>Phonebook</h2>
        <ContactForm onSubmit={this.addContacts} />
        <h3 className={s.title}>Contacts</h3>
        <Filter filter={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContact}
          onDeleteContact={this.deleteContact}
        />
        <ToastContainer autoClose={3000} theme={'colored'} />
      </div>
    );
  }
}

// App.propTypes = {
//   contacts: PropTypes.
// }

export default App;
