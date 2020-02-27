<?php

// Add scripts and stylesheets
function startwordpress_scripts() {
	// register webpack stylesheet and js with theme
// include the css file
	$cssFilePath = glob( get_template_directory() . '/Stylesheets/build/main.min.*' );
	$cssFileURI = get_template_directory_uri() . '/Stylesheets/build/' . basename($cssFilePath[0]);
	wp_enqueue_style( 'site_main_css', $cssFileURI );
// include the javascript file
	$jsFilePath = glob( get_template_directory() . '/Javascript/build/app.min.*.js' );
	$jsFileURI = get_template_directory_uri() . '/Javascript/build/' . basename($jsFilePath[0]);
	wp_enqueue_script( 'site_main_js', $jsFileURI , null , null , true );
}
add_action( 'wp_enqueue_scripts', 'startwordpress_scripts' );

// adds title meta-tag in head section
add_theme_support( 'title-tag' );

// Add Google Fonts
function startwordpress_google_fonts() {
	wp_register_style('SourceSansPro', 'https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,700');
	wp_enqueue_style( 'SourceSansPro');
}
add_action('wp_print_styles', 'startwordpress_google_fonts');

// Add Font Awesome Font
function startwordpress_fontAwesome_font() {
	wp_register_style('FontAwesome', 'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');
	wp_enqueue_style( 'FontAwesome');
}
add_action('wp_print_styles', 'startwordpress_fontAwesome_font');





// set mainmenu list item class
function add_additional_class_on_li($classes, $item, $args) {
	if($args->add_li_class) {
		$classes[] = $args->add_li_class;
	}
	return $classes;
}
add_filter('nav_menu_css_class', 'add_additional_class_on_li', 1, 3);

// Set mainmenu link classes and menu anchor url
function add_menu_link_class( $atts, $item, $args ) {

// get slug for tpv anchor mainnav
	$url      = $atts['href'];
	$url_path = parse_url( $url, PHP_URL_PATH );
	$atts['href'] = '#'. basename($url_path);

	if (property_exists($args, 'link_class')) {
		$atts['class'] = $args->link_class;
	}
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'add_menu_link_class', 1, 3 );

// Remove all css Styles set by Gutenberg RTE
add_action( 'wp_print_styles', 'wps_deregister_styles', 100 );
function wps_deregister_styles() {
	wp_dequeue_style( 'wp-block-library' );
}


function tpv_allowed_block_types( $allowed_blocks, $post ) {

	$allowed_blocks = array(
		'core/image',
		'core/html',
		'core/paragraph',
		'core/heading',
		'core/list',
		'core/columns',
		'core/column',
		'core/file',
		'core/textColumns',
		'core/table',
		'tpv/guten-blocks-accordion-container',
		'tpv/guten-blocks-accordion-element1',
		'tpv/image-and-text-element',
	);


	if( $post->post_name === 'erfahrungsberichte' ) {
		$allowed_blocks[] = 'tpv/testimonials-carousel';
		$allowed_blocks[] = 'tpv/testimonials-carousel-item';
		$allowed_blocks[] = 'tpv/testimonials-carousel-indicators';
	}

	return $allowed_blocks;

};

add_filter( 'allowed_block_types', 'tpv_allowed_block_types', 10, 2 );



// set any attributes on menu links
/*add_filter( 'nav_menu_link_attributes', 'wpse121123_contact_menu_atts', 10, 3 );
function wpse121123_contact_menu_atts( $atts, $item, $args )
{
	$atts['data-offset'] = 900;
	return $atts;
}*/



// View all WP Post variables
/*function wpmix_display_globals($content) {
	return $content . var_export($GLOBALS['post'], TRUE);
}
add_filter('the_content', 'wpmix_display_globals');*/