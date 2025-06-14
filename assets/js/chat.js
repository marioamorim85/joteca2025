document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('chat-toggle');
    const chat = document.getElementById('chat-container');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const closeButton = document.getElementById('chat-close');
  
    // Atualizar o placeholder do input quando a língua muda
    function updateChatPlaceholder() {
        input.placeholder = translations[currentLanguage]['chat.placeholder'];
    }
  
    // Adicionar o evento de mudança de língua
    const languageToggle = document.getElementById('languageToggle');
    if (languageToggle) {
        languageToggle.addEventListener('click', () => {
            updateChatPlaceholder();
        });
    }
  
    // Inicializar o placeholder
    updateChatPlaceholder();
  
    // Função para formatar URLs em links clicáveis
    function formatMessageWithLinks(text) {
      // Se o texto vier como JSON, extrair o conteúdo
      try {
        const jsonData = JSON.parse(text);
        if (jsonData && jsonData[0] && jsonData[0].output) {
          text = jsonData[0].output;
        }
      } catch (e) {
        // Se não for JSON, continua com o texto original
      }

      // Formatar quebras de linha
      text = text.replace(/\n\n/g, '<br><br>');
      text = text.replace(/\n/g, '<br>');
      
      // Formatar horários
      text = text.replace(/⏰\s+\*\*(.*?)\*\*/g, '<div class="time">⏰ <strong>$1</strong></div>');
      
      // Formatar localizações
      text = text.replace(/Local:\s+(.*?)(?=<br>|$)/g, '<div class="location">📍 Local: $1</div>');
      
      // Formatar oradores
      text = text.replace(/Oradores?:\s+(.*?)(?=<br>|$)/g, '<div class="speakers">👥 Oradores: $1</div>');
      
      // Formatar moderadores
      text = text.replace(/Moderador(a)?:\s+(.*?)(?=<br>|$)/g, '<div class="speakers">👤 Moderador$1: $2</div>');
      
      // Formatar chair
      text = text.replace(/Chair:\s+(.*?)(?=<br>|$)/g, '<div class="speakers">👤 Chair: $1</div>');
      
      // Formatar júri
      text = text.replace(/Júri:\s+(.*?)(?=<br>|$)/g, '<div class="speakers">👥 Júri: $1</div>');
      
      // Formatar texto em negrito
      text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Regex para encontrar URLs
      const urlRegex = /(https?:\/\/[^\s<>"']+)/g;
      
      // Função para processar cada URL encontrada
      function processUrl(match) {
        const cleanUrl = match.replace(/[.,!?]+$/, '').trim();
        return `<a href="${cleanUrl}" target="_blank" class="chat-link">${cleanUrl}</a>`;
      }
      
      // Substituir URLs por links formatados
      return text.replace(urlRegex, processUrl);
    }
  
    // Função para adicionar mensagem do Tecas
    function addTecasMessage(text) {
      const tecasMessage = document.createElement('div');
      tecasMessage.className = 'message tecas-message';
      tecasMessage.innerHTML = `<strong>Tecas:</strong> ${formatMessageWithLinks(text)}`;
      messages.appendChild(tecasMessage);
      messages.scrollTop = messages.scrollHeight;
    }
  
    // Gera ou recupera sessionId persistente
    let sessionId = localStorage.getItem('chatSessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('chatSessionId', sessionId);
    }
  
    // Inicializa o estado do chat como fechado
    chat.style.display = 'none';
  
    // Função para fechar o chat
    const closeChat = () => {
      chat.style.display = 'none';
    };
  
    toggle.onclick = () => {
      const isOpening = chat.style.display === 'none';
      chat.style.display = isOpening ? 'flex' : 'none';
      
      if (isOpening) {
        input.focus(); // Foca no input quando o chat é aberto
        // Adiciona mensagem inicial se for a primeira vez que abre o chat
        if (messages.children.length === 0) {
          // Adiciona o indicador de digitação
          const spinner = document.createElement('div');
          spinner.id = 'typing-indicator';
          spinner.innerHTML = `<em>${translations[currentLanguage]['chat.typing']}</em>`;
          messages.appendChild(spinner);
          messages.scrollTop = messages.scrollHeight;

          // Adiciona um delay antes de mostrar a mensagem
          setTimeout(() => {
            spinner.remove();
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message tecas-message';
            messageDiv.innerHTML = `
              <strong>Tecas:</strong> ${translations[currentLanguage]['chat.welcome']}
              <div class="chat-options">
                <label class="chat-option">
                  <input type="radio" name="chat-option" value="inscricao">
                  <span>${translations[currentLanguage]['chat.option.inscricao']}</span>
                </label>
                <label class="chat-option">
                  <input type="radio" name="chat-option" value="artigos">
                  <span>${translations[currentLanguage]['chat.option.artigos']}</span>
                </label>
                <label class="chat-option">
                  <input type="radio" name="chat-option" value="outro">
                  <span>${translations[currentLanguage]['chat.option.outro']}</span>
                </label>
              </div>
            `;
            messages.appendChild(messageDiv);
            messages.scrollTop = messages.scrollHeight;

            // Adicionar evento de clique nos radio buttons
            const radioButtons = messageDiv.querySelectorAll('input[type="radio"]');
            radioButtons.forEach(radio => {
              radio.addEventListener('change', function() {
                if (this.checked) {
                  const value = this.value;
                  let response = '';
                  switch(value) {
                    case 'inscricao':
                      response = `${translations[currentLanguage]['chat.response.inscricao']} https://docs.google.com/forms/d/e/1FAIpQLSee7ijbUGr3hw0ZKV13EajNysPHcRrm_F4OKLR5pc_E6NnuhA/viewform`;
                      break;
                    case 'artigos':
                      response = `${translations[currentLanguage]['chat.response.artigos']} https://docs.google.com/forms/d/e/1FAIpQLSd8VcvIbAII_7IPru8BJBdglI13-ahNh6d1o15nmlxRJhuzSw/viewform`;
                      break;
                    case 'outro':
                      response = translations[currentLanguage]['chat.response.outro'];
                      break;
                  }

                  // Adicionar o indicador de digitação
                  const spinner = document.createElement('div');
                  spinner.id = 'typing-indicator';
                  spinner.innerHTML = `<em>${translations[currentLanguage]['chat.typing']}</em>`;
                  messages.appendChild(spinner);
                  messages.scrollTop = messages.scrollHeight;

                  // Adicionar um delay antes de mostrar a resposta
                  setTimeout(() => {
                    spinner.remove();
                    addTecasMessage(response);
                  }, 1500); // Delay de 1.5 segundos
                }
              });
            });
          }, 1500); // Delay de 1.5 segundos
        }
      }
    };
  
    // Adiciona evento de clique ao botão de fechar
    closeButton.onclick = closeChat;
  
    input.addEventListener('keydown', async (e) => {
      if (e.key === 'Enter' && input.value.trim()) {
        const msg = input.value.trim();
        const userMessage = document.createElement('div');
        userMessage.className = 'message user-message';
        userMessage.innerHTML = `<strong>Tu:</strong> ${msg}`;
        messages.appendChild(userMessage);
        input.value = '';
        input.disabled = true; // Desativar input
  
        // Adicionar spinner
        const spinner = document.createElement('div');
        spinner.id = 'typing-indicator';
        spinner.innerHTML = `<em>${translations[currentLanguage]['chat.typing']}</em>`;
        messages.appendChild(spinner);
        messages.scrollTop = messages.scrollHeight;
  
        try {
          const res = await fetch('https://n8n.marioamorim.com/webhook/e9982b4c-5dd6-43e5-b05b-5b8a782fa28c', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: msg, sessionId })
          });
  
          const data = await res.json();
  
          // Remover spinner antes de mostrar resposta
          spinner.remove();
          addTecasMessage(data.response || translations[currentLanguage]['chat.noResponse']);
        } catch (error) {
          spinner.remove();
          addTecasMessage(translations[currentLanguage]['chat.error']);
        }
  
        input.disabled = false; // Reativar input
        input.focus();
        messages.scrollTop = messages.scrollHeight;
      }
    });

    function handleSubmitArticle() {
      const selectedOption = document.querySelector('input[name="articleType"]:checked');
      if (!selectedOption) {
        showMessage('Por favor, selecione uma opção de artigo.', 'assistant');
        return;
      }

      const articleType = selectedOption.value;
      const articleTypeText = selectedOption.nextElementSibling.textContent;
      
      showMessage(`Você selecionou: ${articleTypeText}`, 'assistant');
      
      // Limpar as opções
      const optionsContainer = document.querySelector('.chat-options');
      if (optionsContainer) {
        optionsContainer.remove();
      }

      // Adicionar botão de voltar
      const backButton = document.createElement('button');
      backButton.className = 'chat-back-button';
      backButton.innerHTML = '<i class="fas fa-arrow-left"></i> Voltar';
      backButton.onclick = () => {
        backButton.remove();
        showArticleOptions();
      };
      document.getElementById('chat-messages').appendChild(backButton);

      // Redirecionar para a página de submissão
      setTimeout(() => {
        window.location.href = `/submeter-artigo?tipo=${articleType}`;
      }, 1500);
    }

    function showArticleOptions() {
      const options = [
        { value: 'cientifico', text: 'Artigo Científico' },
        { value: 'tecnico', text: 'Artigo Técnico' },
        { value: 'opiniao', text: 'Artigo de Opinião' }
      ];

      const optionsContainer = document.createElement('div');
      optionsContainer.className = 'chat-options';

      options.forEach(option => {
        const label = document.createElement('label');
        label.className = 'chat-option';
        
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'articleType';
        input.value = option.value;
        
        const span = document.createElement('span');
        span.textContent = option.text;
        
        label.appendChild(input);
        label.appendChild(span);
        optionsContainer.appendChild(label);
      });

      const submitButton = document.createElement('button');
      submitButton.className = 'chat-submit-button';
      submitButton.textContent = 'Submeter Artigo';
      submitButton.onclick = handleSubmitArticle;

      optionsContainer.appendChild(submitButton);
      document.getElementById('chat-messages').appendChild(optionsContainer);
    }
  });
  