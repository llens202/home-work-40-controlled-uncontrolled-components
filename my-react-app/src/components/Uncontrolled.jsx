import { useState, useEffect, useRef } from 'react';
import styles from './Uncontrolled.module.css';

const UncontrolledForm = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const inputRef = useRef(null);

  // Функція для завантаження даних
  const fetchUser = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Перший запит при завантаженні компонента (ID = 1)
  useEffect(() => {
    fetchUser(1);
  }, []);

  // Обробка відправки неконтрольованої форми
  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = inputRef.current.value.trim();
    if (newId) {
      fetchUser(newId);
      inputRef.current.value = ''; // Очищаємо інпут
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Неконтрольована форма (UncontrolledForm)</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="number"
          placeholder="Введіть ID (1-10)"
          ref={inputRef}
          min="1"
          max="10"
          className={styles.input}
        />
        <button type="submit" className={styles.submitBtn}>
          Завантажити
        </button>
      </form>

      {/* Картка з даними користувача */}
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>Дані з сервера:</h3>

        {isLoading ? (
          <p className={styles.loadingText}>Завантаження даних...</p>
        ) : user && user.name ? (
          <div>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Ім'я:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Місто:</strong> {user.address?.city}</p>
            <p><strong>Компанія:</strong> {user.company?.name}</p>
          </div>
        ) : (
          <p className={styles.errorText}>Користувача не знайдено</p>
        )}
      </div>
    </div>
  );
};

export default UncontrolledForm;
