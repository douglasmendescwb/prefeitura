# Sistema de Acessibilidade Web

Sistema completo de acessibilidade para sites, incluindo recursos de ajuste de fonte, modo escuro, alto contraste e leitura por voz. Desenvolvido seguindo as diretrizes WCAG 2.1 para tornar sites mais acessíveis.

## 🎯 Funcionalidades

- **Ajuste de Fonte**: Aumentar/diminuir/resetar tamanho da fonte (12px - 28px)
- **Alto Contraste**: Modo preto/branco para melhor visibilidade
- **Modo Escuro**: Interface dark mode com cores suavizadas
- **Leitura por Voz**: Leitura automática de textos ao passar o mouse
- **Persistência**: Configurações salvas em cookies
- **Feedback Visual**: Notificações das ações realizadas
- **Responsivo**: Funciona em desktop e mobile

## 🚀 Instalação

### 1. Instalação Básica

Adicione o script antes do `</body>`:

```html
<script src="acessibilidade.js"></script>
```

### 2. Barra de Acessibilidade (Opcional)

Adicione o HTML da barra e o CSS no seu layout:

```html
<!-- Barra de Acessibilidade -->
<div class="acessibilidade-barra">
    <div class="centro-acessibilidade">
        <button onclick="alterarFonte(-0.5)" title="Diminuir fonte">
            <img src="icons/diminuir-fonte.svg" alt="A-">
        </button>
        <button onclick="alterarFonte(0.5)" title="Aumentar fonte">
            <img src="icons/aumentar-fonte.svg" alt="A+">
        </button>
        <button onclick="resetarFonte()" title="Fonte normal">
            <img src="icons/resetar-fonte.svg" alt="A">
        </button>
        <button onclick="alternarContraste()" title="Alto contraste">
            <img src="icons/contraste.svg" alt="Contraste">
        </button>
        <button onclick="alternarModoDark()" title="Modo escuro">
            <img src="icons/modo-dark.svg" alt="Modo Escuro">
        </button>
        <button onclick="toggleLeitura()" title="Leitura por voz">
            <img src="icons/audio.svg" alt="Áudio">
        </button>
    </div>
</div>

<!-- CSS -->
<link rel="stylesheet" href="acessibilidade.css">
```

## 📋 Configurações

### Configuração Básica

```javascript
let config = {
    tamanhoFonteBase: 12,           // Tamanho base da fonte (px)
    incrementoFonte: 0.5,           // Incremento por clique (px)
    cookieExpiracao: 30,            // Dias para expirar cookies (0 = sessão)
    altoContraste: false,           // Estado inicial do contraste
    modoDark: false,                // Estado inicial do modo escuro
    leituraAtivada: false           // Estado inicial da leitura
};
```

### Seletores de Texto Customizados

```javascript
config.seletoresTexto = [
    'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
    'span', 'a', 'button', 'li', 'td', 'th', 
    'label', 'input', 'textarea', 'div',
    '.seu-seletor-customizado'
];
```

### Mapeamento de Cores para Modo Escuro

```javascript
config.mapeamentoCores = {
    '#ffffff': '#121212',  // Branco -> Cinza escuro
    '#f8f9fa': '#121212',  // Cinza claro -> Cinza escuro
    '#000000': '#e0e0e0',  // Preto -> Cinza claro
    // Adicione suas cores específicas
    '#sua-cor': '#nova-cor'
};
```

## 🛠️ API JavaScript

### Funções Principais

```javascript
// Ajustar fonte
alterarFonte(0.5);    // Aumentar 0.5px
alterarFonte(-0.5);   // Diminuir 0.5px
resetarFonte();       // Voltar ao tamanho original

// Modos visuais
alternarContraste();  // Liga/desliga alto contraste
alternarModoDark();   // Liga/desliga modo escuro

// Leitura por voz
toggleLeitura();      // Liga/desliga leitura automática
lerTexto("Texto específico"); // Ler texto específico
```

### Eventos Customizados

```javascript
// Detectar mudanças de acessibilidade
document.addEventListener('acessibilidade:mudanca', function(e) {
    console.log('Configuração alterada:', e.detail);
});

// Personalizar feedback
function exibirFeedbackCustomizado(mensagem) {
    // Sua implementação de feedback
}
```

## 🎨 Personalização Visual

### CSS Customizado para Alto Contraste

```css
body.alto-contraste .meu-componente {
    background-color: #000 !important;
    color: #fff !important;
    border: 1px solid #fff !important;
}
```

### CSS Customizado para Modo Escuro

```css
body.modo-dark .meu-componente {
    background-color: #1e1e1e;
    color: #e0e0e0;
}
```

### Desabilitar Acessibilidade em Elementos Específicos

```css
.no-accessibility {
    font-size: inherit !important;
    filter: none !important;
}
```

```html
<div class="no-accessibility">
    Este texto não será afetado pelas mudanças de acessibilidade
</div>
```

## 📱 Responsividade

O sistema funciona automaticamente em dispositivos móveis. Para customizar:

```css
@media (max-width: 768px) {
    .acessibilidade-barra {
        padding: 5px;
        gap: 5px;
    }
    
    .acessibilidade-barra button {
        width: 35px;
        height: 35px;
    }
}
```

## 🔊 Leitura por Voz

### Configuração da Síntese de Voz

```javascript
function lerTexto(texto) {
    if (!('speechSynthesis' in window)) return;
    
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR';
    utterance.rate = 0.8;    // Velocidade (0.1 - 2)
    utterance.pitch = 1;     // Tom (0 - 2)
    utterance.volume = 1;    // Volume (0 - 1)
    
    speechSynthesis.speak(utterance);
}
```

### Controle Avançado de Leitura

```javascript
// Pausar leitura
speechSynthesis.pause();

// Retomar leitura
speechSynthesis.resume();

// Cancelar leitura
speechSynthesis.cancel();

// Verificar se está falando
const estaFalando = speechSynthesis.speaking;
```

## 🍪 Gerenciamento de Cookies

### Configurar Expiração

```javascript
config.cookieExpiracao = 30; // 30 dias
config.cookieExpiracao = 0;  // Apenas durante a sessão
```

### Limpar Configurações Salvas

```javascript
function limparConfiguracoes() {
    document.cookie = "acessibilidade_tamanhoFonte=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "acessibilidade_altoContraste=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "acessibilidade_modoDark=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    location.reload();
}
```

## 🧪 Exemplos de Uso

### Botões Customizados

```html
<button onclick="alterarFonte(1)" class="btn-acessibilidade">
    🔍 Aumentar Fonte
</button>

<button onclick="alternarModoDark()" class="btn-acessibilidade">
    🌙 Modo Noturno
</button>
```

### Widget Completo de Acessibilidade

```html
<div class="widget-acessibilidade">
    <h3>Acessibilidade</h3>
    
    <div class="grupo-fontes">
        <label>Tamanho da fonte:</label>
        <button onclick="alterarFonte(-0.5)">A-</button>
        <button onclick="resetarFonte()">A</button>
        <button onclick="alterarFonte(0.5)">A+</button>
    </div>
    
    <div class="grupo-visual">
        <label>
            <input type="checkbox" onchange="alternarContraste()" id="check-contraste">
            Alto Contraste
        </label>
        
        <label>
            <input type="checkbox" onchange="alternarModoDark()" id="check-dark">
            Modo Escuro
        </label>
    </div>
    
    <div class="grupo-audio">
        <label>
            <input type="checkbox" onchange="toggleLeitura()" id="check-leitura">
            Leitura por Voz
        </label>
    </div>
</div>
```

### Integração com Frameworks

#### WordPress

```php
// functions.php
function adicionar_acessibilidade() {
    wp_enqueue_script('acessibilidade', get_template_directory_uri() . '/js/acessibilidade.js', array(), '1.0', true);
}
add_action('wp_enqueue_scripts', 'adicionar_acessibilidade');
```

#### React

```jsx
import { useEffect } from 'react';

function AcessibilidadeComponent() {
    useEffect(() => {
        // Carregar script de acessibilidade
        const script = document.createElement('script');
        script.src = '/acessibilidade.js';
        document.body.appendChild(script);
    }, []);

    return (
        <div className="barra-acessibilidade">
            <button onClick={() => window.alterarFonte(0.5)}>A+</button>
            <button onClick={() => window.alterarFonte(-0.5)}>A-</button>
            <button onClick={() => window.alternarContraste()}>Contraste</button>
        </div>
    );
}
```

## 🔍 Troubleshooting

### Fonte não está mudando
- Verifique se há CSS com `!important` sobrepondo
- Confirme se os seletores de texto incluem seus elementos
- Use o debug: `console.log(config.tamanhoFonteAtual)`

### Leitura por voz não funciona
- Verifique se o navegador suporta `speechSynthesis`
- Teste em HTTPS (necessário em alguns navegadores)
- Verifique se o áudio não está mutado

### Configurações não persistem
- Verifique se cookies estão habilitados
- Confirme se `config.cookieExpiracao` está definido
- Teste em domínio real (não file://)

## ♿ Conformidade com WCAG

Este sistema atende aos critérios:

- **WCAG 2.1 AA**: Contraste de cores adequado
- **Critério 1.4.4**: Redimensionamento de texto até 200%
- **Critério 1.4.3**: Contraste mínimo de 4.5:1
- **Critério 2.1.1**: Funcionalidade via teclado
- **Critério 4.1.2**: Nome, função e valor dos componentes

## 📞 Suporte

Para dúvidas ou customizações específicas:
- Documentação: Consulte os comentários no código
- Issues: Relate problemas com exemplos específicos
- Contribuições: Pull requests são bem-vindos

---

**Sistema desenvolvido para tornar a web mais acessível e inclusiva para todos os usuários.**
