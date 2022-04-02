import React from 'react';
import s from './ContactList.module.css';
import PropTypes from 'prop-types';

function ContactList({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(({ name, number, id }) => (
        <li key={id} className={s.item}>
          {name} : <span className={s.item}>{number}</span>
          <button
            type="button"
            className={s.button}
            onClick={() => {
              onDeleteContact(id);
            }}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};

export default ContactList;
