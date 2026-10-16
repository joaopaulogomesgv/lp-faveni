# Landing Pages Faveni — Pós-Graduação e Graduação

Repositório oficial de templates e landing pages de alta conversão do **Grupo Educacional Faveni**.

---

## 🎯 Cursos Disponíveis no Repositório

| Curso | Standalone HTML | WordPress (Bloco HTML) | WordPress Autossuficiente | Template PHP Tema |
|:---|:---:|:---:|:---:|:---:|
| **ABA (Análise do Comportamento Aplicada)** | `index.html` | `wordpress.html` | `pagina-pronta.html` | `page-pos-aba.php` |
| **Neuropsicopedagogia Institucional e Clínica** | `index-neuropsicopedagogia.html` | `wordpress-neuropsicopedagogia.html` | `pagina-pronta-neuropsicopedagogia.html` | `page-pos-neuropsicopedagogia.php` |
| **Pós-Graduação Geral (+1.000 Cursos)** | `index-pos-geral.html` | `wordpress-pos-geral.html` | — | — |
| **Segunda Graduação** | `index-segunda-graduacao.html` | `wordpress-segunda-graduacao.html` | — | — |

---

## 🚀 Como Publicar no WordPress

### Opção 1: Bloco HTML Personalizado (Recomendada)
1. No WordPress, vá em **Páginas → Adicionar Nova**.
2. Defina o título e o slug desejado (ex: `pos-neuropsicopedagogia` ou `pos-aba`).
3. Adicione um bloco do tipo **HTML Personalizado** (ou widget HTML do Elementor).
4. Abra o arquivo correspondente (`pagina-pronta-<slug>.html` ou `wordpress-<slug>.html`), copie todo o código e cole no bloco.
5. Clique em **Publicar**.

### Opção 2: Arquivo de Template do Tema WordPress
1. Conecte-se ao servidor via File Manager (cPanel) ou FTP.
2. Copie o arquivo `page-pos-<slug>.php` para a pasta do seu tema ativo:
   `wp-content/themes/[seu-tema-ativo]/page-pos-<slug>.php`
3. Crie a página no WordPress com o slug correspondente. O WordPress carregará o template automaticamente com total suporte ao Elementor Pro.

---

## ⚡ Integração com Elementor Pro (Popup)

* Todos os botões com a classe `.open-popup-trigger` acionam o popup de captura de leads (ID **2466**).
* Há um fallback embutido via shortcode:
  ```html
  <div class="elform">[elementor-template id="2466"]</div>
  ```

---

## 🧠 Para Agentes e Desenvolvedores de IA

Para criar novas LPs sem erros, consulte as diretrizes documentadas em:
- [AGENTS.md](AGENTS.md)
- [.agents/skills/gerador-lp-elementor/SKILL.md](.agents/skills/gerador-lp-elementor/SKILL.md)
