// Инициализация VK Bridge
vkBridge.send('VKWebAppInit');

// Получение информации о пользователе
vkBridge.send('VKWebAppGetUserInfo')
  .then(data => {
    window.userId = data.id;
  })
  .catch(console.error);

// Обработчик кнопки «Проверить»
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('checkBtn');
  const output = document.getElementById('output');

  btn.addEventListener('click', () => {
    const url = document.getElementById('siteUrl').value.trim();
    if (!url) {
      output.textContent = 'Введите URL сайта';
      return;
    }
    output.textContent = 'Отправка запроса…';

    // Имитация отправки на сервер: здесь покажем входные данные
    const result = {
      user_id: window.userId || null,
      url: url
    };
    // Выводим результат в браузер
    output.textContent = JSON.stringify(result, null, 2);
  });
});
