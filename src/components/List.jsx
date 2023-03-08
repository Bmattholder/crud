import React from 'react';

function List({ items, deleteItem, updateItem }) {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          {item.crud} || {item.again} ||{' '}
          <button onClick={() => deleteItem(index)}>Delete</button>
          <button onClick={() => updateItem(index)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default List;
