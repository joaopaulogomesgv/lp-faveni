---
name: gerador-lp-elementor
description: Especialista em geração e replicação de Landing Pages de alta conversão para o Grupo Educacional Faveni com integração ao Elementor Pro, WordPress e hospedagem estática.
---

# Skill: Gerador de Landing Pages Faveni (Elementor & WordPress)

Esta skill documenta a arquitetura, regras de design, integração com Elementor Pro e o processo padronizado para criar landing pages de novos cursos (Pós-Graduação, Graduação, Segunda Graduação) idênticas à LP de referência de ABA.

---

## 1. Arquitetura da Landing Page

Toda landing page segue uma estrutura rigorosa de alta conversão composta pelas seguintes seções em ordem:

1. **Top Bar Promocional:** Faixa superior com mensagens rotativas de urgência/escassez e setas de navegação.
2. **Navbar Institucional:** Logo oficial em alta definição do Grupo Faveni.
3. **Hero Section (Grid 3 Colunas no Desktop):**
   - **Coluna 1 (Texto & Autoridade):**
     - Pill de categoria (`Pós-Graduação Online Faveni`).
     - Badge de status (`Matrículas Abertas`).
     - H1 do curso com tipografia Archivo.
     - Subtítulo de alto impacto.
     - Indicadores de prova social MEC (Nota máxima 5 estrelas) e prazo de conclusão (A partir de 6 meses · 100% online · Sem TCC).
     - Prova social com avatares e contagem de formados (+500 mil alunos).
   - **Coluna 2 (Vídeo Institucional / Depoimento):**
     - Frame com thumbnail e play button para vídeo institucional do YouTube (`BwfHfqUc8oY`) ou vídeo local MP4.
   - **Coluna 3 (Card de Captura / Formulário Elementor):**
     - Card com borda dourada sutil e degradê superior.
     - Headline de oferta (`Garantir minha vaga` / `Condições Especiais`).
     - Lista de 4 benefícios rápidos com ícone de checkmark.
     - Botão de ação direta abrindo o popup do Elementor Pro via classe `.open-popup-trigger`.
     - Shortcode nativo `[elementor-template id="3573"]` (ou o ID específico do curso) para renderização interna no WordPress.
4. **Trust Marquee:** Letreiro infinito com diferenciais institucionais (100% online, +500.000 alunos, Nota máxima no MEC, Sem TCC, Conclusão a partir de 6 meses, 350 polos).
5. **Seção 01 — Vantagens (3 Cards):**
   - Card 01: Sem TCC (foco prático e agilidade sem monografia).
   - Card 02 (Destacado / Featured): Conclusão a partir de 6 meses.
   - Card 03: Nota máxima no MEC (prestígio e validade nacional).
6. **Seção de Números (Impacto):** Contador numérico animado em JavaScript (+500.000 alunos formados).
7. **Seção 02 — Grade Curricular & Fatos do Curso:**
   - Grid de fatos do curso (`<dl class="course-facts">`): Curso, Modalidade, Conclusão, Titulação, TCC, Reconhecimento, Pré-requisito, Polos.
   - Tabela/Lista de disciplinas numeradas com dois dígitos (`01`, `02`...), nome completo e carga horária individual (`50h`, `60h`...).
   - Barra totalizadora com soma exata da carga horária.
8. **Seção 03 — Prova Social (Carrossel de Depoimentos em Vídeo):**
   - Carrossel com botões prev/next contendo depoimentos reais em MP4 da Faveni com reprodução inline e capa automática.
9. **Faixa CTA Intermediária:** Chamada direta com botão de ação rápida para o formulário.
10. **Seção 04 — Dúvidas Frequentes (FAQ Acordeão):**
    - Perguntas essenciais: Validade pelo MEC, tempo de conclusão, dispensa de TCC, formato 100% online, mercado de atuação específico do curso, pré-requisitos e emissão de certificado.
11. **Rodapé Institucional:** Links institucionais, redes sociais, logo oficial e copyright.
12. **Sticky CTA Flutuante:** Barra inferior fixa com chamada de urgência e botão de contato/inscrição.

---

## 2. Padrão de Arquivos por Curso

Para cada novo curso com slug `<slug-do-curso>`, devem ser gerados **4 arquivos padronizados**:

| Arquivo | Finalidade | Descrição |
|:---|:---|:---|
| `index-<slug>.html` | Standalone / Estático | Página HTML5 completa com links externos para `styles.css` e `script.js`. Contém Schema.org JSON-LD completo, Open Graph e meta tags SEO. |
| `wordpress-<slug>.html` | Bloco HTML WordPress | Arquivo leve (~30KB) para colar em bloco "HTML personalizado" no WordPress. Aponta assets para `https://favenimatriculas.com.br/assets-pos/` e executa disparador do Elementor. |
| `pagina-pronta-<slug>.html` | WordPress Autossuficiente | Arquivo com todo o CSS embutido em `<style>` e logos embutidos em Base64. Ideal para clientes que não têm acesso FTP ou pasta de assets estáticos. |
| `page-pos-<slug>.php` | Template de Tema WP | Template PHP (`Template Name: LP <Curso>`) para colocar em `wp-content/themes/[tema]/`. Carrega `wp_head()` e `wp_footer()`, executando shortcodes com total compatibilidade com Elementor Pro. |

---

## 3. Integração com Elementor Pro

### Como Funciona o Popup
1. **Link de Ação Nativa do Elementor:**
   ```html
   <a href="#elementor-action:action=popup:open&settings=eyJpZCI6IjM1NzMiLCJ0b2dnbGUiOmZhbHNlfQ==" class="btn-submit open-popup-trigger">
       Garantir Minha Vaga →
   </a>
   ```
2. **Shortcode Fallback dentro do Card:**
   ```html
   <div class="elform">[elementor-template id="3573"]</div>
   ```
3. **Script de Disparo Automático (Incluso no JS):**
   ```javascript
   (function() {
       function triggerPopup3573(e) {
           if (e && e.preventDefault) e.preventDefault();
           try {
               if (window.elementorProFrontend && elementorProFrontend.modules && elementorProFrontend.modules.popup) {
                   elementorProFrontend.modules.popup.showPopup({ id: 3573 });
                   return;
               }
           } catch (err) {}
           window.location.href = '#elementor-action:action=popup:open&settings=eyJpZCI6IjM1NzMiLCJ0b2dnbGUiOmZhbHNlfQ==';
       }
       document.addEventListener('DOMContentLoaded', function() {
           document.querySelectorAll('.open-popup-trigger, a[href*="popup:open"]').forEach(function(el) {
               el.addEventListener('click', triggerPopup3573);
           });
       });
   })();
   ```

---

## 4. Checklist de Replicação para uma Nova IA

Ao receber uma solicitação de novo curso (ex: Neuropsicopedagogia, Autismo, Psicopedagogia Institucional, Gestão Escolar, etc.):

1. **Extrair Variáveis do Curso:**
   - Nome completo do curso (ex: *Neuropsicopedagogia Institucional e Clínica*).
   - Nível/Titulação (Pós-graduação lato sensu, MBA ou Segunda Graduação).
   - Duração (ex: *a partir de 6 meses*).
   - Regra de TCC (Padrão Faveni: *Sem TCC*).
   - Nota MEC (Padrão Faveni: *Nota máxima 5 estrelas*).
   - Grade de disciplinas: nome exato e carga horária de cada matéria.
   - **Cálculo da Carga Horária Total:** Somar a carga horária de todas as matérias com precisão matemática (ex: 13x50h + 40h + 60h = 750h).

2. **Ajustar os Textos Semânticos:**
   - `<title>` e meta description com foco em conversão e SEO.
   - Headline H1 clara e forte.
   - Subtítulo focado nos benefícios profissionais e nas áreas de atuação do egresso.
   - Adaptação das perguntas do FAQ específicas sobre a profissão (ex: *"Onde o especialista em [Área] pode atuar?"*).

3. **Formatação da Grade Curricular:**
   - Utilizar a classe `curriculum-list`.
   - Cada item deve conter:
     ```html
     <li class="reveal">
         <span class="cur-n">01</span>
         <span class="cur-name">Nome da Disciplina</span>
         <span class="cur-h">50h</span>
     </li>
     ```
   - Totalizador com a soma exata:
     ```html
     <div class="curriculum-total">
         <strong>Carga horária total</strong>
         <span>750h</span>
     </div>
     ```

4. **SEO & Schema.org (JSON-LD):**
   - Atualizar a entidade `@type: "Course"` com `name`, `description`, `teaches` e `educationalCredentialAwarded`.
   - Atualizar a entidade `@type: "FAQPage"` com as perguntas e respostas do curso.

---

## 5. Paleta de Cores e Tokens de Design

```css
:root {
    --ink: #141414;           /* Texto escuro principal */
    --forest: #0f3521;        /* Verde escuro Faveni principal */
    --forest-2: #14472c;      /* Verde escuro intermediário */
    --green: #1a9e4d;         /* Verde vibrante de conversão */
    --green-dark: #158a43;    /* Hover do botão verde */
    --gold: #c9a13f;          /* Dourado Faveni / Detalhes MEC */
    --cream: #fdf6ec;         /* Fundo quente suave */
    --paper: #ffffff;         /* Branco puro */
    --line: #e7e0d2;          /* Linha de borda sutil */
    --text-soft: #55584f;     /* Texto secundário */
    --text-mute: #8d9085;     /* Texto desbotado / notas */
    --red: #e0362c;           /* Destaques de urgência */
    --r: 6px;                 /* Border-radius base */
}
```

Fontes utilizadas:
- Títulos: **Archivo** (600, 700, 800, 900)
- Textos e UI: **Inter** (400, 500, 600, 700)
