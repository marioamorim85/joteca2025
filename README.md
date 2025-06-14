# JoTecA 2025

Página moderna e responsiva para as Jornadas de Tecnologia Avançada 2025 do ISTEC - Instituto Superior de Tecnologias Avançadas do Porto.

## Características

- Design moderno e responsivo
- Animações suaves e interativas
- Carrossel para exibição de destaques
- Contador regressivo para o evento (1 de Julho de 2025 às 14h)
- Efeitos de partículas e fundo animado
- Totalmente responsivo para todos os dispositivos
- Suporte a múltiplos idiomas (Português e Inglês)
- Navegação por dock para fácil acesso às secções

## Estrutura do Projeto

```
joteca-landing-page/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   ├── scripts.js
│   │   └── translations.js
│   └── img/
│       ├── Ativo 1@4x.png
│       └── Ativo 1@4x_2.PNG
├── joteca-landing-page.html
└── README.md
```

## Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript (ES6+)
- Three.js (para efeitos 3D)
- Particles.js (para efeitos de partículas)
- Swiper.js (para o carrossel de destaques)
- Font Awesome (para ícones)
- Google Fonts (Inter)

## Como Utilizar

1. Clone este repositório
2. Abra o ficheiro `joteca-landing-page.html` no seu navegador
3. Personalize o conteúdo conforme necessário

## Personalização

### Cores
As cores do site podem ser facilmente alteradas modificando as variáveis CSS no ficheiro `styles.css`:

```css
:root {
    --primary: #010DAC;
    --secondary: #29B0E6;
    --light: #f5f8ff;
    --accent: #930CF1;
    --accent-light: #D865FF;
    --white: #FFFFFF;
}
```

### Conteúdo
Para alterar o conteúdo:
- Atualize as datas e horários no contador regressivo
- Modifique os textos nas secções
- Adicione ou remova itens do carrossel
- Atualize as informações de contacto
- Ajuste as traduções no ficheiro `translations.js`

## Contribuição

As contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## Licença

Este projeto está licenciado sob a licença MIT - consulte o ficheiro [LICENSE](LICENSE) para mais detalhes.

## Contacto

Para mais informações sobre o evento:
- Website: [ISTEC](https://www.isetc.pt)
- Email: jornadas@my.isetc.pt
- Telefone: 225 193 220
- Morada: Rua de Silva Tapada 115, 4200-501 Porto 
