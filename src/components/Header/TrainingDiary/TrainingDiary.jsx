import { useState } from 'react';
import css from './TrainingDiary.module.css';

function TrainingDiary() {
  const [entries, setEntries] = useState([]);
  const [currentEntry, setCurrentEntry] = useState({
    name: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentEntry({ ...currentEntry, [name]: value });
  };

  const handleAddEntry = () => {
    if (currentEntry.name.trim() && currentEntry.note.trim()) {
      setEntries((prev) => [...prev, currentEntry]);
      setCurrentEntry({ name: '', note: '' });
    }
  };

  const handleDelete = (indexToDelete) => {
    setEntries(entries.filter((_, index) => index !== indexToDelete));
  };

  return (
    <div className={css.container}>
      <h2 className={css.title}>Щоденник тренувань</h2>

      <div className={css.form}>
        <input
          type="text"
          name="name"
          value={currentEntry.name}
          onChange={handleChange}
          placeholder="Ім’я та прізвище"
          className={css.input}
        />
        <textarea
          name="note"
          value={currentEntry.note}
          onChange={handleChange}
          placeholder="Нотатка до тренування"
          className={css.textarea}
        />
      </div>

      <button onClick={handleAddEntry} className={css.buttonAdd}>Додати нотатку</button>

      <div className={css.entries}>
        {entries.map((entry, index) => (
          <div key={index} className={css.entryCard}>
            <div className={css.entryHeader}>
              <h3>{entry.name}</h3>
              <button onClick={() => handleDelete(index)} className={css.deleteButton}>✕</button>
            </div>
            <p>{entry.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingDiary;
