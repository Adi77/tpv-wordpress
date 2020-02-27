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
	RichText,
} = wp.editor;

const {
	TextControl
} = wp.components;

const {select} = wp.data;

const CarouselIndicatorCount = wp.element.createContext();


/**
 * Register: aa Gutenberg Block - Tpv Erfahrungsberichte Carousel
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
registerBlockType('tpv/testimonials-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Tpv Erfahrungs- berichte Carousel'), // Block title.
	icon: 'editor-quote', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('tpv-guten-blocks — Tpv Erfahrungs- berichte Karusell'),
		__('create-guten-block'),
	],
	attributes: {
		innerCount: {
			type: 'number',
			default: 0,
		},
		content: {
			type: 'number',
			default: 0,
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
		// get all child blocks to calculate carousel indicators
		const {clientId} = props;
		props.setAttributes({innerCount: select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks.length});

		return (
			<CarouselIndicatorCount.Provider value={select('core/editor').getBlocksByClientId(clientId)[0].innerBlocks}>
				<InnerBlocks
					allowedBlocks={['tpv/testimonials-carousel-item']}
				/>
			</CarouselIndicatorCount.Provider>
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
		let rows = [];
		for (let i = 0; i < props.attributes.innerCount; i++) {
			if (i === 0) {
				rows.push(<li data-target="#carouselTestimonialsIndicators" data-slide-to={i} className="active"></li>);
			} else {
				rows.push(<li data-target="#carouselTestimonialsIndicators" data-slide-to={i}></li>);
			}
		}
		return (
			<div id="carouselTestimonialsIndicators" className="carousel slide" data-ride="carousel"
				 data-interval="false">
				<ol className="carousel-indicators">
					{rows}
				</ol>
				<div className="carousel-inner">
					<InnerBlocks.Content/>
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				innerCount: {
					type: 'number',
					default: 0,
				},
			},
			migrate({innerCount}) {
				return {
					content: innerCount
				};
			},
			save(props) {
				let rows = [];
				for (let i = 0; i < props.attributes.innerCount; i++) {
					if (i === 0) {
						rows.push(<li data-target="#carouselTestimonialsIndicators" data-slide-to={i}
									  className="active"></li>);
					} else {
						rows.push(<li data-target="#carouselTestimonialsIndicators" data-slide-to={i}></li>);
					}
				}
				return (
					<div id="carouselTestimonialsIndicators" className="carousel slide" data-ride="carousel"
						 data-interval="false">
						<ol className="carousel-indicators">
							{rows}
						</ol>
						<div className="carousel-inner">
							<InnerBlocks.Content/>
						</div>
					</div>
				);
			},
		}
	]
});









/**
 * Register: aa Gutenberg Block - Tpv Erfahrungsberichte Carousel Item
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
registerBlockType('tpv/testimonials-carousel-item', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Tpv Erfahrungs- berichte Carousel Item '), // Block title.
	icon: 'star-filled', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('tpv-guten-blocks — Tpv Erfahrungsberichte Karusell Item'),
		__('create-guten-block'),
	],
	attributes: {
		carouselItemTextLeft: {
			type: 'string',
			source: 'html',
			selector: '.testimonial-text-left',
		},
		carouselItemEditorLeft: {
			type: 'string',
			source: 'html',
			selector: '.editor-name-left',
		},
		carouselItemEditorLocationLeft: {
			type: 'string',
			source: 'html',
			selector: '.editors-location-left',
		},
		carouselItemTextRight: {
			type: 'string',
			source: 'html',
			selector: '.testimonial-text-right',
		},
		carouselItemEditorRight: {
			type: 'string',
			source: 'html',
			selector: '.editor-name-right',
		},
		carouselItemEditorLocationRight: {
			type: 'string',
			source: 'html',
			selector: '.editors-location-right',
		},
		carouselItemPosition: {
			type: 'number',
			default: 0,
		},
		blockcontextConsumer: {
			type: 'number',
			default: 0,
		},
		content: {
			type: 'number',
			default: 0,
		},
	},
	parent: ['tpv/testimonials-carousel'],

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
			className,
			setAttributes,
			clientId,
		} = props;
		const {
			carouselItemPosition,
			carouselItemTextLeft,
			carouselItemEditorLeft,
			carouselItemEditorLocationLeft,
			carouselItemTextRight,
			carouselItemEditorRight,
			carouselItemEditorLocationRight,
		} = attributes;


		props.setAttributes({blockcontextConsumer: CarouselIndicatorCount.Consumer._currentValue});
		if (props.isSelected && props.attributes.blockcontextConsumer) {
			let itemPos = props.attributes.blockcontextConsumer.findIndex(el => el.clientId == props.clientId);
			props.setAttributes({carouselItemPosition: itemPos});
		}

		return (
			<div className={className}>
				{
					<InspectorControls>
						<TextControl
							label='Carousel Element Position'
							className='carouselElementPosition'
							value={carouselItemPosition}
							readonly='true'
						/>
					</InspectorControls>
				}
				<div className='leftCol'>
					<RichText
						tagName="div"
						value={carouselItemTextLeft}
						className="testimonial-text-left"
						onChange={(value) => setAttributes({carouselItemTextLeft: value})}
						placeholder={__('Editor Text', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
					<RichText
						tagName="span"
						value={carouselItemEditorLeft}
						className="editor-name-left"
						onChange={(value) => setAttributes({carouselItemEditorLeft: value})}
						placeholder={__('Editor Name', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
					<RichText
						tagName="span"
						value={carouselItemEditorLocationLeft}
						className="editors-location-left"
						onChange={(value) => setAttributes({carouselItemEditorLocationLeft: value})}
						placeholder={__('Editor Ort', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
				</div>
				<div className='rightCol'>
					<RichText
						tagName="div"
						value={carouselItemTextRight}
						className="testimonial-text-right"
						onChange={(value) => setAttributes({carouselItemTextRight: value})}
						placeholder={__('Editor Text', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
					<RichText
						tagName="span"
						value={carouselItemEditorRight}
						className="editor-name-right"
						onChange={(value) => setAttributes({carouselItemEditorRight: value})}
						placeholder={__('Editor Name', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
					<RichText
						tagName="span"
						value={carouselItemEditorLocationRight}
						className="editors-location-right"
						onChange={(value) => setAttributes({carouselItemEditorLocationRight: value})}
						placeholder={__('Editor Ort', 'gt-blocks')}
						keepPlaceholderOnFocus
					/>
				</div>
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
			className,
			setAttributes,
		} = props;
		const {
			carouselItemPosition,
			carouselItemTextLeft,
			carouselItemEditorLeft,
			carouselItemEditorLocationLeft,
			carouselItemTextRight,
			carouselItemEditorRight,
			carouselItemEditorLocationRight,
		} = attributes;


		let carouselItemClass = '';
		if (carouselItemPosition === 0) {
			carouselItemClass = 'carousel-item active';
		} else {

			carouselItemClass = 'carousel-item';
		}


		return (
			<div className={carouselItemClass}>
				<div className="testimonial-container">
					<RichText.Content
						tagName="div"
						className="testimonial-text-left"
						value={carouselItemTextLeft}
					/>
					<div className="name-and-location-left">
						<b>
							<RichText.Content
								tagName="span"
								className="editor-name-left"
								value={carouselItemEditorLeft}
							/>
						</b>&nbsp;/&nbsp;
						<RichText.Content
							tagName="span"
							className="editors-location-left"
							value={carouselItemEditorLocationLeft}
						/>
					</div>
				</div>

				<div className="testimonial-container">
					<RichText.Content
						tagName="div"
						className="testimonial-text-right"
						value={carouselItemTextRight}
					/>
					<div className="name-and-location-right">
						<b>
							<RichText.Content
								tagName="span"
								className="editor-name-right"
								value={carouselItemEditorRight}
							/>
						</b>&nbsp;/&nbsp;
						<RichText.Content
							tagName="span"
							className="editors-location-right"
							value={carouselItemEditorLocationRight}
						/>
					</div>
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				carouselItemTextLeft: {
					type: 'string',
					source: 'html',
					selector: '.testimonial-text-left',
				},
				carouselItemEditorLeft: {
					type: 'string',
					source: 'html',
					selector: '.editor-name-left',
				},
				carouselItemEditorLocationLeft: {
					type: 'string',
					source: 'html',
					selector: '.editors-location-left',
				},
				carouselItemTextRight: {
					type: 'string',
					source: 'html',
					selector: '.testimonial-text-right',
				},
				carouselItemEditorRight: {
					type: 'string',
					source: 'html',
					selector: '.editor-name-right',
				},
				carouselItemEditorLocationRight: {
					type: 'string',
					source: 'html',
					selector: '.editors-location-right',
				},
				carouselItemPosition: {
					type: 'number',
					default: 0,
				},
				blockcontextConsumer: {
					type: 'number',
					default: 0,
				},
				content: {
					type: 'number',
					default: 0,
				},
			},
			migrate({blockcontextConsumer}) {
				return {
					content: blockcontextConsumer
				};
			},
			save(props) {
				const {
					attributes,
					className,
					setAttributes,
				} = props;
				const {
					carouselItemPosition,
					carouselItemTextLeft,
					carouselItemEditorLeft,
					carouselItemEditorLocationLeft,
					carouselItemTextRight,
					carouselItemEditorRight,
					carouselItemEditorLocationRight,
				} = attributes;


				let carouselItemClass = '';
				if (carouselItemPosition === 0) {
					carouselItemClass = 'carousel-item active';
				} else {

					carouselItemClass = 'carousel-item';
				}


				return (
					<div className={carouselItemClass}>

						<div className="testimonial-container">
							<RichText.Content
								tagName="div"
								className="testimonial-text-left"
								value={carouselItemTextLeft}
							/>
							<div className="name-and-location-left">
								<b>
									<RichText.Content
										tagName="span"
										className="editor-name-left"
										value={carouselItemEditorLeft}
									/>
								</b>&nbsp;/&nbsp;
								<RichText.Content
									tagName="span"
									className="editors-location-left"
									value={carouselItemEditorLocationLeft}
								/>
							</div>
						</div>

						<div className="testimonial-container">
							<RichText.Content
								tagName="div"
								className="testimonial-text-right"
								value={carouselItemTextRight}
							/>
							<div className="name-and-location-right">
								<b>
									<RichText.Content
										tagName="span"
										className="editor-name-right"
										value={carouselItemEditorRight}
									/>
								</b>&nbsp;/&nbsp;
								<RichText.Content
									tagName="span"
									className="editors-location-right"
									value={carouselItemEditorLocationRight}
								/>
							</div>
						</div>

					</div>

				);
			},
		}
	]
});
