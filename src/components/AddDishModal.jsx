import { useState } from 'react';

function AddDishModal({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [availability, setAvailability] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form inputs
    if (!name || !price) {
      // Handle form validation error
      return;
    }

    const newDish = {
      name,
      price: parseFloat(price),
      availability,
    };

    // Call the onSubmit callback with the new dish data
    onSubmit(newDish);

    // Reset form inputs
    setName('');
    setPrice('');
    setAvailability(true);

    // Close the modal
    onClose();
  };

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="modal-content">
        <h2>Add Dish</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} />

          <label htmlFor="price">Price:</label>
          <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />

          <label htmlFor="availability">Availability:</label>
          <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
            <option value={true}>Available</option>
            <option value={false}>Not Available</option>
          </select>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}

export default AddDishModal;
