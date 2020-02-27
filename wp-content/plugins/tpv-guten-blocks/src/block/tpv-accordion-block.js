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
const {registerBlockType} = wp.blocks; // Import registerBlockType() from wp.blocks
const {
	InnerBlocks,
	InspectorControls,
	RichText,
} = wp.editor;

const {
	TextControl
} = wp.components;

const MyBlockContext = wp.element.createContext();

/**
 * Register: aa Gutenberg Block - Tpv Accordion Container
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
registerBlockType('tpv/guten-blocks-accordion-container', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Tpv Accordion Container'), // Block title.
	icon: 'excerpt-view', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('tpv-guten-blocks — Tpv Accordion Container'),
		__('create-guten-block'),
	],
	attributes: {
		accordionName: {
			type: 'string',
			source: 'attribute',
			default: 'accordion-container-' + parseInt( 100000 * Math.random() ),
			selector: 'div.tpv-accordion',
			attribute: 'id'
		},
		content: {
			type: 'string',
			default: 'Accordion Name',
		}
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
			className,
			setAttributes,
		} = props;
		const {
			accordionName,
		} = attributes;

		return (
			<div id={accordionName} className={className}>
				{
					<InspectorControls>
						<TextControl
							label='Name / ID'
							className='accordionNameInput'
							value={accordionName}
							onChange={(value) => setAttributes({accordionName: value.replace(/[&\/\\#,+()$~%.'":*?<>{}\s+]/g, '_')})}
							readonly='true'
						/>
					</InspectorControls>
				}
				<MyBlockContext.Provider value={props.attributes.accordionName}>
					<InnerBlocks
						allowedBlocks={['tpv/guten-blocks-accordion-element1']}
					/>
				</MyBlockContext.Provider>
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

		return (
			<div id={props.attributes.accordionName} className="tpv-accordion">
				<InnerBlocks.Content/>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				accordionName: {
					type: 'string',
					source: 'attribute',
					default: 'Accordion Name',
					selector: 'div.tpv-accordion',
					attribute: 'id'
				},
			},
			migrate({accordionName}) {
				return {
					content: accordionName
				};
			},
			save(props) {
				return (
					<div id={props.attributes.accordionName} className="tpv-accordion">
						<InnerBlocks.Content/>
					</div>
				);
			},
		}
	]
});






/**
 * Register: Gutenberg Block - Tpv Accordion Element
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
registerBlockType('tpv/guten-blocks-accordion-element1', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __('Tpv Accordion Element'), // Block title.
	icon: 'editor-insertmore', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__('tpv-guten-blocks — Tpv Accordion Element'),
		__('create-guten-block'),
	],
	attributes: {
		accordionHeader: {
			type: 'string',
			source: 'html',
			selector: '.tpv-accordion-header',
		},
		blockcontextConsumer: {
			type: 'string',
			source: 'attribute',
			default: '#tpv-accordion',
			selector: 'div.collapse',
			attribute: 'data-parent'
		},
		content: {
			type: 'string',
			default: '#tpv-accordion',
		}
	},
	parent: [ 'tpv/guten-blocks-accordion-container' ],

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
		} = props;
		const {
			accordionHeader,
		} = attributes;

		props.setAttributes( { blockcontextConsumer: '#'+ MyBlockContext.Consumer._currentValue } );

		return (
			<div className={props.className} >
				<RichText
					tagName="div"
					value={accordionHeader}
					className="tpv-accordion-header"
					onChange={(value) => setAttributes({accordionHeader: value})}
					placeholder={__('Überschrift', 'gt-blocks')}
					keepPlaceholderOnFocus
				/>

				<InnerBlocks/>
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
			accordionHeader,
			blockcontextConsumer,
		} = attributes;
		let accordionVar = accordionHeader.replace(/[&\/\\#,+()$~%.'":*?<>{}\s+]/g, '_');
		let accordionVarHash = '#' + accordionVar;
		let accordionHeaderVar = accordionVar + 'heading';

		return (
			<div className="card">
				<div className="card-header" id={accordionHeaderVar}>
					<h5 className="mb-0">
						<RichText.Content
							tagName="button"
							className="tpv-accordion-header btn btn-link"
							data-toggle="collapse"
							data-target={accordionVarHash} aria-expanded="false"
							aria-controls={accordionVar}
							value={accordionHeader}
						/>
					</h5>
				</div>
				<div id={accordionVar} className="collapse" aria-labelledby={accordionHeaderVar}
					 data-parent={props.attributes.blockcontextConsumer}>
					<div className="card-body">
						<InnerBlocks.Content/>
					</div>
				</div>
			</div>
		);
	},
	deprecated: [
		{
			attributes: {
				blockcontextConsumer: {
					type: 'string',
					source: 'attribute',
					default: '#tpv-accordion',
					selector: 'div.collapse',
					attribute: 'data-parent'
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
				} = props;
				const {
					accordionHeader,
					blockcontextConsumer,
				} = attributes;
				return (
					<div className="card">
						<div className="card-header" id="professional-support-heading">
							<h5 className="mb-0">

								<RichText.Content
									tagName="button"
									className="tpv-accordion-header btn btn-link"
									data-toggle="collapse"
									data-target="#professional-support" aria-expanded="false"
									aria-controls="professional-support"
									value={accordionHeader}
								/>
							</h5>
						</div>
						<div id="professional-support" className="collapse"
							 aria-labelledby="professional-support-heading"
							 data-parent={props.attributes.blockcontextConsumer}>
							<div className="card-body">
								<InnerBlocks.Content/>
							</div>
						</div>
					</div>
				);
			},
		}
	]
});

