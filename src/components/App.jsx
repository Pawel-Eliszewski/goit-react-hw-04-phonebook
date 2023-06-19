import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';

export function App() {
  const [state, setState] = useState({
    contacts: [],
    filter: '',
  });

  useEffect(() => {
    if (localStorage.getItem('phonebook') === null) {
      localStorage.setItem('phonebook', JSON.stringify([]));
    } else {
      setState({
        contacts: JSON.parse(localStorage.getItem('phonebook')),
        filter: '',
      });
    }
  }, []);

  const handleFormSubmit = input => {
    if (!state.contacts.map(contact => contact.name).includes(input.name)) {
      const newContact = {
        id: nanoid(),
        name: input.name,
        number: input.number,
      };
      setState(prev => ({ ...prev, contacts: [...prev.contacts, newContact] }));
    } else {
      alert(`${input.name} is already in contacts.`);
    }
  };

  const setFilterToState = value => {
    setState(prev => ({ ...prev, filter: value }));
  };

  const filteredContacts = contacts => {
    return contacts.filter(contact =>
      contact.name.toLocaleUpperCase().includes(state.filter)
    );
  };

  const handleElementDelete = id => {
    setState(prev => ({
      ...prev,
      contacts: [...prev.contacts.filter(contact => contact.id !== id)],
    }));
  };

  useEffect(() => {
    localStorage.setItem('phonebook', JSON.stringify(state.contacts));
  }, [state.contacts]);

  return (
    <div className="main">
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={handleFormSubmit} />
      <h2>Contacts</h2>
      <Filter onFilterInput={setFilterToState} />
      <ContactList
        contacts={filteredContacts(state.contacts)}
        onContactDelete={handleElementDelete}
      />
    </div>
  );
}
