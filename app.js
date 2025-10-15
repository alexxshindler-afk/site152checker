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
    const webhookUrl = 'https://n8n.logovo-club.ru:8443/webhook/webhook-check-site';

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
    
    function renderReport(data) {
  const container = document.getElementById('report');
  container.innerHTML = '';
  const sections = [
    { key: 'privacy_policy', title: 'Политика конфиденциальности' },
    { key: 'https', title: 'Использование HTTPS' },
    { key: 'contact_forms', title: 'Контактные формы' },
    { key: 'data_collection_notice', title: 'Уведомление о сборе данных' },
    { key: 'checkbox_consent', title: 'Согласие на обработку' },
    { key: 'operator_requisites', title: 'Реквизиты оператора' },
    { key: 'cookie_banner', title: 'Cookie баннер' },
    { key: 'operator_info', title: 'Информация о контрагентах' },
    { key: 'removal_procedure', title: 'Процедура удаления' },
    { key: 'subject_rights_notice', title: 'Права субъекта данных' }
  ];
  sections.forEach(({ key, title }) => {
    if (data[key]) {
      const div = document.createElement('div');
      div.classList.add(data[key].found ? 'found' : 'not-found');
      div.innerHTML = `<h3>${title}</h3><p>${data[key].comment}</p>`;
      container.appendChild(div);
    }
  });
  if (data.overall_compliance) {
    const summary = document.createElement('div');
    summary.innerHTML = `<h2>Общий балл: ${data.overall_compliance.score}/10</h2><p>${data.overall_compliance.comment}</p>`;
    container.appendChild(summary);
  }
}
// В ответе вызывайте renderReport(data)
.then(data => {
  output.textContent = '';
  renderReport(data);
})

  });
});



