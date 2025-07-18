import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from './../../../firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'firebase/firestore';

import css from './TrainingDiary.module.css';

function TrainingDiary() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  // Отримуємо дані з Firestore при завантаженні
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'entries'));
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEntries(data);
        setLoading(false);
      } catch (err) {
        console.error('Помилка при завантаженні:', err);
        toast.error('Не вдалося завантажити нотатки!');
      }
    };
    fetchEntries();
  }, []);

  const handleAddEntry = () => {
    setEntries((prev) => [
      ...prev,
      { name: '', note: '', id: Date.now().toString(), localOnly: true },
    ]);
  };

  const handleChange = (id, field, value) => {
    setEntries((prev) =>
      prev.map((entry) =>
        entry.id === id ? { ...entry, [field]: value } : entry
      )
    );
  };

  const autoResizeTextarea = (e) => {
    e.target.style.height = 'auto';
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  const handleSave = async (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry.name.trim() && entry.note.trim()) {
      try {
        const docRef = await addDoc(collection(db, 'entries'), {
          name: entry.name,
          note: entry.note,
          timestamp: new Date(),
        });
        toast.success('Нотатку збережено! ✅');

        // Оновлюємо локальний список, замінюючи тимчасову id
        setEntries((prev) =>
          prev.map((e) =>
            e.id === id ? { ...entry, id: docRef.id, localOnly: false } : e
          )
        );
      } catch (err) {
        toast.error('Помилка при збереженні!');
        console.error(err);
      }
    } else {
      toast.error('Заповніть усі поля!');
    }
  };

  const handleDelete = async (id) => {
    const entry = entries.find((e) => e.id === id);
    if (entry.localOnly) {
      setEntries((prev) => prev.filter((e) => e.id !== id));
    } else {
      try {
        await deleteDoc(doc(db, 'entries', id));
        setEntries((prev) => prev.filter((e) => e.id !== id));
        toast.success('Нотатку видалено 🗑️');
      } catch (err) {
        toast.error('Помилка при видаленні!');
        console.error(err);
      }
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
        {loading ? (
          <p>Завантаження...</p>
        ) : entries.length === 0 ? (
          <p>Поки що немає нотаток.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={entry.id} className={css.entryCard}>
              <div className={css.entryHeader}>
                <h3>Запис #{index + 1}</h3>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className={css.deleteButton}
                >
                  ✕
                </button>
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
                  autoResizeTextarea(e);
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
          ))
        )}
      </div>
    </div>
  );
}

export default TrainingDiary;
