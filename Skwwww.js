    function outputTo(consoleId, message) {
        const el = document.getElementById(consoleId);
        if (el) {
            const time = new Date().toLocaleTimeString();
            el.innerHTML = `[${time}] ➤ ${message}<br>${el.innerHTML.slice(0, 800)}`;
            if (el.innerHTML.length > 1500) el.innerHTML = el.innerHTML.slice(0, 1200) + '...<br>▼';
        }
    }

    const elemClient = document.getElementById('elem');
    document.getElementById('btnClientMetrics').addEventListener('click', () => {
        const w = elemClient.clientWidth;
        const h = elemClient.clientHeight;
        outputTo('consoleClient', `clientWidth = ${w}px, clientHeight = ${h}px (включает контент + padding, без полосы прокрутки и border)`);
    });

    const elemOffset = document.getElementById('elemOffset');
    document.getElementById('btnOffsetMetrics').addEventListener('click', () => {
        const ow = elemOffset.offsetWidth;
        const oh = elemOffset.offsetHeight;
        outputTo('consoleOffset', `offsetWidth = ${ow}px, offsetHeight = ${oh}px (включает border + padding + контент + полосу прокрутки)`);
    });
    document.getElementById('btnOffsetMinusClient').addEventListener('click', () => {
        const diffWidth = elemOffset.offsetWidth - elemOffset.clientWidth;
        outputTo('consoleOffset', `Теория (№2⊗jsSpMEFS): offsetWidth - clientWidth = ${diffWidth}px. Это сумма вертикальной полосы прокрутки + левой/правой границы (border).`);
    });

    const elemScroll = document.getElementById('elemScroll');
    document.getElementById('btnScrollMetrics').addEventListener('click', () => {
        const sw = elemScroll.scrollWidth;
        const sh = elemScroll.scrollHeight;
        outputTo('consoleScroll', `scrollWidth = ${sw}px, scrollHeight = ${sh}px (полный размер контента, включая скрытую часть)`);
    });
    document.getElementById('btnScrollMinusOffset').addEventListener('click', () => {
        const hiddenPart = elemScroll.scrollHeight - elemScroll.offsetHeight;
        outputTo('consoleScroll', `Теория (№2⊗jsSpMESS): scrollHeight - offsetHeight = ${hiddenPart}px. Это высота спрятанной под прокруткой части контента.`);
    });

    const elemScrl = document.getElementById('elemScrl');
   
    document.getElementById('btnGetScrollTop').addEventListener('click', () => {
        outputTo('consoleScrollPos', `scrollTop (вертикальная прокрутка) = ${elemScrl.scrollTop}px`);
    });
    document.getElementById('btnCheckScrolled').addEventListener('click', () => {
        const scrolled = elemScrl.scrollTop > 0;
        outputTo('consoleScrollPos', `Прокручен ли по вертикали? ${scrolled ? 'Да, scrollTop > 0' : 'Нет, элемент в начальной позиции'}`);
    });
    document.getElementById('btnScrollToEndFull').addEventListener('click', () => {
        elemScrl.scrollTop = elemScrl.scrollHeight;
        const fullScrollValue = elemScrl.scrollHeight - elemScrl.clientHeight;
        outputTo('consoleScrollPos', `Прокрутили до конца. Полная прокрутка (scrollHeight - clientHeight) = ${fullScrollValue}px`);
    });
    document.getElementById('btnCalcVisibleRemain').addEventListener('click', () => {
        const fullScroll = elemScrl.scrollHeight - elemScrl.clientHeight;
        const result = elemScrl.scrollHeight - fullScroll;
        outputTo('consoleScrollPos', `№4: scrollHeight - (scrollHeight - clientHeight) = ${result}px, что равно clientHeight = ${elemScrl.clientHeight}px (видимая область контента).`);
    });
    document.getElementById('btnComplexEquation').addEventListener('click', () => {
        const val = elemScrl.scrollHeight - (elemScrl.offsetHeight + elemScrl.scrollTop);
        outputTo('consoleScrollPos', `№5: scrollHeight - (offsetHeight + scrollTop) = ${val}px. (Обычно получается 0, если полоса прокрутки учтена корректно).`);
    });

    const elemChange = document.getElementById('elemChange');
    document.getElementById('btnSet100_50').addEventListener('click', () => {
        elemChange.scrollTop = 100;
        elemChange.scrollLeft = 50;
        outputTo('consoleScrollPos', `Установлена прокрутка: scrollTop = 100px, scrollLeft = 50px (на элемент "Управление прокруткой")`);
    });
    document.getElementById('btnAdd50Down').addEventListener('click', () => {
        elemChange.scrollTop = elemChange.scrollTop + 50;
        outputTo('consoleScrollPos', `Прибавили 50px вниз, новое значение scrollTop = ${elemChange.scrollTop}px`);
    });
    document.getElementById('btnScrollToTop').addEventListener('click', () => {
        elemChange.scrollTop = 0;
        elemChange.scrollLeft = 0;
        outputTo('consoleScrollPos', `Прокрутка в самый верх (scrollTop = 0, scrollLeft = 0)`);
    });
    document.getElementById('btnScrollToBottom').addEventListener('click', () => {
        elemChange.scrollTop = elemChange.scrollHeight - elemChange.clientHeight;
        outputTo('consoleScrollPos', `Прокрутка в самый низ: scrollTop = ${elemChange.scrollTop}px`);
    });

    const elemEnd = document.getElementById('elemEnd');
    document.getElementById('btnScrollToVeryBottom').addEventListener('click', () => {
        elemEnd.scrollTop = elemEnd.scrollHeight - elemEnd.clientHeight;
        outputTo('consoleEnd', `Элемент прокручен до самого низа. scrollTop = ${elemEnd.scrollTop}px`);
    });
    document.getElementById('btnCheckEndScrolled').addEventListener('click', () => {
        const isBottom = Math.abs((elemEnd.scrollHeight - elemEnd.clientHeight) - elemEnd.scrollTop) < 1;
        outputTo('consoleEnd', `Прокручен ли элемент до конца? ${isBottom ? '✅ ДА, элемент в самом низу' : '❌ НЕТ, ещё есть место для прокрутки'}`);
    });

    const elemExpand = document.getElementById('elemExpand');
    document.getElementById('btnExpandHeight').addEventListener('click', () => {
        const fullH = elemExpand.scrollHeight;
        elemExpand.style.height = fullH + 'px';
        outputTo('consoleExpand', `Распахнули элемент: новая высота = ${fullH}px (scrollHeight). При необходимости можно также ширину через scrollWidth.`);
    });
    document.getElementById('btnResetSize').addEventListener('click', () => {
        elemExpand.style.height = '150px';
        elemExpand.style.width = '300px';
        outputTo('consoleExpand', `Сброс размеров: 300px x 150px (исходные)`);
    });

    document.getElementById('btnGetScrollbarWidth').addEventListener('click', () => {
        const div = document.createElement('div');
        div.style.overflowY = 'scroll';
        div.style.width = '50px';
        div.style.height = '50px';
        div.style.position = 'absolute';
        div.style.top = '-9999px';
        document.body.append(div);
        const scrollWidth = div.offsetWidth - div.clientWidth;
        div.remove();
        outputTo('consoleScrollWidth', `Ширина полосы прокрутки в вашем браузере: ${scrollWidth}px`);
    });

    outputTo('consoleClient', 'Готово. Нажмите любую кнопку, чтобы увидеть метрики.');
    outputTo('consoleOffset', 'Нажмите кнопку для offset-метрик.');
    outputTo('consoleScroll', 'scrollWidth / scrollHeight готовы.');
    outputTo('consoleScrollPos', 'Ожидание действий с прокруткой...');
    outputTo('consoleEnd', 'Проверка прокрутки до конца.');
    outputTo('consoleExpand', 'Нажмите "Распахнуть" для изменения высоты.');
    outputTo('consoleScrollWidth', 'Узнайте ширину скроллбара.');