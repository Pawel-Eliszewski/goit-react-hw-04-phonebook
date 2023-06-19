import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onContactDelete }) => {
  const deleteContact = id => {
    onContactDelete(id);
  };

  return (
    <ul>
      {contacts.map(contact => {
        return (
          <li key={nanoid()} id={contact.id}>
            {`${contact.name}: ${contact.number}`}
            <button
              key={nanoid()}
              className={css.btn}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ).isRequired,
  onContactDelete: PropTypes.func.isRequired,
};
