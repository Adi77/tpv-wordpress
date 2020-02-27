<?php
$post = get_post( get_the_ID() );
$slug = $post->post_name;
$sectionBg = 'generic-bg';

if ( $slug === 'aktuelles' ) {
	$sectionBg = 'car-bg';
}
if ( $slug === 'verein' ) {
	$sectionBg = 'shapes-bg';
}
if ( $slug === 'spenden' ) {
	$sectionBg = 'cookie-bg';
}
if ( $slug === 'downloads' ) {
	$sectionBg = 'seesaw-bg';
}
if ( $slug === 'kontakt' ) {
	$sectionBg = 'duck-bg';
}

?>


<div class="<?php echo $sectionBg; ?>">
    <section id="<?php echo $slug; ?>" class="<?php echo $slug; ?> ">
        <div class="container ">
            <div class="row">
                <div class="col-sm-12">
                    <h2>
						<?php
						the_title();
						?>
                    </h2>
                </div>
            </div>
			<?php
			the_content();
			?>
        </div>
    </section>
</div>
