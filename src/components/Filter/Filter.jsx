import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './Filter.module.css';

export const Filter = ({ onFilterInput }) => {
  const handleFilterInput = e => {
    let value = e.currentTarget.value.toUpperCase();
    onFilterInput(value);
  };

  const filterInputId = nanoid();
  return (
    <div className={css.filter}>
      <label className={css.label} htmlFor={filterInputId}>
        Find contacts by name
      </label>
      <input
        onChange={handleFilterInput}
        className={css.input}
        id={filterInputId}
        type="text"
        name="name"
        placeholder="Enter name"
        // pattern="^[a-zA-Z]+(([' -][a-zA-Z ])?[a-zA-Z]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
    </div>
  );
};

Filter.propTypes = {
  onFilterInput: PropTypes.func.isRequired,
};
