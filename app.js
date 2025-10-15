document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('checkBtn');
  const output = document.getElementById('output');

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
      summary.innerHTML = `<h2>Общий балл: ${data.overall_compliance.score}/10</h2>
        <p>${data.overall_compliance.comment}</p>`;
      container.appendChild(summary);
    }
  }

  btn.addEventListener('click', () => {
    const url = document.getElementById('siteUrl').value.trim();
    if (!url) {
      output.textContent = 'Введите URL сайта';
      return;
    }
    output.textContent = 'Отправка запроса…';

    // Вставьте ваш реальный webhook n8n URL сюда
    const webhookUrl = 'https://n8n.logovo-club.ru:8443/webhook/webhook-check-site';

    fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    })
      .then(res => res.json())
      .then(data => {
        output.textContent = '';
        renderReport(data);
      })
      .catch(err => {
        console.error(err);
        output.textContent = 'Ошибка: ' + err.message;
      });
  });
});
