<?php
/**
 * Plugin Name: Habilitar Shortcodes no Bloco HTML
 * Plugin URI: https://favenimatriculas.com.br
 * Description: Faz com que blocos de "HTML personalizado" do WordPress executem shortcodes normalmente (como [elementor-template id="2466"]).
 * Version: 1.0.0
 * Author: Faveni
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

// Executa do_shortcode em todo bloco core/html do Gutenberg
add_filter( 'render_block_core/html', function( $block_content ) {
    if ( ! empty( $block_content ) ) {
        return do_shortcode( $block_content );
    }
    return $block_content;
}, 10, 1 );
