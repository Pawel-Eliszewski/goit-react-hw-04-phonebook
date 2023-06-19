import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

export const ContactForm = ({ onFormSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleNameInput = e => {
    const { value } = e.target;
    setName(value);
  };

  const handleNumberInput = e => {
    const { value } = e.target;
    setNumber(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    let newContact = { name: name, number: number };
    onFormSubmit(newContact);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form type="submit" className={css.form} onSubmit={handleSubmit}>
      <label className={css.label} htmlFor={nanoid()}>
        Name
      </label>
      <input
        className={css.input}
        id={nanoid()}
        type="text"
        name="name"
        onChange={handleNameInput}
        value={name}
        placeholder="Enter name"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label className={css.label} htmlFor={nanoid()}>
        Number
      </label>
      <input
        className={css.input}
        id={nanoid()}
        type="tel"
        name="number"
        onChange={handleNumberInput}
        value={number}
        placeholder="Enter number"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
