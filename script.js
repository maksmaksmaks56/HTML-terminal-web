document.addEventListener('DOMContentLoaded', () => {
    const terminalOutput = document.getElementById('terminalOutput');
    const terminalInput = document.getElementById('terminalInput');

    // Функція для додавання рядка у вивід терміналу
    function writeToTerminal(text, type = 'output') {
        const line = document.createElement('div');
        if (type === 'input') {
            line.innerHTML = `<span class="prompt-symbol">$</span> ${text}`;
        } else if (type === 'result') {
            line.innerHTML = `<span class="prompt-symbol">●|¢</span> ${text}`;
        } else if (type === 'error') {
            line.innerHTML = `<span class="error-line">●|¢ ${text}</span>`;
        } else { // Для звичайних повідомлень
            line.textContent = text;
        }
        terminalOutput.appendChild(line);
        // Прокрутка донизу, щоб завжди бачити останній вивід
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    // Початкове привітання (опціонально)
    writeToTerminal("Ласкаво просимо до HTML-терміналу!");
    writeToTerminal("Введіть HTML-код і натисніть Enter, щоб побачити результат.");
    writeToTerminal("Спробуйте: <p>Привіт, світ!</p>");


    // Обробник натискання Enter у полі введення
    terminalInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const command = terminalInput.value.trim();
            writeToTerminal(command, 'input'); // Відображаємо введену команду як "input"

            if (command) {
                // Спробуємо "виконати" HTML
                try {
                    // Створюємо тимчасовий елемент div, щоб вставити HTML
                    const tempDiv = document.createElement('div');
                    tempDiv.innerHTML = command; // Вставляємо HTML, браузер його парсить

                    // Якщо HTML коректний, відображаємо його вміст як результат
                    // Важливо: це лише покаже HTML, як він *буде* виглядати.
                    // Якщо ви хочете, щоб він реально вставився на сторінку
                    // поза межами терміналу, потрібна інша логіка.
                    writeToTerminal(tempDiv.innerHTML, 'result');
                    // Або, якщо хочете бачити саме вихідний HTML-код:
                    // writeToTerminal(escapeHTML(command), 'result');

                } catch (e) {
                    writeToTerminal(`Помилка: Некоректний HTML. ${e.message}`, 'error');
                }
            } else {
                writeToTerminal("Введіть HTML-код.", 'error');
            }

            terminalInput.value = ''; // Очищуємо поле введення
        }
    });

    // Функція для екранування HTML-символів (щоб HTML відображався як текст, а не виконувався)
    // Використовуйте цю функцію, якщо хочете показувати HTML-код, а не його візуалізацію
    function escapeHTML(str) {
        const div = document.createElement('div');
        div.appendChild(document.createTextNode(str));
        return div.innerHTML;
    }

    // Фокус на полі введення при завантаженні сторінки
    terminalInput.focus();
});
