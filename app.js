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

    // Замените на ваш реальный webhook URL
    const webhookUrl = 'https://webhook.site/ec94ff4d-1b1d-4f23-b37f-4ef4ba9e59a1';

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: window.userId || null,
        url: url
      })
    })
      .then(res => res.json().catch(() => null))
      .then(data => {
        output.textContent = 'Ответ сервера:\n' + JSON.stringify(data, null, 2);
      })
      .catch(err => {
        console.error(err);
        output.textContent = 'Ошибка: ' + err.message;
      });
  });
});
