import React from 'react';
import PropTypes from 'prop-types';
import s from './Filter.module.css';

function Filter({ filter, onChange }) {
  return (
    <div className={s.flex}>
      <label className={s.label}>Find contact by name</label>
      <input
        className={s.input}
        type="text"
        value={filter}
        onChange={onChange}
      ></input>
    </div>
  );
}

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
};
export default Filter;
