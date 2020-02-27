<?php
define('WP_CACHE_KEY_SALT', '894a7bbd697b7261c9ddcc456ea3ac81');
define('WP_AUTO_UPDATE_CORE', 'minor');// Diese Einstellung ist erforderlich, damit WordPress-Updates korrekt in WordPress Toolkit verwaltet werden können. Entfernen Sie diese Zeile, wenn diese WordPress-Website nicht mehr in WordPress Toolkit verwaltet wird.
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings ** //
/** The name of the database for WordPress */
define('DB_NAME', 'tpvregi_wp');

/** MySQL database username */
define('DB_USER', 'wp_sjf07');

/** MySQL database password */
define('DB_PASSWORD', 'g9HB4!y2Ow');

/** MySQL hostname */
define('DB_HOST', 'localhost:3306');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', 'N1(clW3GEd9cfa751*QV/L78#W/0!_RQaSC~3B[3k7x_[~iB6%zg/Q6*g)_X2SbY');
define('SECURE_AUTH_KEY', '4A7a-7C1!5:f2V_;9:L4Nd/ivK173V@HZ2#Q(sN]04e%##7X)!|P-Syl(N~CqE6s');
define('LOGGED_IN_KEY', 'w#78c;s(JZZ33](89#(_739d1rSo#67[6-H8/~6O1QI5;*H)/H8dq;h!1B89AgkR');
define('NONCE_KEY', 'srJ;:/ir56cYE+)4XjJ|H4hXU_Ay/+|9tnG7%dh8y(45|6P1A4Lz1Gx;H6:2fmd#');
define('AUTH_SALT', 'N9|yfhHZZN85[Y_S4~4woK80++4I*O[r3)6!2-i4a2n-6U(Z81I%R8U_!H8n;mDU');
define('SECURE_AUTH_SALT', '9&/(Y8kqi0d1S98QJv(JR;fO[3:558v1+5:sf%[Gi]((@9HX56Cb)mal9Xy1P~MW');
define('LOGGED_IN_SALT', '@k5t%37oE98jtVHi!)g)2*x9C+1t4vtlp~#C)632c/9z6ngA1a;HbR4oMFG5-kM/');
define('NONCE_SALT', '9*f23@;9F~U_84Y3#eWw~R8qkSz2ixt1]F1/8p4I4v7ME14_&F/uOQf/4|9qI2SU');

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = '7yHM8Z0_';


define('WP_ALLOW_MULTISITE', true);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) )
	define( 'ABSPATH', dirname( __FILE__ ) . '/' );

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
