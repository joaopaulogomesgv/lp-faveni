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
3. **Formato Padrão para Elementor:**
   - O arquivo principal e oficial para colar no WordPress/Elementor é:
     `wordpress-<slug>.html` (bloco HTML leve, responsivo, com assets em CDN e gatilhos de popup).
4. **Valide a Carga Horária e Grade:**
   - As disciplinas devem ser numeradas com 2 dígitos (`01`, `02`, ...).
   - A soma das horas na barra totalizadora (`.curriculum-total`) deve corresponder estritamente à soma aritmética de todas as matérias.
5. **Integração Elementor Pro:**
   - O popup da página ABA é o ID **3573** (Neuropsicopedagogia: **3525**, AEE: **3582**, Segunda Graduação: **3597**, Pós Geral: **3641**, Educação Especial e Inclusiva: **3661**, Alfabetização e Letramento: **3693**).
   - Os botões de conversão devem ter a classe `.open-popup-trigger` e o link `#elementor-action:action=popup:open&settings=...` (com ID codificado em base64: para 3573 é `eyJpZCI6IjM1NzMiLCJ0b2dnbGUiOmZhbHNlfQ==`, para 3582 é `eyJpZCI6IjM1ODIiLCJ0b2dnbGUiOmZhbHNlfQ==`, para 3597 é `eyJpZCI6IjM1OTciLCJ0b2dnbGUiOmZhbHNlfQ==`, para 3641 é `eyJpZCI6IjM2NDEiLCJ0b2dnbGUiOmZhbHNlfQ==`, para 3661 é `eyJpZCI6IjM2NjEiLCJ0b2dnbGUiOmZhbHNlfQ==`, para 3693 é `eyJpZCI6IjM2OTMiLCJ0b2dnbGUiOmZhbHNlfQ==`).
   - Manter o shortcode fallback: `<div class="elform">[elementor-template id="<id-do-curso>"]</div>`.
