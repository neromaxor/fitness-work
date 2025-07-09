import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import css from './TrainingDiary.module.css';

function TrainingDiary() {
  const [entries, setEntries] = useState([]);

  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      { name: '', note: '', id: Date.now() },
    ]);
  };

  const handleChange = (id, field, value) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const handleDelete = (id) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  };

  const autoResizeTextarea = (e) => {
  e.target.style.height = 'auto';
  e.target.style.height = `${e.target.scrollHeight}px`;
};

  const handleSave = (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry.name.trim() && entry.note.trim()) {
      toast.success('Нотатку збережено! ✅');
    } else {
      toast.error('Заповніть усі поля!');
    }
  };

  return (
    <div className={css.container}>
      <Link to="/" className={css.backLink}>← На головну</Link>
      <h2 className={css.title}>Щоденник тренувань</h2>

      <button onClick={handleAddEntry} className={css.addButton}>
        + Додати нову замітку
      </button>

      <div className={css.entries}>
        {entries.map((entry, index) => (
          <div key={entry.id} className={css.entryCard}>
            <div className={css.entryHeader}>
              <h3>Запис #{index + 1}</h3>
              <button onClick={() => handleDelete(entry.id)} className={css.deleteButton}>✕</button>
            </div>
            <input
              type="text"
              placeholder="Ім’я та прізвище"
              value={entry.name}
              onChange={(e) => handleChange(entry.id, 'name', e.target.value)}
              className={css.input}
            />
           <textarea
          placeholder="Нотатка до тренування"
        value={entry.note}
  onChange={(e) => {
    handleChange(entry.id, 'note', e.target.value);
    autoResizeTextarea(e); // 🔥 Авто-збільшення висоти
  }}
  className={css.textarea}
/>
            <button
              onClick={() => handleSave(entry.id)}
              className={css.saveButton}
            >
              Зберегти нотатку
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrainingDiary;
