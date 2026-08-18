import { useState } from 'react';
import styles from './Controlled.module.css';

const ControlledForm = () => {
  // 1. Створюємо стани для кожного поля форми
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('developer');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // 2. Обробник відправки форми
  const handleSubmit = (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню сторінки

    // Збираємо дані зі стейту
    const formData = {
      username,
      role,
      isSubscribed,
    };

    console.log('Відправлені контрольовані дані:', formData);
    alert(`Форму успішно відправлено! Вітаю, ${username || 'Гість'}`);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Контрольована форма (ControlledForm)</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Текстове поле */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Ім'я користувача:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Введіть ваше ім'я..."
            className={styles.input}
          />
        </div>

        {/* Випадаючий список (select) */}
        <div className={styles.fieldGroup}>
          <label className={styles.label}>
            Роль:
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className={styles.select}
          >
            <option value="developer">Junior Developer</option>
            <option value="designer">UI/UX Designer</option>
            <option value="manager">Project Manager</option>
          </select>
        </div>

        {/* Чекбокс */}
        <div>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={isSubscribed}
              onChange={(e) => setIsSubscribed(e.target.checked)}
              className={styles.checkbox}
            />
            Отримувати сповіщення на email
          </label>
        </div>

        <button type="submit" className={styles.submitBtn}>
          Зберегти
        </button>
      </form>

      {/* Блок для демонстрації поточного стану */}
      <div className={styles.previewBlock}>
        <h4 className={styles.previewTitle}>Поточний стан (Live Preview):</h4>
        <p><strong>Ім'я:</strong> {username || '—'}</p>
        <p><strong>Роль:</strong> {role}</p>
        <p><strong>Розсилка:</strong> {isSubscribed ? 'Так' : 'Ні'}</p>
      </div>
    </div>
  );
};

export default ControlledForm;