import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (localStorage.getItem('phonebook') === null) {
      localStorage.setItem('phonebook', JSON.stringify([]));
    } else {
      setContacts(JSON.parse(localStorage.getItem('phonebook')));
    }
  }, []);

  const handleFormSubmit = input => {
    if (!contacts.map(contact => contact.name).includes(input.name)) {
      const newContact = {
        id: nanoid(),
        name: input.name,
        number: input.number,
      };
      setContacts([...contacts, newContact]);
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  const setFilterToState = value => {
    setFilter(value);
  };

  const filteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(filter)
    );
  };

  const handleContactDelete = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter onFilterInput={setFilterToState} />
      <ContactList
        contacts={filteredContacts(contacts)}
        onContactDelete={handleContactDelete}
      />
    </div>
  );
}
