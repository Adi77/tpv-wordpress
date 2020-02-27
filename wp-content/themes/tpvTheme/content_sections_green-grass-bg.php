<?php
$post = get_post( get_the_ID() );
$slug = $post->post_name;


?>


<div class="green-grass-bg">
	<?php
	if ( $slug === 'erfahrungsberichte' ) {
		?>
        <section class="testimonials">
            <div>
                <div>
                    <div>
                        <h3>
							<?php
							the_title();
							?>
                        </h3>
						<?php
						the_content();

						?>
                    </div>
                </div>
            </div>
        </section>
		<?php
	}
	if ( $slug === 'aus-weiterbildung' ) {
		?>
        <section class="education">
            <div>
                <div>
                    <div class="col-md-12">
                        <h3>
							<?php
							the_title();
							?>
                        </h3>
                    </div>
                </div>
					<?php
					the_content();
					?>
            </div>
        </section>
		<?php
	}
	?>

	<?php
	if ( $slug !== 'erfahrungsberichte' && $slug !== 'aus-weiterbildung' ) {
		?>
        <section>
            <div>
                <div>
                    <div>
                        <h3>
							<?php
							the_title();
							?>
                        </h3>
						<?php
						the_content();
						?>
                    </div>
                </div>
            </div>
        </section>
		<?php
	}
	?>

</div>


