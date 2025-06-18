// Configurações principais de acessibilidade
let config = {
    tamanhoFonteBase: 12,
    tamanhoFonteAtual: 12,
    tamanhoFonteOriginal: null,
    incrementoFonte: 0.5,
    altoContraste: false,
    modoDark: false,
    leituraAtivada: false,
    speaking: false,
    seletoresTexto: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'a', 'button', 'li', 'td', 'th', 'label', 'input', 'textarea', 'div'],
    cookieExpiracao: 0,
    mapeamentoCores: {
        '#ffffff': '#121212',
        '#f8f9fa': '#121212',
        '#f1f3f5': '#1e1e1e',
        '#e9ecef': '#262626',
        '#ececec': '#000000',
        '#dee2e6': '#303030',
        '#000000': '#e0e0e0',
        '#343a40': '#d0d0d0',
        '#495057': '#b0b0b0',
        '#212529': '#f8f9fa'
    }
};

function salvarConfiguracoes() {
    const data = new Date();
    data.setTime(data.getTime() + (config.cookieExpiracao * 24 * 60 * 60 * 1000));
    const expires = "expires=" + data.toUTCString();
    document.cookie = `acessibilidade_tamanhoFonte=${config.tamanhoFonteAtual};${expires};path=/`;
    document.cookie = `acessibilidade_altoContraste=${config.altoContraste};${expires};path=/`;
    document.cookie = `acessibilidade_modoDark=${config.modoDark};${expires};path=/`;
}

function lerConfiguracoes() {
    const cookies = document.cookie.split(';');
    let configsCarregadas = false;
    cookies.forEach(cookie => {
        cookie = cookie.trim();
        if (cookie.startsWith('acessibilidade_tamanhoFonte=')) {
            config.tamanhoFonteAtual = parseFloat(cookie.split('=')[1]);
            configsCarregadas = true;
        }
        if (cookie.startsWith('acessibilidade_altoContraste=')) {
            config.altoContraste = cookie.split('=')[1] === 'true';
            configsCarregadas = true;
        }
        if (cookie.startsWith('acessibilidade_modoDark=')) {
            config.modoDark = cookie.split('=')[1] === 'true';
            configsCarregadas = true;
        }
    });
    return configsCarregadas;
}

function capturarTamanhoFonteOriginal() {
    if (config.tamanhoFonteOriginal === null) {
        const bodyStyle = window.getComputedStyle(document.body);
        config.tamanhoFonteOriginal = parseFloat(bodyStyle.fontSize) || config.tamanhoFonteBase;
        config.tamanhoFonteAtual = config.tamanhoFonteOriginal;
    }
}

function alterarFonte(delta) {
    if (config.tamanhoFonteOriginal === null) capturarTamanhoFonteOriginal();
    config.tamanhoFonteAtual += delta;
    config.tamanhoFonteAtual = Math.max(12, Math.min(28, config.tamanhoFonteAtual));

    const porcentagem = (config.tamanhoFonteAtual / config.tamanhoFonteOriginal) * 100;
    const estiloAcessibilidade = document.getElementById('estilo-acessibilidade') || criarEstiloAcessibilidade();
    let cssTexto = `html { font-size: ${porcentagem}% !important; } body { font-size: ${config.tamanhoFonteAtual}px !important; }`;

    config.seletoresTexto.forEach(seletor => {
        cssTexto += `${seletor} { font-size: calc(${config.tamanhoFonteAtual / config.tamanhoFonteOriginal}em * var(--tamanho-original-${seletor.replace(/[^a-zA-Z0-9]/g, '')}, 1em)) !important; }`;
    });

    estiloAcessibilidade.innerHTML = cssTexto;
    if (config.altoContraste) estiloAcessibilidade.innerHTML += gerarCSSContraste();
    if (config.modoDark) estiloAcessibilidade.innerHTML += gerarCSSModoDark();
    salvarConfiguracoes();
    exibirFeedback(`Fonte: ${Math.round(config.tamanhoFonteAtual)}px`);
}

function resetarFonte() {
    config.tamanhoFonteAtual = config.tamanhoFonteOriginal || 12;
    config.tamanhoFonteOriginal = null;
    const estilo = document.getElementById('estilo-acessibilidade');
    if (estilo) estilo.remove();
    salvarConfiguracoes();
    exibirFeedback('Fonte restaurada ao tamanho original');
}

function gerarCSSContraste() {
    return `
        body.alto-contraste, body.alto-contraste * {
            background-color: #000 !important;
            color: #fff !important;
            border-color: #fff !important;
        }
        body.alto-contraste a, body.alto-contraste button { color: #ffff00 !important; }
        body.alto-contraste a:hover, body.alto-contraste button:hover { color: #00ffff !important; }
        body.alto-contraste img { filter: grayscale(100%) contrast(120%) !important; opacity: 0.8 !important; }
        body.alto-contraste input, body.alto-contraste textarea {
            background-color: #333 !important;
            color: #fff !important;
            border: 1px solid #fff !important;
        }
        body.alto-contraste .header-wrapper-99, .rodape-99 {
            background-image: none !important;
            background-color: #000 !important;
        }
    `;
}

function gerarCSSModoDark() {
    let css = `
        body.modo-dark { background-color: #121212 !important; color: #e0e0e0 !important; }
        body.modo-dark h1, body.modo-dark h2, body.modo-dark h3, body.modo-dark h4, body.modo-dark h5, body.modo-dark h6 {
            color: #f5f5f5 !important;
        }
        body.modo-dark a { color: #90caf9 !important; }
        body.modo-dark a:hover { color: #42a5f5 !important; }
        body.modo-dark button, body.modo-dark input[type="button"], body.modo-dark input[type="submit"] {
            background-color: #333 !important; color: #e0e0e0 !important; border-color: #555 !important;
        }
        body.modo-dark img:not([src*=".svg"]) {
            filter: brightness(0.8) contrast(1.1) !important;
        }
    `;
    for (const corOriginal in config.mapeamentoCores) {
        css += `
            body.modo-dark [style*="background-color: ${corOriginal}"] {
                background-color: ${config.mapeamentoCores[corOriginal]} !important;
            }
            body.modo-dark [style*="color: ${corOriginal}"] {
                color: ${config.mapeamentoCores[corOriginal]} !important;
            }
        `;
    }
    return css;
}

function criarEstiloAcessibilidade() {
    const estilo = document.createElement('style');
    estilo.id = 'estilo-acessibilidade';
    estilo.type = 'text/css';
    document.head.appendChild(estilo);
    return estilo;
}

function alternarContraste() {
    config.altoContraste = !config.altoContraste;
    if (config.altoContraste && config.modoDark) {
        config.modoDark = false;
        document.body.classList.remove('modo-dark');
    }
    document.body.classList.toggle('alto-contraste', config.altoContraste);
    const estilo = document.getElementById('estilo-acessibilidade') || criarEstiloAcessibilidade();
    estilo.innerHTML = (config.altoContraste ? gerarCSSContraste() : '') + (config.modoDark ? gerarCSSModoDark() : '');
    salvarConfiguracoes();
    exibirFeedback(config.altoContraste ? 'Alto contraste ativado' : 'Alto contraste desativado');
}

function alternarModoDark() {
    config.modoDark = !config.modoDark;
    if (config.modoDark && config.altoContraste) {
        config.altoContraste = false;
        document.body.classList.remove('alto-contraste');
    }
    document.body.classList.toggle('modo-dark', config.modoDark);
    const estilo = document.getElementById('estilo-acessibilidade') || criarEstiloAcessibilidade();
    estilo.innerHTML = (config.modoDark ? gerarCSSModoDark() : '') + (config.altoContraste ? gerarCSSContraste() : '');
    salvarConfiguracoes();
    exibirFeedback(config.modoDark ? 'Modo escuro ativado' : 'Modo escuro desativado');
}

function exibirFeedback(mensagem) {
    let feedback = document.getElementById('acessibilidade-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'acessibilidade-feedback';
        feedback.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background-color: #004366; color: white;
            padding: 10px 20px; border-radius: 5px;
            z-index: 9999; opacity: 0;
            transition: opacity 0.3s ease; font-size: 16px;
        `;
        document.body.appendChild(feedback);
    }
    feedback.textContent = mensagem;
    feedback.style.opacity = '1';
    clearTimeout(feedback.timeout);
    feedback.timeout = setTimeout(() => feedback.style.opacity = '0', 1000);
}

function inicializarAcessibilidade() {
    capturarTamanhoFonteOriginal();
    criarEstiloAcessibilidade();
    const configs = lerConfiguracoes();
    if (configs) {
        alterarFonte(0);
        if (config.altoContraste) {
            document.body.classList.add('alto-contraste');
            document.getElementById('estilo-acessibilidade').innerHTML += gerarCSSContraste();
        }
        if (config.modoDark) {
            document.body.classList.add('modo-dark');
            document.getElementById('estilo-acessibilidade').innerHTML += gerarCSSModoDark();
        }
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarAcessibilidade);
} else {
    inicializarAcessibilidade();
}

// Leitura de texto com mouse
function toggleLeitura() {
    config.leituraAtivada = !config.leituraAtivada;
    exibirFeedback(config.leituraAtivada ? 'Leitura ativada' : 'Leitura desativada');
    if (!config.leituraAtivada) speechSynthesis.cancel();
}

function lerTexto(texto) {
    if (!('speechSynthesis' in window)) return;
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    speechSynthesis.speak(utterance);
}

let debounceTimeout;
document.addEventListener('mousemove', (e) => {
    if (!config.leituraAtivada || config.speaking) return;
    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        if (el && el.textContent.trim().length > 3) {
            lerTexto(el.textContent.trim());
        }
    }, 800);
});

// Feedback visual
function exibirFeedback(msg) {
    let box = document.getElementById('acessibilidade-feedback');
    if (!box) {
        box = document.createElement('div');
        box.id = 'acessibilidade-feedback';
        box.style.cssText = `
            position: fixed; bottom: 20px; right: 20px;
            background-color: #004366; color: white;
            padding: 10px 20px; border-radius: 5px;
            z-index: 9999; opacity: 0;
            transition: opacity 0.3s ease; font-size: 16px;
        `;
        document.body.appendChild(box);
    }
    box.textContent = msg;
    box.style.opacity = '1';
    clearTimeout(box.timeout);
    box.timeout = setTimeout(() => box.style.opacity = '0', 3000);
}


window.alterarFonte = alterarFonte;
window.resetarFonte = resetarFonte;
window.alternarContraste = alternarContraste;
window.alternarModoDark = alternarModoDark;
window.toggleLeitura = toggleLeitura;



