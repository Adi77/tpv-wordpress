<?php get_header(); ?>
  <main role="main" >
      <?php get_template_part( 'content', get_post_format() ); ?>
</main><!-- /.container -->
<?php get_footer(); ?>