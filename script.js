// Configuração WhatsApp
const whatsappNumber = '5547988862944'; // Substitua pelo seu número do WhatsApp

// Função para formatar moeda
function formatCurrency(value) {
    return parseFloat(value).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Função para abrir WhatsApp com mensagem automática
function openWhatsApp(event) {
    event.preventDefault();
    
    // Obtém os dados do produto clicado
    const button = event.currentTarget;
    const product = button.getAttribute('data-product');
    const price = button.getAttribute('data-price');
    
    // Obtém a hora do dia para personalizar a mensagem
    const now = new Date();
    const hour = now.getHours();
    let greeting = 'Olá';
    
    if (hour >= 6 && hour < 12) {
        greeting = 'Bom dia';
    } else if (hour >= 12 && hour < 18) {
        greeting = 'Boa tarde';
    } else {
        greeting = 'Boa noite';
    }
    
    // Cria mensagem personalizada para cada produto
    const message = `${greeting}! 👋 

Tenho interesse em comprar:

*${product}*
💰 Valor: *${formatCurrency(price)}*

Poderia me passar mais informações sobre este produto?`;

    // Abre WhatsApp Web/App com a mensagem
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Tracking de evento (se analytics estiver configurado)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'whatsapp_click', {
            'event_category': 'Engagement',
            'event_label': product,
            'value': parseFloat(price)
        });
    }
    
    return false;
}


// Contador Regressivo
function initializeCountdown() {
    const countdownElements = [
        { hours: document.getElementById('hours'), minutes: document.getElementById('minutes'), seconds: document.getElementById('seconds') },
        { hours: document.getElementById('footer-hours'), minutes: document.getElementById('footer-minutes'), seconds: document.getElementById('footer-seconds') }
    ];

    // Define o tempo final (24 horas a partir de agora)
    let endTime = new Date().getTime() + (24 * 60 * 60 * 1000);

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;

        if (distance < 0) {
            // Reset para mais 24 horas
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElements.forEach(element => {
            if (element.hours) {
                element.hours.textContent = String(hours).padStart(2, '0');
                element.minutes.textContent = String(minutes).padStart(2, '0');
                element.seconds.textContent = String(seconds).padStart(2, '0');
            }
        });
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Simulação de Escassez (Licenças Restantes)
function updateLicensesLeft() {
    const licensesElement = document.getElementById('licenses-left');
    let licenses = parseInt(licensesElement.textContent);
    
    // Diminui aleatoriamente entre 1-3 licenças a cada 30-60 segundos
    setInterval(() => {
        if (licenses > 2) {
            licenses -= Math.floor(Math.random() * 3) + 1;
            licensesElement.textContent = licenses;
            
            // Adiciona efeito visual
            licensesElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                licensesElement.style.transform = 'scale(1)';
            }, 300);
        }
    }, Math.random() * 30000 + 30000);
}

// Prova Social em Tempo Real
const customers = [
    { name: 'Lucas', city: 'São Paulo', product: 'Office 2021' },
    { name: 'Ana', city: 'Rio de Janeiro', product: 'Office 2024' },
    { name: 'Pedro', city: 'Belo Horizonte', product: 'Office 2019' },
    { name: 'Mariana', city: 'Curitiba', product: 'Office 2021' },
    { name: 'Carlos', city: 'Porto Alegre', product: 'Office 2024' },
    { name: 'Julia', city: 'Brasília', product: 'Office 2019' },
    { name: 'Rafael', city: 'Salvador', product: 'Office 2021' },
    { name: 'Fernanda', city: 'Recife', product: 'Office 2024' },
    { name: 'Eduardo', city: 'Fortaleza', product: 'Office 2019' },
    { name: 'Patrícia', city: 'Manaus', product: 'Office 2024' },
    { name: 'Beatriz', city: 'Florianópolis', product: 'Office 2021' },
    { name: 'Gabriel', city: 'Goiânia', product: 'Office 2019' },
    { name: 'Letícia', city: 'Natal', product: 'Office 2021' },
    { name: 'João', city: 'Vitória', product: 'Office 2024' },
    { name: 'Sofia', city: 'Campinas', product: 'Office 2019' },
    { name: 'Gustavo', city: 'Belém', product: 'Office 2021' },
    { name: 'Camila', city: 'Uberlândia', product: 'Office 2019' },
    { name: 'Marcos', city: 'João Pessoa', product: 'Office 2024' },
    { name: 'Aline', city: 'São Luís', product: 'Office 2021' },
    { name: 'Vinícius', city: 'Campo Grande', product: 'Office 2019' },
    { name: 'Tatiane', city: 'Cuiabá', product: 'Office 2024' },
    { name: 'Diego', city: 'Niterói', product: 'Office 2016' },
    { name: 'Paulo', city: 'Aracaju', product: 'Office 2013' },
    { name: 'Larissa', city: 'Maceió', product: 'Office 2021' },
    { name: 'Felipe', city: 'Santos', product: 'Office 2019' },
    { name: 'Cíntia', city: 'Joinville', product: 'Office 2024' },
    { name: 'Samuel', city: 'Piracicaba', product: 'Office 2021' }
];

function updateProofSocial() {
    const proofContainer = document.querySelector('.proof-social .proof-item span');
    
    setInterval(() => {
        const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
        const timeAgo = Math.floor(Math.random() * 10) + 1;
        
        proofContainer.innerHTML = `<strong>${randomCustomer.name}</strong> de ${randomCustomer.city} acabou de comprar o ${randomCustomer.product}`;
        
        // Efeito de fade
        proofContainer.style.opacity = '0';
        setTimeout(() => {
            proofContainer.style.opacity = '1';
        }, 300);
    }, 15000); // Atualiza a cada 15 segundos
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Fecha todos os outros
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Abre/fecha o clicado
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// Chat Widget
function initializeChat() {
    const chatToggle = document.getElementById('chatToggle');
    const chatContainer = document.getElementById('chatContainer');
    const chatClose = document.getElementById('chatClose');
    const chatSend = document.getElementById('chatSend');
    const chatInput = document.getElementById('chatInput');
    const chatMessages = document.getElementById('chatMessages');
    
    let isOpen = false;
    
    chatToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        chatContainer.classList.toggle('active', isOpen);
    });
    
    chatClose.addEventListener('click', () => {
        isOpen = false;
        chatContainer.classList.remove('active');
    });
    
    function addMessage(text, isBot = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${isBot ? 'bot' : 'user'}`;
        
        const p = document.createElement('p');
        p.textContent = text;
        messageDiv.appendChild(p);
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        return messageDiv;
    }
    
    function botResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();
        let response = '';
        
        if (lowerMessage.includes('preço') || lowerMessage.includes('quanto') || lowerMessage.includes('valor')) {
            response = 'Nossos preços variam conforme a versão. O Office 2024 está por apenas R$ 149,90 (era R$ 899,00)! Qual versão te interessa?';
        } else if (lowerMessage.includes('tempo') || lowerMessage.includes('entrega') || lowerMessage.includes('demora')) {
            response = 'Você recebe os códigos de ativação em até 5 minutos após a confirmação do pagamento! Para PIX, é quase instantâneo! 🚀';
        } else if (lowerMessage.includes('original') || lowerMessage.includes('genuíno') || lowerMessage.includes('oficial')) {
            response = 'Sim! Todos os nossos produtos são 100% originais da Microsoft, com códigos oficiais. Garantimos isso! ✅';
        } else if (lowerMessage.includes('suporte') || lowerMessage.includes('ajuda') || lowerMessage.includes('instalação')) {
            response = 'Oferecemos suporte técnico vitalício! Nossa equipe está pronta para ajudar na instalação e ativação. 📞';
        } else if (lowerMessage.includes('garantia') || lowerMessage.includes('reembolso')) {
            response = 'Temos 7 dias de garantia! Se não ficar satisfeito por qualquer motivo, devolvemos 100% do seu dinheiro. 💯';
        } else if (lowerMessage.includes('olá') || lowerMessage.includes('oi') || lowerMessage.includes('bom dia') || lowerMessage.includes('boa tarde')) {
            response = 'Olá! 👋 Como posso ajudar você hoje? Posso tirar dúvidas sobre preços, entrega, garantia e muito mais!';
        } else {
            response = 'Posso ajudar com informações sobre preços, entrega, garantia, instalação e muito mais! Qual sua dúvida? 😊';
        }
        
        setTimeout(() => {
            addMessage(response, true);
        }, 1000);
    }
    
    function sendMessage() {
        const message = chatInput.value.trim();
        if (!message) return;
        
        addMessage(message, false);
        chatInput.value = '';
        
        botResponse(message);
    }
    
    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Smooth Scroll para âncoras
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Animação de entrada ao scroll
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll('.benefit-card, .testimonial-card, .product-card, .guarantee-card, .faq-item');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Atualização dinâmica do banner de urgência
function updateUrgencyBanner() {
    const urgencyTexts = [
        '⚡ OFERTA VÁLIDA APENAS HOJE! Restam apenas',
        '🔥 ÚLTIMAS HORAS! Restam apenas',
        '⏰ PROMOÇÃO RELÂMPAGO! Apenas',
        '🚨 OFERTA ESPECIAL! Restam somente'
    ];
    
    const urgencyElement = document.querySelector('#urgency-text');
    
    setInterval(() => {
        const randomText = urgencyTexts[Math.floor(Math.random() * urgencyTexts.length)];
        const licensesElement = document.getElementById('licenses-left');
        const licenses = licensesElement.textContent;
        
        urgencyElement.innerHTML = `${randomText} <span id="licenses-left">${licenses}</span> licenças disponíveis nesta promoção!`;
    }, 30000);
}

// Efeito de parallax suave no hero
function initializeParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.product-showcase');
        if (heroImage && scrolled < 600) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
}

// Simulação de atividade (visitas, compras)
function simulateActivity() {
    const activityMessages = [
        'Maria acabou de comprar o Office 2024',
        'João adquiriu o Office 2021 há 2 minutos',
        'Sofia comprou o combo Office + Windows',
        'Ricardo acabou de garantir sua licença',
        'Amanda adquiriu o Office 2019'
    ];
    
    setInterval(() => {
        if (Math.random() > 0.5) { // 50% de chance
            const message = activityMessages[Math.floor(Math.random() * activityMessages.length)];
            // Pode ser expandido para mostrar notificações toast
            console.log('Atividade:', message);
        }
    }, 20000);
}

// CTA Sticky
function initializeStickyCTA() {
    const stickyCTA = document.getElementById('stickyCta');
    const stickyClose = document.getElementById('stickyClose');
    
    // Mostra o CTA após scroll de 300px
    let shown = false;
    window.addEventListener('scroll', () => {
        if (!shown && window.pageYOffset > 300) {
            stickyCTA.classList.add('show');
            shown = true;
            
            // Salva no localStorage que o usuário já viu
            localStorage.setItem('stickyCtaShown', 'true');
        }
    });
    
    // Fecha o CTA
    if (stickyClose) {
        stickyClose.addEventListener('click', () => {
            stickyCTA.classList.remove('show');
        });
    }
    
    // Verifica se já foi fechado anteriormente
    if (localStorage.getItem('stickyCtaClosed') === 'true') {
        stickyCTA.style.display = 'none';
    } else if (stickyClose) {
        stickyClose.addEventListener('click', () => {
            localStorage.setItem('stickyCtaClosed', 'true');
        });
    }
}

// Contador de vendas do dia
function updateSalesToday() {
    const salesElement = document.getElementById('sales-today');
    if (salesElement) {
        let sales = parseInt(salesElement.textContent);
        
        // Incrementa aleatoriamente a cada 30-60 segundos
        setInterval(() => {
            sales += Math.floor(Math.random() * 3) + 1;
            salesElement.textContent = sales;
            
            // Efeito visual
            salesElement.style.transform = 'scale(1.2)';
            setTimeout(() => {
                salesElement.style.transform = 'scale(1)';
            }, 300);
        }, Math.random() * 30000 + 30000);
    }
}

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeCountdown();
    updateLicensesLeft();
    updateProofSocial();
    initializeFAQ();
    initializeSmoothScroll();
    initializeScrollAnimations();
    updateUrgencyBanner();
    initializeParallax();
    simulateActivity();
    initializeStickyCTA();
    updateSalesToday();
    initializeExitIntent();
    initializeSocialProofToast();
    initializeTestimonials();
    
    // Adiciona efeito de hover nos cards de produto
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Adiciona classe para animação de carregamento
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Cálculo dinâmico de economia
function calculateEconomy() {
    const monthlyCost = 39.90;
    const years = 8;
    const totalCost = monthlyCost * 12 * years;
    const oneTimeCost = 149.90; // Preço do Office 2024
    const savings = totalCost - oneTimeCost;
    
    const economyAmount = document.querySelector('.economy-amount');
    if (economyAmount) {
        economyAmount.textContent = `R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
}

// Calculadora de Economia Interativa
function calculateSavings() {
    const years = parseInt(document.getElementById('calcYears').value) || 8;
    const monthlyPrice = parseFloat(document.getElementById('calcMonthlyPrice').value) || 39.90;
    const oneTimeCost = 149.90;
    
    const totalCost = monthlyPrice * 12 * years;
    const savings = totalCost - oneTimeCost;
    
    const economyResult = document.getElementById('economyResult');
    if (economyResult) {
        economyResult.innerHTML = `
            <div class="economy-item">
                <span class="economy-amount">R$ ${savings.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                <span class="economy-label">em ${years} ${years === 1 ? 'ano' : 'anos'} vs. Microsoft 365</span>
            </div>
        `;
        
        // Animação
        economyResult.style.opacity = '0';
        setTimeout(() => {
            economyResult.style.opacity = '1';
            economyResult.style.transition = 'opacity 0.5s ease';
        }, 10);
    }
    
    // Tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_used', {
            'event_category': 'Engagement',
            'years': years,
            'savings': savings
        });
    }
}

// Popup Exit Intent
function initializeExitIntent() {
    const exitPopup = document.getElementById('exitIntentPopup');
    const exitPopupClose = document.getElementById('exitPopupClose');
    const exitPopupDismiss = document.getElementById('exitPopupDismiss');
    
    if (!exitPopup) return;
    
    let exitIntentShown = localStorage.getItem('exitIntentShown') === 'true';
    
    // Detecta movimento do mouse para sair
    document.addEventListener('mouseout', (e) => {
        if (!exitIntentShown && !e.toElement && !e.relatedTarget && e.clientY < 10) {
            exitIntentShown = true;
            exitPopup.classList.add('show');
            localStorage.setItem('exitIntentShown', 'true');
            
            // Tracking
            if (typeof gtag !== 'undefined') {
                gtag('event', 'exit_intent_shown', {
                    'event_category': 'Engagement'
                });
            }
        }
    });
    
    // Fechar popup
    if (exitPopupClose) {
        exitPopupClose.addEventListener('click', () => {
            exitPopup.classList.remove('show');
        });
    }
    
    if (exitPopupDismiss) {
        exitPopupDismiss.addEventListener('click', () => {
            exitPopup.classList.remove('show');
        });
    }
    
    // Fechar ao clicar fora
    exitPopup.addEventListener('click', (e) => {
        if (e.target === exitPopup) {
            exitPopup.classList.remove('show');
        }
    });
}

// Toast Notificações
function showToast(message, type = 'success', duration = 5000) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
    
    toast.innerHTML = `
        <div class="toast-icon">
            <i class="fas ${icon}"></i>
        </div>
        <div class="toast-content">
            ${message}
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    // Remove após duração
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(400px)';
        toast.style.transition = 'all 0.4s ease';
        setTimeout(() => {
            toast.remove();
        }, 400);
    }, duration);
}

// Notificações Toast de Prova Social
function initializeSocialProofToast() {
    const messages = [
        '<strong>Maria acabou de comprar</strong><span>Office 2024 há 2 minutos</span>',
        '<strong>João adquiriu</strong><span>Office 2021 há 5 minutos</span>',
        '<strong>Sofia comprou</strong><span>Combo Office + Windows há 8 minutos</span>',
        '<strong>Ricardo garantiu</strong><span>Office 2019 há 12 minutos</span>',
        '<strong>Amanda adquiriu</strong><span>Office 2024 há 15 minutos</span>',
        '<strong>Pedro comprou</strong><span>Office 2021 há 18 minutos</span>'
    ];
    
    // Mostra primeira notificação após 10 segundos
    setTimeout(() => {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        showToast(randomMessage, 'success', 6000);
    }, 10000);
    
    // Mostra notificações aleatórias a cada 30-60 segundos
    setInterval(() => {
        if (Math.random() > 0.4) { // 60% de chance
            const randomMessage = messages[Math.floor(Math.random() * messages.length)];
            showToast(randomMessage, 'success', 6000);
        }
    }, Math.random() * 30000 + 30000); // Entre 30 e 60 segundos
}

// Melhorar Testimonials com Avatares
function initializeTestimonials() {
    const testimonialAvatars = document.querySelectorAll('.testimonial-avatar');
    
    testimonialAvatars.forEach(avatar => {
        // Gera avatar com inicial baseado no nome
        const nameElement = avatar.closest('.testimonial-card')?.querySelector('h4');
        if (nameElement) {
            const name = nameElement.textContent.trim();
            const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
            
            // Cores aleatórias mas consistentes
            const colors = [
                '#2563EB', '#DC2626', '#059669', '#D97706', '#7C3AED', 
                '#DB2777', '#0891B2', '#BE123C', '#065F46', '#92400E'
            ];
            const colorIndex = name.length % colors.length;
            const bgColor = colors[colorIndex];
            
            avatar.innerHTML = `<span style="background: ${bgColor}; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px;">${initials}</span>`;
        }
    });
}

// Chama o cálculo quando a página carregar
document.addEventListener('DOMContentLoaded', calculateEconomy);

// Adiciona confirmação visual ao clicar em CTAs
document.querySelectorAll('.btn-primary, .btn-product, .btn-combo, .btn-footer-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Adiciona feedback visual
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Aqui você pode adicionar redirecionamento para página de checkout
        // ou abrir modal de compra
        console.log('CTA clicado:', this.textContent);
    });
});

// Detecção de saída (exit intent) - pode ser usado para mostrar popup
let exitIntentShown = false;

document.addEventListener('mouseout', (e) => {
    if (!exitIntentShown && !e.toElement && !e.relatedTarget) {
        exitIntentShown = true;
        // Aqui você pode adicionar um popup de oferta especial
        console.log('Exit intent detectado');
    }
});

// Tracking de eventos para analytics (exemplo)
function trackEvent(category, action, label) {
    // Integre com Google Analytics, Facebook Pixel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    
    console.log('Event tracked:', { category, action, label });
}

// Rastreia cliques em CTAs
document.querySelectorAll('a[href="#checkout"], .btn-primary, .btn-product').forEach(element => {
    element.addEventListener('click', () => {
        trackEvent('CTA', 'click', element.textContent.trim());
    });
});

// Rastreia visualizações de seções
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            trackEvent('Section', 'view', entry.target.id || entry.target.className);
        }
    });
}, { threshold: 0.5 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

