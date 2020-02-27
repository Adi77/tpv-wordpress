<div class="ambient-img-fullwidth-claim">
    <div>
        <div>
            <div>
				<?php
				// Homepage contents
				$home_page_query_args = array(
					'post_type'      => 'page',
					'page_id'        => 943,
					'post_status'    => 'publish',
					'order'          => 'ASC',
					'posts_per_page' => - 1,
					'nopaging'       => true
				);
				$home_page            = new WP_Query( $home_page_query_args );
				if ( $home_page->have_posts() ) :
					while ( $home_page->have_posts() ) :
						$home_page->the_post();
						the_content();
					endwhile;
				endif;
				wp_reset_postdata(); // maybe there is more than one loop

				?>

                <br>
                 <a href="#angebot" class="js-scroll-trigger tpv-cto-button" role="button" aria-pressed="true"><i class="fa fa-chevron-down"></i></a>
                <a href="https://www.kibesuisse.ch/" alt="Kibesuisse" target="_blank" class="kibesuisse-logo">
                    <img src="<?php echo get_bloginfo( 'template_directory' ); ?>/Images/kibesuisse-logo-white.png"/>
                </a>
            </div>
        </div>
    </div>
</div>


<section id="angebot" class="products">
    <div class="container">

        <div class="citation row">
            <div class="col-sm-12">
                Kinder fühlen sich dort zu Hause, wo sie sich wohl fühlen.
            </div>
        </div>

        <div class="tpv-products-nav" id="tpv-products-nav">

            <div class="tpv-products-nav-header row ">
                <div id="heading-abgebende" class="col-md-6 heading-abgebende slide-left">
                    <a class="btn btn-tpv-products" data-toggle="collapse" href="#abgebende-eltern-content"
                       role="button" aria-expanded="false" aria-controls="abgebende-eltern-content"
                       data-target="#abgebende-eltern-content">
                        <div>
							<?php
							the_field( 'products_teaser_title', 59, false );
							?>
                        </div>
						<?php
						the_field( 'products_teaser_description', 59, false );
						?>
<!--                        &nbsp;&nbsp;<i class="fa fa-angle-double-right"></i>-->
                    </a>
                </div>


                <div id="heading-tagesfamilien" class="heading-tagesfamilien col-md-6  slide-right">
                    <a class="btn btn-tpv-products" data-toggle="collapse" aria-expanded="false"
                       href="#tagesfamilien-content" role="button" aria-expanded="false"
                       aria-controls="tagesfamilien-content" data-target="#tagesfamilien-content">
                        <div>
							<?php
							the_field( 'products_teaser_title', 61, false );
							?>
                        </div>
						<?php
						the_field( 'products_teaser_description', 61, false );
						?>
<!--                        &nbsp;&nbsp;<i class="fa fa-angle-double-right"></i>-->
                    </a>
                </div>
            </div>
            <div class="tpv-products-contents">


                <div class="tpv-products-nav-header mobile">

                    <div id="heading-abgebende-mobile" class="heading-abgebende ">
                        <a class="btn btn-tpv-products" data-toggle="collapse" href="#abgebende-eltern-content"
                           role="button" aria-expanded="false" aria-controls="abgebende-eltern-content"
                           data-target="#abgebende-eltern-content">
                            <div>
								<?php
								the_field( 'products_teaser_title', 59, false );
								?>
                            </div>
							<?php
							the_field( 'products_teaser_description', 59, false );
							?>

                        </a>
                    </div>

                </div>


                <div class="collapse" id="abgebende-eltern-content" data-parent="#tpv-products-nav">
                    <div class="card card-body">

						<?php
						$products_abgebende_query_args = array(
							'post_type'      => 'page',
							'page_id'        => 59,
							'post_status'    => 'publish',
							'order'          => 'ASC',
							'posts_per_page' => - 1,
							'nopaging'       => true
						);
						$products_abgebende_pages      = new WP_Query( $products_abgebende_query_args );
						if ( $products_abgebende_pages->have_posts() ) :
							while ( $products_abgebende_pages->have_posts() ) :
								$products_abgebende_pages->the_post();
								the_content();
							endwhile;
						endif;
						wp_reset_postdata(); // maybe there is more than one loop

						?>

                    </div>
                </div>

                <div class="tpv-products-nav-header mobile">

                    <div id="heading-tagesfamilien-mobile" class="heading-tagesfamilien">
                        <a class="btn btn-tpv-products" data-toggle="collapse" aria-expanded="false"
                           href="#tagesfamilien-content" role="button" aria-expanded="false"
                           aria-controls="tagesfamilien-content" data-target="#tagesfamilien-content">
                            <div>
								<?php
								the_field( 'products_teaser_title', 61, false );
								?>
                            </div>
							<?php
							the_field( 'products_teaser_description', 61, false );
							?>
                       
                        </a>
                    </div>

                </div>

                <div class="collapse" id="tagesfamilien-content" data-parent="#tpv-products-nav">
                    <div class="card card-body">
						<?php
						$products_abgebende_query_args = array(
							'post_type'      => 'page',
							'page_id'        => 61,
							'post_status'    => 'publish',
							'order'          => 'ASC',
							'posts_per_page' => - 1,
							'nopaging'       => true
						);
						$products_abgebende_pages      = new WP_Query( $products_abgebende_query_args );
						if ( $products_abgebende_pages->have_posts() ) :
							while ( $products_abgebende_pages->have_posts() ) :
								$products_abgebende_pages->the_post();
								the_content();
							endwhile;
						endif;
						wp_reset_postdata(); // maybe there is more than one loop

						?>
                    </div>
                </div>
            </div>
        </div>

    </div>
</section>


<?php
// Erfahrungsbericht, Aus- und Weiterbildung
$products_child_pages_query_args = array(
	'post_type'      => 'page',
	'post_parent'    => 27,
	'post_status'    => 'publish',
	'post__not_in'   => array( 59, 61 ),
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
	'posts_per_page' => - 1,
	'nopaging'       => true
);
$products_child_pages            = new WP_Query( $products_child_pages_query_args );
if ( $products_child_pages->have_posts() ) :
	while ( $products_child_pages->have_posts() ) :
		$products_child_pages->the_post();
		get_template_part( 'content_sections_green-grass-bg', 'child' );
	endwhile;
endif;
wp_reset_postdata(); // maybe there is more than one loop

?>

<?php
// Verein, News, Spenden, Kontakt
$child_pages_query_args = array(
	'post_type'      => 'page',
	'post_parent'    => 0,
	'post_status'    => 'publish',
	'post__not_in'   => array( 27, 943 ),
	'orderby'        => 'menu_order',
	'order'          => 'ASC',
	'posts_per_page' => - 1,
	'nopaging'       => true
);
$child_pages            = new WP_Query( $child_pages_query_args );
if ( $child_pages->have_posts() ) :
	while ( $child_pages->have_posts() ) :
		$child_pages->the_post();
		get_template_part( 'content_sections', 'child' );
	endwhile;
endif;
wp_reset_postdata(); // maybe there is more than one loop

?>