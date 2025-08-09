// script.js

document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% do elemento visível para acionar
    };

    // Callback para o IntersectionObserver
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe 'show' e remove a classe 'hide-initially'
                entry.target.classList.add('show');
                entry.target.classList.remove('hide-initially'); // Remove a classe que esconde
                observer.unobserve(entry.target); // Deixa de observar depois de animar
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Seleciona todos os elementos que devem ser animados ao rolar
    // Inclui seções e cards de artigo
    const animatedElements = document.querySelectorAll('.animated-element, .animated-item');

    animatedElements.forEach((element, index) => {
        // Adiciona a classe para esconder inicialmente APENAS se não for o h1 do hero
        // O h1 do hero já tem a animação no CSS e não queremos escondê-lo via JS
        if (element.tagName !== 'H1' || !element.closest('.hero')) {
             element.classList.add('hide-initially');
        }

        // Se for um item da grade, adiciona um pequeno atraso para efeito cascata
        if (element.classList.contains('animated-item')) {
            element.style.transitionDelay = `${index * 0.1}s`; // Atraso de 0.1s para cada item
        } else if (element.classList.contains('animated-element')) {
            // Atraso para seções completas, se necessário, ou apenas deixa como está para as que não têm 'animated-item'
            element.style.transitionDelay = '0s'; // Atraso padrão para seções
        }

        observer.observe(element);
    });

    // Animação para o h1 do Hero (que já tem animação CSS)
    const heroH1 = document.querySelector('.hero h1.animated-element');
    if (heroH1) {
        heroH1.style.animation = 'fadeInSlideUp 1s ease forwards'; // Garante que a animação CSS seja aplicada
    }
});
