/**
 * BLOCK: tpv-guten-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const {__} = wp.i18n; // Import __() from wp.i18n
const {
	registerBlockType,
} = wp.blocks; // Import registerBlockType() from wp.blocks

const {
	InnerBlocks,
	InspectorControls,
	BlockControls,
	BlockAlignmentToolbar,
	MediaUpload,
	MediaUploadCheck,
} = wp.editor;

const {
	TextControl,
	Button
} = wp.components;


/**
 * Register: aa Gutenberg Block - Tpv Image and Text Element
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('tpv/image-and-text-element', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Tpv Bild und Text Element'), // Block title.
	icon: 'align-left', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('tpv-guten-blocks — Tpv Bild und Text Element'),
		__('create-guten-block'),
	],
	attributes: {
		alignment: {
			type: 'string',
		},
		imageUrl: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'src',
		},
		imageAltTag: {
			type: 'string',
			source: 'attribute',
			selector: 'img',
			attribute: 'alt',
		},
		content: {
			type: 'string'
		},
	},

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function (props) {
		const {
			attributes,
			setAttributes,
			className,
		} = props;

		const {
			alignment,
			imageUrl,
			imageAltTag,
		} = attributes;

		const ALLOWED_MEDIA_TYPES = ['image', 'video'];

		const getImageButton = (openEvent) => {
			if (imageUrl) {
				return (
					<img
						src={imageUrl}
						onClick={openEvent}
						className="image"
						alt={imageAltTag}
					/>
				);
			} else {
				return (
					<div className="button-container">
						<Button
							onClick={openEvent}
							className="button button-large"
						>
							Bild einfügen
						</Button>
					</div>
				);
			}
		};

		const onChangeAlignment = (newAlignment) => {
			props.setAttributes({alignment: newAlignment === undefined ? 'none' : newAlignment});
		};

		const DEFAULT_CONTROLS = ['left', 'right'];

		let leftCol = 'leftCol';
		let rightCol = 'rightCol';
		if (alignment === 'right') {
			leftCol = 'leftCol switchRight';
			rightCol = 'rightCol switchLeft';
		}

		return (
			<div className={className}>
				{
					<BlockControls>
						<BlockAlignmentToolbar
							value={alignment}
							onChange={onChangeAlignment}
							controls={DEFAULT_CONTROLS}
						/>
					</BlockControls>
				}
				<div class={leftCol}>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={(value) => setAttributes({
								imageUrl: value.sizes.full.url,
								imageAltTag: value.alt
							})}
							allowedTypes={ALLOWED_MEDIA_TYPES}
							render={({open}) => getImageButton(open)}
						/>
					</MediaUploadCheck>
				</div>
				<div class={rightCol}>
					<InnerBlocks/>

				</div>
				<div className='wp-clearfix'></div>
			</div>
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function (props) {
		const {
			attributes,
		} = props;

		const {
			alignment,
			imageUrl,
			imageAltTag,
		} = attributes;

		let leftColClass = 'col-md-5';
		if (alignment === 'right') {
			leftColClass = 'col-md-5 order-2';
		}

		return (
			<div>
				<div className={leftColClass}>
					<img className="image" src={imageUrl} alt={imageAltTag}/>
				</div>
				<div className="col-md-7">
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				alignment: {
					type: 'string',
				},

				imageUrl: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'src',
				},
				imageAltTag: {
					type: 'string',
					source: 'attribute',
					selector: 'img',
					attribute: 'alt',
				},
			},
			migrate({imageAltTag}) {
				return {
					content: imageAltTag
				};
			},
			save(props) {
				const {
					attributes,
				} = props;

				const {
					alignment,
					imageUrl,
					imageAltTag,
				} = attributes;

				let leftColClass = 'col-md-5';
				if (alignment === 'right') {
					leftColClass = 'col-md-5 order-2';
				}
				return (
					<div>
						<div className={leftColClass}>
							<img className="image" src={imageUrl} alt={imageAltTag}/>
						</div>
						<div className="col-md-7">
							<InnerBlocks.Content/>
						</div>
					</div>
				);
			},
		}
	]
});
