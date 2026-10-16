# AGENTS.md — Instruções para Agentes e IAs

Este repositório contém a infraestrutura e templates das **Landing Pages do Grupo Educacional Faveni**, desenvolvidas com foco em altíssima conversão, performance e integração nativa com WordPress e Elementor Pro.

---

## 🤖 Papel do Agente / IA

Sempre que o usuário solicitar a criação de uma nova Landing Page de curso ou alteração nas existentes:

1. **Consulte a Skill Obrigatória:**
   Leia o arquivo [.agents/skills/gerador-lp-elementor/SKILL.md](file:///.agents/skills/gerador-lp-elementor/SKILL.md) antes de gerar código.
2. **Respeite o Design System:**
   - Paleta de cores oficial (Verde floresta `#0f3521`, Dourado `#c9a13f`, Verde ação `#1a9e4d`, Creme `#fdf6ec`).
   - Tipografia: **Archivo** (headings) e **Inter** (body).
   - Não use Tailwind CSS nem frameworks pesados — o projeto utiliza **Vanilla CSS** moderno e ultraotimizado (`styles.css`).
3. **Mantenha os 4 Formatos de Entrega:**
   Para qualquer novo curso (ex: `<slug>`), crie ou atualize:
   - `index-<slug>.html`: Versão HTML5 estática (com SEO e Schema.org).
   - `wordpress-<slug>.html`: Versão bloco HTML WordPress com assets externos.
   - `pagina-pronta-<slug>.html`: Versão autossuficiente (CSS e Base64 inline).
   - `page-pos-<slug>.php`: Template PHP nativo de tema WordPress.
4. **Valide a Carga Horária e Grade:**
   - As disciplinas devem ser numeradas com 2 dígitos (`01`, `02`, ...).
   - A soma das horas na barra totalizadora (`.curriculum-total`) deve corresponder estritamente à soma aritmética de todas as matérias.
5. **Integração Elementor Pro:**
   - O popup padrão é o ID **2466**.
   - Os botões de conversão devem ter a classe `.open-popup-trigger` e o link `#elementor-action:action=popup:open&settings=eyJpZCI6IjI0NjYiLCJ0b2dnbGUiOmZhbHNlfQ==`.
   - Manter o shortcode fallback: `<div class="elform">[elementor-template id="2466"]</div>`.
