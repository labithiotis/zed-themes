export const validate = validate10;
export default validate10;
const schema11 = {
	$id: "https://github.com/zed-industries/extensions/blob/main/schemas/theme-family.json",
	$schema: "http://json-schema.org/draft-07/schema#",
	title: "ThemeFamilyContent",
	description: "The content of a serialized theme family.",
	type: "object",
	required: ["author", "name", "themes"],
	properties: {
		author: { type: "string" },
		name: { type: "string" },
		themes: { type: "array", items: { $ref: "#/definitions/ThemeContent" } },
	},
	definitions: {
		AppearanceContent: { type: "string", enum: ["light", "dark"] },
		FontStyleContent: { type: "string", enum: ["normal", "italic", "oblique"] },
		HighlightStyleContent: {
			type: "object",
			required: ["color", "font_style", "font_weight"],
			properties: {
				color: { default: null, type: ["string", "null"] },
				font_style: {
					default: null,
					anyOf: [{ $ref: "#/definitions/FontStyleContent" }, { type: "null" }],
				},
				font_weight: {
					default: null,
					anyOf: [
						{ enum: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
						{ type: "null" },
					],
				},
			},
		},
		PlayerColorContent: {
			type: "object",
			properties: {
				background: { type: ["string", "null"] },
				cursor: { type: ["string", "null"] },
				selection: { type: ["string", "null"] },
			},
		},
		ThemeContent: {
			description: "The content of a serialized theme.",
			type: "object",
			required: ["appearance", "name", "style"],
			additionalProperties: false,
			properties: {
				appearance: { $ref: "#/definitions/AppearanceContent" },
				name: { type: "string" },
				style: { $ref: "#/definitions/ThemeStyleContent" },
			},
		},
		ThemeStyleContent: {
			description: "The content of a serialized theme.",
			type: "object",
			additionalProperties: false,
			required: ["syntax", "players"],
			properties: {
				background: {
					description:
						"Background Color. Used for the app background and blank panels or windows.",
					default: null,
					type: ["string", "null"],
				},
				border: {
					description:
						"Border color. Used for most borders, is usually a high contrast color.",
					default: null,
					type: ["string", "null"],
				},
				"border.disabled": {
					description:
						"Border color. Used for disabled elements, like a disabled input or button.",
					default: null,
					type: ["string", "null"],
				},
				"border.focused": {
					description:
						"Border color. Used for focused elements, like keyboard focused list item.",
					default: null,
					type: ["string", "null"],
				},
				"border.selected": {
					description:
						"Border color. Used for selected elements, like an active search filter or selected checkbox.",
					default: null,
					type: ["string", "null"],
				},
				"border.transparent": {
					description:
						"Border color. Used for transparent borders. Used for placeholder borders when an element gains a border on state change.",
					default: null,
					type: ["string", "null"],
				},
				"border.variant": {
					description:
						"Border color. Used for deemphasized borders, like a visual divider between two sections",
					default: null,
					type: ["string", "null"],
				},
				conflict: {
					description:
						"Indicates some kind of conflict, like a file changed on disk while it was open, or merge conflicts in a Git repository.",
					default: null,
					type: ["string", "null"],
				},
				"conflict.background": { default: null, type: ["string", "null"] },
				"conflict.border": { default: null, type: ["string", "null"] },
				created: {
					description:
						"Indicates something new, like a new file added to a Git repository.",
					default: null,
					type: ["string", "null"],
				},
				"created.background": { default: null, type: ["string", "null"] },
				"created.border": { default: null, type: ["string", "null"] },
				deleted: {
					description:
						"Indicates that something no longer exists, like a deleted file.",
					default: null,
					type: ["string", "null"],
				},
				"deleted.background": { default: null, type: ["string", "null"] },
				"deleted.border": { default: null, type: ["string", "null"] },
				"drop_target.background": {
					description:
						"Background Color. Used for the area that shows where a dragged element will be dropped.",
					default: null,
					type: ["string", "null"],
				},
				"editor.active_line.background": {
					default: null,
					type: ["string", "null"],
				},
				"editor.active_line_number": {
					description:
						"Text Color. Used for the text of the line number in the editor gutter when the line is highlighted.",
					default: null,
					type: ["string", "null"],
				},
				"editor.active_wrap_guide": { default: null, type: ["string", "null"] },
				"editor.background": { default: null, type: ["string", "null"] },
				"editor.document_highlight.read_background": {
					description:
						"Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
					default: null,
					type: ["string", "null"],
				},
				"editor.document_highlight.write_background": {
					description:
						"Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
					default: null,
					type: ["string", "null"],
				},
				"editor.foreground": { default: null, type: ["string", "null"] },
				"editor.gutter.background": { default: null, type: ["string", "null"] },
				"editor.highlighted_line.background": {
					default: null,
					type: ["string", "null"],
				},
				"editor.invisible": {
					description:
						"Text Color. Used to mark invisible characters in the editor.\n\nExample: spaces, tabs, carriage returns, etc.",
					default: null,
					type: ["string", "null"],
				},
				"editor.line_number": {
					description:
						"Text Color. Used for the text of the line number in the editor gutter.",
					default: null,
					type: ["string", "null"],
				},
				"editor.subheader.background": {
					default: null,
					type: ["string", "null"],
				},
				"editor.wrap_guide": { default: null, type: ["string", "null"] },
				"element.active": {
					description:
						"Background Color. Used for the active state of an element that should have a different background than the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
					default: null,
					type: ["string", "null"],
				},
				"element.background": {
					description:
						"Background Color. Used for the background of an element that should have a different background than the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have the same background as the surface it's on, use `ghost_element_background`.",
					default: null,
					type: ["string", "null"],
				},
				"element.disabled": {
					description:
						"Background Color. Used for the disabled state of an element that should have a different background than the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
					default: null,
					type: ["string", "null"],
				},
				"element.hover": {
					description:
						"Background Color. Used for the hover state of an element that should have a different background than the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
					default: null,
					type: ["string", "null"],
				},
				"element.selected": {
					description:
						'Background Color. Used for the selected state of an element that should have a different background than the surface it\'s on.\n\nSelected states are triggered by the element being selected (or "activated") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.',
					default: null,
					type: ["string", "null"],
				},
				"elevated_surface.background": {
					description:
						"Border color. Used for elevated surfaces, like a context menu, popup, or dialog.",
					default: null,
					type: ["string", "null"],
				},
				error: {
					description:
						"Indicates a system error, a failed operation or a diagnostic error.",
					default: null,
					type: ["string", "null"],
				},
				"error.background": { default: null, type: ["string", "null"] },
				"error.border": { default: null, type: ["string", "null"] },
				"ghost_element.active": {
					description:
						"Background Color. Used for the active state of a ghost element that should have the same background as the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
					default: null,
					type: ["string", "null"],
				},
				"ghost_element.background": {
					description:
						"Used for the background of a ghost element that should have the same background as the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have a different background than the surface it's on, use `element_background`.",
					default: null,
					type: ["string", "null"],
				},
				"ghost_element.disabled": {
					description:
						"Background Color. Used for the disabled state of a ghost element that should have the same background as the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
					default: null,
					type: ["string", "null"],
				},
				"ghost_element.hover": {
					description:
						"Background Color. Used for the hover state of a ghost element that should have the same background as the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
					default: null,
					type: ["string", "null"],
				},
				"ghost_element.selected": {
					description:
						'Background Color. Used for the selected state of a ghost element that should have the same background as the surface it\'s on.\n\nSelected states are triggered by the element being selected (or "activated") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.',
					default: null,
					type: ["string", "null"],
				},
				hidden: {
					description:
						"Represents a hidden status, such as a file being hidden in a file tree.",
					default: null,
					type: ["string", "null"],
				},
				"hidden.background": { default: null, type: ["string", "null"] },
				"hidden.border": { default: null, type: ["string", "null"] },
				hint: {
					description:
						"Indicates a hint or some kind of additional information.",
					default: null,
					type: ["string", "null"],
				},
				"hint.background": { default: null, type: ["string", "null"] },
				"hint.border": { default: null, type: ["string", "null"] },
				icon: {
					description:
						"Fill Color. Used for the default fill color of an icon.",
					default: null,
					type: ["string", "null"],
				},
				"icon.accent": {
					description:
						"Fill Color. Used for the accent fill color of an icon.\n\nThis might be used to show when a toggleable icon button is selected.",
					default: null,
					type: ["string", "null"],
				},
				"icon.disabled": {
					description:
						"Fill Color. Used for the disabled fill color of an icon.\n\nDisabled states are shown when a user cannot interact with an element, like a icon button.",
					default: null,
					type: ["string", "null"],
				},
				"icon.muted": {
					description:
						"Fill Color. Used for the muted or deemphasized fill color of an icon.\n\nThis might be used to show an icon in an inactive pane, or to demphasize a series of icons to give them less visual weight.",
					default: null,
					type: ["string", "null"],
				},
				"icon.placeholder": {
					description:
						"Fill Color. Used for the placeholder fill color of an icon.\n\nThis might be used to show an icon in an input that disappears when the user enters text.",
					default: null,
					type: ["string", "null"],
				},
				ignored: {
					description:
						"Indicates that something is deliberately ignored, such as a file or operation ignored by Git.",
					default: null,
					type: ["string", "null"],
				},
				"ignored.background": { default: null, type: ["string", "null"] },
				"ignored.border": { default: null, type: ["string", "null"] },
				info: {
					description: "Represents informational status updates or messages.",
					default: null,
					type: ["string", "null"],
				},
				"info.background": { default: null, type: ["string", "null"] },
				"info.border": { default: null, type: ["string", "null"] },
				"link_text.hover": { default: null, type: ["string", "null"] },
				modified: {
					description:
						"Indicates a changed or altered status, like a file that has been edited.",
					default: null,
					type: ["string", "null"],
				},
				"modified.background": { default: null, type: ["string", "null"] },
				"modified.border": { default: null, type: ["string", "null"] },
				"pane.focused_border": { default: null, type: ["string", "null"] },
				"panel.background": { default: null, type: ["string", "null"] },
				"panel.focused_border": { default: null, type: ["string", "null"] },
				players: {
					default: [],
					type: "array",
					items: { $ref: "#/definitions/PlayerColorContent" },
				},
				predictive: {
					description:
						"Indicates something that is predicted, like automatic code completion, or generated code.",
					default: null,
					type: ["string", "null"],
				},
				"predictive.background": { default: null, type: ["string", "null"] },
				"predictive.border": { default: null, type: ["string", "null"] },
				renamed: {
					description:
						"Represents a renamed status, such as a file that has been renamed.",
					default: null,
					type: ["string", "null"],
				},
				"renamed.background": { default: null, type: ["string", "null"] },
				"renamed.border": { default: null, type: ["string", "null"] },
				"scrollbar.thumb.border": {
					description: "The border color of the scrollbar thumb.",
					default: null,
					type: ["string", "null"],
				},
				"scrollbar.thumb.hover_background": {
					description: "The color of the scrollbar thumb when hovered over.",
					default: null,
					type: ["string", "null"],
				},
				"scrollbar.track.background": {
					description: "The background color of the scrollbar track.",
					default: null,
					type: ["string", "null"],
				},
				"scrollbar.track.border": {
					description: "The border color of the scrollbar track.",
					default: null,
					type: ["string", "null"],
				},
				"scrollbar_thumb.background": {
					description: "The color of the scrollbar thumb.",
					default: null,
					type: ["string", "null"],
				},
				"search.match_background": { default: null, type: ["string", "null"] },
				"status_bar.background": { default: null, type: ["string", "null"] },
				success: {
					description: "Indicates a successful operation or task completion.",
					default: null,
					type: ["string", "null"],
				},
				"success.background": { default: null, type: ["string", "null"] },
				"success.border": { default: null, type: ["string", "null"] },
				"surface.background": {
					description:
						"Background Color. Used for grounded surfaces like a panel or tab.",
					default: null,
					type: ["string", "null"],
				},
				syntax: {
					description: "The styles for syntax nodes.",
					default: {},
					type: "object",
					additionalProperties: { $ref: "#/definitions/HighlightStyleContent" },
				},
				"tab.active_background": { default: null, type: ["string", "null"] },
				"tab.inactive_background": { default: null, type: ["string", "null"] },
				"tab_bar.background": { default: null, type: ["string", "null"] },
				"terminal.ansi.black": {
					description: "Black ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.blue": {
					description: "Blue ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_black": {
					description: "Bright black ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_blue": {
					description: "Bright blue ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_cyan": {
					description: "Bright cyan ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_green": {
					description: "Bright green ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_magenta": {
					description: "Bright magenta ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_red": {
					description: "Bright red ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_white": {
					description: "Bright white ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.bright_yellow": {
					description: "Bright yellow ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.cyan": {
					description: "Cyan ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_black": {
					description: "Dim black ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_blue": {
					description: "Dim blue ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_cyan": {
					description: "Dim cyan ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_green": {
					description: "Dim green ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_magenta": {
					description: "Dim magenta ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_red": {
					description: "Dim red ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_white": {
					description: "Dim white ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.dim_yellow": {
					description: "Dim yellow ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.green": {
					description: "Green ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.magenta": {
					description: "Magenta ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.red": {
					description: "Red ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.white": {
					description: "White ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.ansi.yellow": {
					description: "Yellow ANSI terminal color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.background": {
					description: "Terminal background color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.bright_foreground": {
					description: "Bright terminal foreground color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.dim_foreground": {
					description: "Dim terminal foreground color.",
					default: null,
					type: ["string", "null"],
				},
				"terminal.foreground": {
					description: "Terminal foreground color.",
					default: null,
					type: ["string", "null"],
				},
				text: {
					description: "Text Color. Default text color used for most text.",
					default: null,
					type: ["string", "null"],
				},
				"text.accent": {
					description:
						"Text Color. Color used for emphasis or highlighting certain text, like an active filter or a matched character in a search.",
					default: null,
					type: ["string", "null"],
				},
				"text.disabled": {
					description:
						"Text Color. Color used for text denoting disabled elements. Typically, the color is faded or grayed out to emphasize the disabled state.",
					default: null,
					type: ["string", "null"],
				},
				"text.muted": {
					description:
						"Text Color. Color of muted or deemphasized text. It is a subdued version of the standard text color.",
					default: null,
					type: ["string", "null"],
				},
				"text.placeholder": {
					description:
						"Text Color. Color of the placeholder text typically shown in input fields to guide the user to enter valid data.",
					default: null,
					type: ["string", "null"],
				},
				"title_bar.background": { default: null, type: ["string", "null"] },
				"toolbar.background": { default: null, type: ["string", "null"] },
				unreachable: {
					description:
						"Indicates some kind of unreachable status, like a block of code that can never be reached.",
					default: null,
					type: ["string", "null"],
				},
				"unreachable.background": { default: null, type: ["string", "null"] },
				"unreachable.border": { default: null, type: ["string", "null"] },
				warning: {
					description:
						"Represents a warning status, like an operation that is about to fail.",
					default: null,
					type: ["string", "null"],
				},
				"warning.background": { default: null, type: ["string", "null"] },
				"warning.border": { default: null, type: ["string", "null"] },
			},
		},
	},
};
const schema12 = {
	description: "The content of a serialized theme.",
	type: "object",
	required: ["appearance", "name", "style"],
	additionalProperties: false,
	properties: {
		appearance: { $ref: "#/definitions/AppearanceContent" },
		name: { type: "string" },
		style: { $ref: "#/definitions/ThemeStyleContent" },
	},
};
const schema13 = { type: "string", enum: ["light", "dark"] };
const schema14 = {
	description: "The content of a serialized theme.",
	type: "object",
	additionalProperties: false,
	required: ["syntax", "players"],
	properties: {
		background: {
			description:
				"Background Color. Used for the app background and blank panels or windows.",
			default: null,
			type: ["string", "null"],
		},
		border: {
			description:
				"Border color. Used for most borders, is usually a high contrast color.",
			default: null,
			type: ["string", "null"],
		},
		"border.disabled": {
			description:
				"Border color. Used for disabled elements, like a disabled input or button.",
			default: null,
			type: ["string", "null"],
		},
		"border.focused": {
			description:
				"Border color. Used for focused elements, like keyboard focused list item.",
			default: null,
			type: ["string", "null"],
		},
		"border.selected": {
			description:
				"Border color. Used for selected elements, like an active search filter or selected checkbox.",
			default: null,
			type: ["string", "null"],
		},
		"border.transparent": {
			description:
				"Border color. Used for transparent borders. Used for placeholder borders when an element gains a border on state change.",
			default: null,
			type: ["string", "null"],
		},
		"border.variant": {
			description:
				"Border color. Used for deemphasized borders, like a visual divider between two sections",
			default: null,
			type: ["string", "null"],
		},
		conflict: {
			description:
				"Indicates some kind of conflict, like a file changed on disk while it was open, or merge conflicts in a Git repository.",
			default: null,
			type: ["string", "null"],
		},
		"conflict.background": { default: null, type: ["string", "null"] },
		"conflict.border": { default: null, type: ["string", "null"] },
		created: {
			description:
				"Indicates something new, like a new file added to a Git repository.",
			default: null,
			type: ["string", "null"],
		},
		"created.background": { default: null, type: ["string", "null"] },
		"created.border": { default: null, type: ["string", "null"] },
		deleted: {
			description:
				"Indicates that something no longer exists, like a deleted file.",
			default: null,
			type: ["string", "null"],
		},
		"deleted.background": { default: null, type: ["string", "null"] },
		"deleted.border": { default: null, type: ["string", "null"] },
		"drop_target.background": {
			description:
				"Background Color. Used for the area that shows where a dragged element will be dropped.",
			default: null,
			type: ["string", "null"],
		},
		"editor.active_line.background": {
			default: null,
			type: ["string", "null"],
		},
		"editor.active_line_number": {
			description:
				"Text Color. Used for the text of the line number in the editor gutter when the line is highlighted.",
			default: null,
			type: ["string", "null"],
		},
		"editor.active_wrap_guide": { default: null, type: ["string", "null"] },
		"editor.background": { default: null, type: ["string", "null"] },
		"editor.document_highlight.read_background": {
			description:
				"Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
			default: null,
			type: ["string", "null"],
		},
		"editor.document_highlight.write_background": {
			description:
				"Read-access of a symbol, like reading a variable.\n\nA document highlight is a range inside a text document which deserves special attention. Usually a document highlight is visualized by changing the background color of its range.",
			default: null,
			type: ["string", "null"],
		},
		"editor.foreground": { default: null, type: ["string", "null"] },
		"editor.gutter.background": { default: null, type: ["string", "null"] },
		"editor.highlighted_line.background": {
			default: null,
			type: ["string", "null"],
		},
		"editor.invisible": {
			description:
				"Text Color. Used to mark invisible characters in the editor.\n\nExample: spaces, tabs, carriage returns, etc.",
			default: null,
			type: ["string", "null"],
		},
		"editor.line_number": {
			description:
				"Text Color. Used for the text of the line number in the editor gutter.",
			default: null,
			type: ["string", "null"],
		},
		"editor.subheader.background": { default: null, type: ["string", "null"] },
		"editor.wrap_guide": { default: null, type: ["string", "null"] },
		"element.active": {
			description:
				"Background Color. Used for the active state of an element that should have a different background than the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
			default: null,
			type: ["string", "null"],
		},
		"element.background": {
			description:
				"Background Color. Used for the background of an element that should have a different background than the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have the same background as the surface it's on, use `ghost_element_background`.",
			default: null,
			type: ["string", "null"],
		},
		"element.disabled": {
			description:
				"Background Color. Used for the disabled state of an element that should have a different background than the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
			default: null,
			type: ["string", "null"],
		},
		"element.hover": {
			description:
				"Background Color. Used for the hover state of an element that should have a different background than the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
			default: null,
			type: ["string", "null"],
		},
		"element.selected": {
			description:
				'Background Color. Used for the selected state of an element that should have a different background than the surface it\'s on.\n\nSelected states are triggered by the element being selected (or "activated") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.',
			default: null,
			type: ["string", "null"],
		},
		"elevated_surface.background": {
			description:
				"Border color. Used for elevated surfaces, like a context menu, popup, or dialog.",
			default: null,
			type: ["string", "null"],
		},
		error: {
			description:
				"Indicates a system error, a failed operation or a diagnostic error.",
			default: null,
			type: ["string", "null"],
		},
		"error.background": { default: null, type: ["string", "null"] },
		"error.border": { default: null, type: ["string", "null"] },
		"ghost_element.active": {
			description:
				"Background Color. Used for the active state of a ghost element that should have the same background as the surface it's on.\n\nActive states are triggered by the mouse button being pressed down on an element, or the Return button or other activator being pressd.",
			default: null,
			type: ["string", "null"],
		},
		"ghost_element.background": {
			description:
				"Used for the background of a ghost element that should have the same background as the surface it's on.\n\nElements might include: Buttons, Inputs, Checkboxes, Radio Buttons...\n\nFor an element that should have a different background than the surface it's on, use `element_background`.",
			default: null,
			type: ["string", "null"],
		},
		"ghost_element.disabled": {
			description:
				"Background Color. Used for the disabled state of a ghost element that should have the same background as the surface it's on.\n\nDisabled states are shown when a user cannot interact with an element, like a disabled button or input.",
			default: null,
			type: ["string", "null"],
		},
		"ghost_element.hover": {
			description:
				"Background Color. Used for the hover state of a ghost element that should have the same background as the surface it's on.\n\nHover states are triggered by the mouse entering an element, or a finger touching an element on a touch screen.",
			default: null,
			type: ["string", "null"],
		},
		"ghost_element.selected": {
			description:
				'Background Color. Used for the selected state of a ghost element that should have the same background as the surface it\'s on.\n\nSelected states are triggered by the element being selected (or "activated") by the user.\n\nThis could include a selected checkbox, a toggleable button that is toggled on, etc.',
			default: null,
			type: ["string", "null"],
		},
		hidden: {
			description:
				"Represents a hidden status, such as a file being hidden in a file tree.",
			default: null,
			type: ["string", "null"],
		},
		"hidden.background": { default: null, type: ["string", "null"] },
		"hidden.border": { default: null, type: ["string", "null"] },
		hint: {
			description: "Indicates a hint or some kind of additional information.",
			default: null,
			type: ["string", "null"],
		},
		"hint.background": { default: null, type: ["string", "null"] },
		"hint.border": { default: null, type: ["string", "null"] },
		icon: {
			description: "Fill Color. Used for the default fill color of an icon.",
			default: null,
			type: ["string", "null"],
		},
		"icon.accent": {
			description:
				"Fill Color. Used for the accent fill color of an icon.\n\nThis might be used to show when a toggleable icon button is selected.",
			default: null,
			type: ["string", "null"],
		},
		"icon.disabled": {
			description:
				"Fill Color. Used for the disabled fill color of an icon.\n\nDisabled states are shown when a user cannot interact with an element, like a icon button.",
			default: null,
			type: ["string", "null"],
		},
		"icon.muted": {
			description:
				"Fill Color. Used for the muted or deemphasized fill color of an icon.\n\nThis might be used to show an icon in an inactive pane, or to demphasize a series of icons to give them less visual weight.",
			default: null,
			type: ["string", "null"],
		},
		"icon.placeholder": {
			description:
				"Fill Color. Used for the placeholder fill color of an icon.\n\nThis might be used to show an icon in an input that disappears when the user enters text.",
			default: null,
			type: ["string", "null"],
		},
		ignored: {
			description:
				"Indicates that something is deliberately ignored, such as a file or operation ignored by Git.",
			default: null,
			type: ["string", "null"],
		},
		"ignored.background": { default: null, type: ["string", "null"] },
		"ignored.border": { default: null, type: ["string", "null"] },
		info: {
			description: "Represents informational status updates or messages.",
			default: null,
			type: ["string", "null"],
		},
		"info.background": { default: null, type: ["string", "null"] },
		"info.border": { default: null, type: ["string", "null"] },
		"link_text.hover": { default: null, type: ["string", "null"] },
		modified: {
			description:
				"Indicates a changed or altered status, like a file that has been edited.",
			default: null,
			type: ["string", "null"],
		},
		"modified.background": { default: null, type: ["string", "null"] },
		"modified.border": { default: null, type: ["string", "null"] },
		"pane.focused_border": { default: null, type: ["string", "null"] },
		"panel.background": { default: null, type: ["string", "null"] },
		"panel.focused_border": { default: null, type: ["string", "null"] },
		players: {
			default: [],
			type: "array",
			items: { $ref: "#/definitions/PlayerColorContent" },
		},
		predictive: {
			description:
				"Indicates something that is predicted, like automatic code completion, or generated code.",
			default: null,
			type: ["string", "null"],
		},
		"predictive.background": { default: null, type: ["string", "null"] },
		"predictive.border": { default: null, type: ["string", "null"] },
		renamed: {
			description:
				"Represents a renamed status, such as a file that has been renamed.",
			default: null,
			type: ["string", "null"],
		},
		"renamed.background": { default: null, type: ["string", "null"] },
		"renamed.border": { default: null, type: ["string", "null"] },
		"scrollbar.thumb.border": {
			description: "The border color of the scrollbar thumb.",
			default: null,
			type: ["string", "null"],
		},
		"scrollbar.thumb.hover_background": {
			description: "The color of the scrollbar thumb when hovered over.",
			default: null,
			type: ["string", "null"],
		},
		"scrollbar.track.background": {
			description: "The background color of the scrollbar track.",
			default: null,
			type: ["string", "null"],
		},
		"scrollbar.track.border": {
			description: "The border color of the scrollbar track.",
			default: null,
			type: ["string", "null"],
		},
		"scrollbar_thumb.background": {
			description: "The color of the scrollbar thumb.",
			default: null,
			type: ["string", "null"],
		},
		"search.match_background": { default: null, type: ["string", "null"] },
		"status_bar.background": { default: null, type: ["string", "null"] },
		success: {
			description: "Indicates a successful operation or task completion.",
			default: null,
			type: ["string", "null"],
		},
		"success.background": { default: null, type: ["string", "null"] },
		"success.border": { default: null, type: ["string", "null"] },
		"surface.background": {
			description:
				"Background Color. Used for grounded surfaces like a panel or tab.",
			default: null,
			type: ["string", "null"],
		},
		syntax: {
			description: "The styles for syntax nodes.",
			default: {},
			type: "object",
			additionalProperties: { $ref: "#/definitions/HighlightStyleContent" },
		},
		"tab.active_background": { default: null, type: ["string", "null"] },
		"tab.inactive_background": { default: null, type: ["string", "null"] },
		"tab_bar.background": { default: null, type: ["string", "null"] },
		"terminal.ansi.black": {
			description: "Black ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.blue": {
			description: "Blue ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_black": {
			description: "Bright black ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_blue": {
			description: "Bright blue ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_cyan": {
			description: "Bright cyan ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_green": {
			description: "Bright green ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_magenta": {
			description: "Bright magenta ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_red": {
			description: "Bright red ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_white": {
			description: "Bright white ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.bright_yellow": {
			description: "Bright yellow ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.cyan": {
			description: "Cyan ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_black": {
			description: "Dim black ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_blue": {
			description: "Dim blue ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_cyan": {
			description: "Dim cyan ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_green": {
			description: "Dim green ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_magenta": {
			description: "Dim magenta ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_red": {
			description: "Dim red ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_white": {
			description: "Dim white ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.dim_yellow": {
			description: "Dim yellow ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.green": {
			description: "Green ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.magenta": {
			description: "Magenta ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.red": {
			description: "Red ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.white": {
			description: "White ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.ansi.yellow": {
			description: "Yellow ANSI terminal color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.background": {
			description: "Terminal background color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.bright_foreground": {
			description: "Bright terminal foreground color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.dim_foreground": {
			description: "Dim terminal foreground color.",
			default: null,
			type: ["string", "null"],
		},
		"terminal.foreground": {
			description: "Terminal foreground color.",
			default: null,
			type: ["string", "null"],
		},
		text: {
			description: "Text Color. Default text color used for most text.",
			default: null,
			type: ["string", "null"],
		},
		"text.accent": {
			description:
				"Text Color. Color used for emphasis or highlighting certain text, like an active filter or a matched character in a search.",
			default: null,
			type: ["string", "null"],
		},
		"text.disabled": {
			description:
				"Text Color. Color used for text denoting disabled elements. Typically, the color is faded or grayed out to emphasize the disabled state.",
			default: null,
			type: ["string", "null"],
		},
		"text.muted": {
			description:
				"Text Color. Color of muted or deemphasized text. It is a subdued version of the standard text color.",
			default: null,
			type: ["string", "null"],
		},
		"text.placeholder": {
			description:
				"Text Color. Color of the placeholder text typically shown in input fields to guide the user to enter valid data.",
			default: null,
			type: ["string", "null"],
		},
		"title_bar.background": { default: null, type: ["string", "null"] },
		"toolbar.background": { default: null, type: ["string", "null"] },
		unreachable: {
			description:
				"Indicates some kind of unreachable status, like a block of code that can never be reached.",
			default: null,
			type: ["string", "null"],
		},
		"unreachable.background": { default: null, type: ["string", "null"] },
		"unreachable.border": { default: null, type: ["string", "null"] },
		warning: {
			description:
				"Represents a warning status, like an operation that is about to fail.",
			default: null,
			type: ["string", "null"],
		},
		"warning.background": { default: null, type: ["string", "null"] },
		"warning.border": { default: null, type: ["string", "null"] },
	},
};
const schema15 = {
	type: "object",
	properties: {
		background: { type: ["string", "null"] },
		cursor: { type: ["string", "null"] },
		selection: { type: ["string", "null"] },
	},
};
const func2 = Object.prototype.hasOwnProperty;
const schema16 = {
	type: "object",
	required: ["color", "font_style", "font_weight"],
	properties: {
		color: { default: null, type: ["string", "null"] },
		font_style: {
			default: null,
			anyOf: [{ $ref: "#/definitions/FontStyleContent" }, { type: "null" }],
		},
		font_weight: {
			default: null,
			anyOf: [
				{ enum: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
				{ type: "null" },
			],
		},
	},
};
const schema17 = { type: "string", enum: ["normal", "italic", "oblique"] };
function validate13(
	data,
	{ instancePath = "", parentData, parentDataProperty, rootData = data } = {},
) {
	let vErrors = null;
	let errors = 0;
	if (errors === 0) {
		if (data && typeof data == "object" && !Array.isArray(data)) {
			let missing0;
			if (
				(data.color === undefined && (missing0 = "color")) ||
				(data.font_style === undefined && (missing0 = "font_style")) ||
				(data.font_weight === undefined && (missing0 = "font_weight"))
			) {
				validate13.errors = [
					{
						instancePath,
						schemaPath: "#/required",
						keyword: "required",
						params: { missingProperty: missing0 },
						message: "must have required property '" + missing0 + "'",
					},
				];
				return false;
			} else {
				if (data.color !== undefined) {
					const data0 = data.color;
					const _errs1 = errors;
					if (typeof data0 !== "string" && data0 !== null) {
						validate13.errors = [
							{
								instancePath: instancePath + "/color",
								schemaPath: "#/properties/color/type",
								keyword: "type",
								params: { type: schema16.properties.color.type },
								message: "must be string,null",
							},
						];
						return false;
					}
					var valid0 = _errs1 === errors;
				} else {
					var valid0 = true;
				}
				if (valid0) {
					if (data.font_style !== undefined) {
						const data1 = data.font_style;
						const _errs3 = errors;
						const _errs4 = errors;
						let valid1 = false;
						const _errs5 = errors;
						if (typeof data1 !== "string") {
							const err0 = {
								instancePath: instancePath + "/font_style",
								schemaPath: "#/definitions/FontStyleContent/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string",
							};
							if (vErrors === null) {
								vErrors = [err0];
							} else {
								vErrors.push(err0);
							}
							errors++;
						}
						if (
							!(data1 === "normal" || data1 === "italic" || data1 === "oblique")
						) {
							const err1 = {
								instancePath: instancePath + "/font_style",
								schemaPath: "#/definitions/FontStyleContent/enum",
								keyword: "enum",
								params: { allowedValues: schema17.enum },
								message: "must be equal to one of the allowed values",
							};
							if (vErrors === null) {
								vErrors = [err1];
							} else {
								vErrors.push(err1);
							}
							errors++;
						}
						var _valid0 = _errs5 === errors;
						valid1 = valid1 || _valid0;
						if (!valid1) {
							const _errs8 = errors;
							if (data1 !== null) {
								const err2 = {
									instancePath: instancePath + "/font_style",
									schemaPath: "#/properties/font_style/anyOf/1/type",
									keyword: "type",
									params: { type: "null" },
									message: "must be null",
								};
								if (vErrors === null) {
									vErrors = [err2];
								} else {
									vErrors.push(err2);
								}
								errors++;
							}
							var _valid0 = _errs8 === errors;
							valid1 = valid1 || _valid0;
						}
						if (!valid1) {
							const err3 = {
								instancePath: instancePath + "/font_style",
								schemaPath: "#/properties/font_style/anyOf",
								keyword: "anyOf",
								params: {},
								message: "must match a schema in anyOf",
							};
							if (vErrors === null) {
								vErrors = [err3];
							} else {
								vErrors.push(err3);
							}
							errors++;
							validate13.errors = vErrors;
							return false;
						} else {
							errors = _errs4;
							if (vErrors !== null) {
								if (_errs4) {
									vErrors.length = _errs4;
								} else {
									vErrors = null;
								}
							}
						}
						var valid0 = _errs3 === errors;
					} else {
						var valid0 = true;
					}
					if (valid0) {
						if (data.font_weight !== undefined) {
							const data2 = data.font_weight;
							const _errs10 = errors;
							const _errs11 = errors;
							let valid3 = false;
							const _errs12 = errors;
							if (
								!(
									data2 === 100 ||
									data2 === 200 ||
									data2 === 300 ||
									data2 === 400 ||
									data2 === 500 ||
									data2 === 600 ||
									data2 === 700 ||
									data2 === 800 ||
									data2 === 900
								)
							) {
								const err4 = {
									instancePath: instancePath + "/font_weight",
									schemaPath: "#/properties/font_weight/anyOf/0/enum",
									keyword: "enum",
									params: {
										allowedValues:
											schema16.properties.font_weight.anyOf[0].enum,
									},
									message: "must be equal to one of the allowed values",
								};
								if (vErrors === null) {
									vErrors = [err4];
								} else {
									vErrors.push(err4);
								}
								errors++;
							}
							var _valid1 = _errs12 === errors;
							valid3 = valid3 || _valid1;
							if (!valid3) {
								const _errs13 = errors;
								if (data2 !== null) {
									const err5 = {
										instancePath: instancePath + "/font_weight",
										schemaPath: "#/properties/font_weight/anyOf/1/type",
										keyword: "type",
										params: { type: "null" },
										message: "must be null",
									};
									if (vErrors === null) {
										vErrors = [err5];
									} else {
										vErrors.push(err5);
									}
									errors++;
								}
								var _valid1 = _errs13 === errors;
								valid3 = valid3 || _valid1;
							}
							if (!valid3) {
								const err6 = {
									instancePath: instancePath + "/font_weight",
									schemaPath: "#/properties/font_weight/anyOf",
									keyword: "anyOf",
									params: {},
									message: "must match a schema in anyOf",
								};
								if (vErrors === null) {
									vErrors = [err6];
								} else {
									vErrors.push(err6);
								}
								errors++;
								validate13.errors = vErrors;
								return false;
							} else {
								errors = _errs11;
								if (vErrors !== null) {
									if (_errs11) {
										vErrors.length = _errs11;
									} else {
										vErrors = null;
									}
								}
							}
							var valid0 = _errs10 === errors;
						} else {
							var valid0 = true;
						}
					}
				}
			}
		} else {
			validate13.errors = [
				{
					instancePath,
					schemaPath: "#/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
				},
			];
			return false;
		}
	}
	validate13.errors = vErrors;
	return errors === 0;
}
function validate12(
	data,
	{ instancePath = "", parentData, parentDataProperty, rootData = data } = {},
) {
	let vErrors = null;
	let errors = 0;
	if (errors === 0) {
		if (data && typeof data == "object" && !Array.isArray(data)) {
			let missing0;
			if (
				(data.syntax === undefined && (missing0 = "syntax")) ||
				(data.players === undefined && (missing0 = "players"))
			) {
				validate12.errors = [
					{
						instancePath,
						schemaPath: "#/required",
						keyword: "required",
						params: { missingProperty: missing0 },
						message: "must have required property '" + missing0 + "'",
					},
				];
				return false;
			} else {
				const _errs1 = errors;
				for (const key0 in data) {
					if (!func2.call(schema14.properties, key0)) {
						validate12.errors = [
							{
								instancePath,
								schemaPath: "#/additionalProperties",
								keyword: "additionalProperties",
								params: { additionalProperty: key0 },
								message: "must NOT have additional properties",
							},
						];
						return false;
						break;
					}
				}
				if (_errs1 === errors) {
					if (data.background !== undefined) {
						const data0 = data.background;
						const _errs2 = errors;
						if (typeof data0 !== "string" && data0 !== null) {
							validate12.errors = [
								{
									instancePath: instancePath + "/background",
									schemaPath: "#/properties/background/type",
									keyword: "type",
									params: { type: schema14.properties.background.type },
									message: "must be string,null",
								},
							];
							return false;
						}
						var valid0 = _errs2 === errors;
					} else {
						var valid0 = true;
					}
					if (valid0) {
						if (data.border !== undefined) {
							const data1 = data.border;
							const _errs4 = errors;
							if (typeof data1 !== "string" && data1 !== null) {
								validate12.errors = [
									{
										instancePath: instancePath + "/border",
										schemaPath: "#/properties/border/type",
										keyword: "type",
										params: { type: schema14.properties.border.type },
										message: "must be string,null",
									},
								];
								return false;
							}
							var valid0 = _errs4 === errors;
						} else {
							var valid0 = true;
						}
						if (valid0) {
							if (data["border.disabled"] !== undefined) {
								const data2 = data["border.disabled"];
								const _errs6 = errors;
								if (typeof data2 !== "string" && data2 !== null) {
									validate12.errors = [
										{
											instancePath: instancePath + "/border.disabled",
											schemaPath: "#/properties/border.disabled/type",
											keyword: "type",
											params: {
												type: schema14.properties["border.disabled"].type,
											},
											message: "must be string,null",
										},
									];
									return false;
								}
								var valid0 = _errs6 === errors;
							} else {
								var valid0 = true;
							}
							if (valid0) {
								if (data["border.focused"] !== undefined) {
									const data3 = data["border.focused"];
									const _errs8 = errors;
									if (typeof data3 !== "string" && data3 !== null) {
										validate12.errors = [
											{
												instancePath: instancePath + "/border.focused",
												schemaPath: "#/properties/border.focused/type",
												keyword: "type",
												params: {
													type: schema14.properties["border.focused"].type,
												},
												message: "must be string,null",
											},
										];
										return false;
									}
									var valid0 = _errs8 === errors;
								} else {
									var valid0 = true;
								}
								if (valid0) {
									if (data["border.selected"] !== undefined) {
										const data4 = data["border.selected"];
										const _errs10 = errors;
										if (typeof data4 !== "string" && data4 !== null) {
											validate12.errors = [
												{
													instancePath: instancePath + "/border.selected",
													schemaPath: "#/properties/border.selected/type",
													keyword: "type",
													params: {
														type: schema14.properties["border.selected"].type,
													},
													message: "must be string,null",
												},
											];
											return false;
										}
										var valid0 = _errs10 === errors;
									} else {
										var valid0 = true;
									}
									if (valid0) {
										if (data["border.transparent"] !== undefined) {
											const data5 = data["border.transparent"];
											const _errs12 = errors;
											if (typeof data5 !== "string" && data5 !== null) {
												validate12.errors = [
													{
														instancePath: instancePath + "/border.transparent",
														schemaPath: "#/properties/border.transparent/type",
														keyword: "type",
														params: {
															type: schema14.properties["border.transparent"]
																.type,
														},
														message: "must be string,null",
													},
												];
												return false;
											}
											var valid0 = _errs12 === errors;
										} else {
											var valid0 = true;
										}
										if (valid0) {
											if (data["border.variant"] !== undefined) {
												const data6 = data["border.variant"];
												const _errs14 = errors;
												if (typeof data6 !== "string" && data6 !== null) {
													validate12.errors = [
														{
															instancePath: instancePath + "/border.variant",
															schemaPath: "#/properties/border.variant/type",
															keyword: "type",
															params: {
																type: schema14.properties["border.variant"]
																	.type,
															},
															message: "must be string,null",
														},
													];
													return false;
												}
												var valid0 = _errs14 === errors;
											} else {
												var valid0 = true;
											}
											if (valid0) {
												if (data.conflict !== undefined) {
													const data7 = data.conflict;
													const _errs16 = errors;
													if (typeof data7 !== "string" && data7 !== null) {
														validate12.errors = [
															{
																instancePath: instancePath + "/conflict",
																schemaPath: "#/properties/conflict/type",
																keyword: "type",
																params: {
																	type: schema14.properties.conflict.type,
																},
																message: "must be string,null",
															},
														];
														return false;
													}
													var valid0 = _errs16 === errors;
												} else {
													var valid0 = true;
												}
												if (valid0) {
													if (data["conflict.background"] !== undefined) {
														const data8 = data["conflict.background"];
														const _errs18 = errors;
														if (typeof data8 !== "string" && data8 !== null) {
															validate12.errors = [
																{
																	instancePath:
																		instancePath + "/conflict.background",
																	schemaPath:
																		"#/properties/conflict.background/type",
																	keyword: "type",
																	params: {
																		type: schema14.properties[
																			"conflict.background"
																		].type,
																	},
																	message: "must be string,null",
																},
															];
															return false;
														}
														var valid0 = _errs18 === errors;
													} else {
														var valid0 = true;
													}
													if (valid0) {
														if (data["conflict.border"] !== undefined) {
															const data9 = data["conflict.border"];
															const _errs20 = errors;
															if (typeof data9 !== "string" && data9 !== null) {
																validate12.errors = [
																	{
																		instancePath:
																			instancePath + "/conflict.border",
																		schemaPath:
																			"#/properties/conflict.border/type",
																		keyword: "type",
																		params: {
																			type: schema14.properties[
																				"conflict.border"
																			].type,
																		},
																		message: "must be string,null",
																	},
																];
																return false;
															}
															var valid0 = _errs20 === errors;
														} else {
															var valid0 = true;
														}
														if (valid0) {
															if (data.created !== undefined) {
																const data10 = data.created;
																const _errs22 = errors;
																if (
																	typeof data10 !== "string" &&
																	data10 !== null
																) {
																	validate12.errors = [
																		{
																			instancePath: instancePath + "/created",
																			schemaPath: "#/properties/created/type",
																			keyword: "type",
																			params: {
																				type: schema14.properties.created.type,
																			},
																			message: "must be string,null",
																		},
																	];
																	return false;
																}
																var valid0 = _errs22 === errors;
															} else {
																var valid0 = true;
															}
															if (valid0) {
																if (data["created.background"] !== undefined) {
																	const data11 = data["created.background"];
																	const _errs24 = errors;
																	if (
																		typeof data11 !== "string" &&
																		data11 !== null
																	) {
																		validate12.errors = [
																			{
																				instancePath:
																					instancePath + "/created.background",
																				schemaPath:
																					"#/properties/created.background/type",
																				keyword: "type",
																				params: {
																					type: schema14.properties[
																						"created.background"
																					].type,
																				},
																				message: "must be string,null",
																			},
																		];
																		return false;
																	}
																	var valid0 = _errs24 === errors;
																} else {
																	var valid0 = true;
																}
																if (valid0) {
																	if (data["created.border"] !== undefined) {
																		const data12 = data["created.border"];
																		const _errs26 = errors;
																		if (
																			typeof data12 !== "string" &&
																			data12 !== null
																		) {
																			validate12.errors = [
																				{
																					instancePath:
																						instancePath + "/created.border",
																					schemaPath:
																						"#/properties/created.border/type",
																					keyword: "type",
																					params: {
																						type: schema14.properties[
																							"created.border"
																						].type,
																					},
																					message: "must be string,null",
																				},
																			];
																			return false;
																		}
																		var valid0 = _errs26 === errors;
																	} else {
																		var valid0 = true;
																	}
																	if (valid0) {
																		if (data.deleted !== undefined) {
																			const data13 = data.deleted;
																			const _errs28 = errors;
																			if (
																				typeof data13 !== "string" &&
																				data13 !== null
																			) {
																				validate12.errors = [
																					{
																						instancePath:
																							instancePath + "/deleted",
																						schemaPath:
																							"#/properties/deleted/type",
																						keyword: "type",
																						params: {
																							type: schema14.properties.deleted
																								.type,
																						},
																						message: "must be string,null",
																					},
																				];
																				return false;
																			}
																			var valid0 = _errs28 === errors;
																		} else {
																			var valid0 = true;
																		}
																		if (valid0) {
																			if (
																				data["deleted.background"] !== undefined
																			) {
																				const data14 =
																					data["deleted.background"];
																				const _errs30 = errors;
																				if (
																					typeof data14 !== "string" &&
																					data14 !== null
																				) {
																					validate12.errors = [
																						{
																							instancePath:
																								instancePath +
																								"/deleted.background",
																							schemaPath:
																								"#/properties/deleted.background/type",
																							keyword: "type",
																							params: {
																								type: schema14.properties[
																									"deleted.background"
																								].type,
																							},
																							message: "must be string,null",
																						},
																					];
																					return false;
																				}
																				var valid0 = _errs30 === errors;
																			} else {
																				var valid0 = true;
																			}
																			if (valid0) {
																				if (
																					data["deleted.border"] !== undefined
																				) {
																					const data15 = data["deleted.border"];
																					const _errs32 = errors;
																					if (
																						typeof data15 !== "string" &&
																						data15 !== null
																					) {
																						validate12.errors = [
																							{
																								instancePath:
																									instancePath +
																									"/deleted.border",
																								schemaPath:
																									"#/properties/deleted.border/type",
																								keyword: "type",
																								params: {
																									type: schema14.properties[
																										"deleted.border"
																									].type,
																								},
																								message: "must be string,null",
																							},
																						];
																						return false;
																					}
																					var valid0 = _errs32 === errors;
																				} else {
																					var valid0 = true;
																				}
																				if (valid0) {
																					if (
																						data["drop_target.background"] !==
																						undefined
																					) {
																						const data16 =
																							data["drop_target.background"];
																						const _errs34 = errors;
																						if (
																							typeof data16 !== "string" &&
																							data16 !== null
																						) {
																							validate12.errors = [
																								{
																									instancePath:
																										instancePath +
																										"/drop_target.background",
																									schemaPath:
																										"#/properties/drop_target.background/type",
																									keyword: "type",
																									params: {
																										type: schema14.properties[
																											"drop_target.background"
																										].type,
																									},
																									message:
																										"must be string,null",
																								},
																							];
																							return false;
																						}
																						var valid0 = _errs34 === errors;
																					} else {
																						var valid0 = true;
																					}
																					if (valid0) {
																						if (
																							data[
																								"editor.active_line.background"
																							] !== undefined
																						) {
																							const data17 =
																								data[
																									"editor.active_line.background"
																								];
																							const _errs36 = errors;
																							if (
																								typeof data17 !== "string" &&
																								data17 !== null
																							) {
																								validate12.errors = [
																									{
																										instancePath:
																											instancePath +
																											"/editor.active_line.background",
																										schemaPath:
																											"#/properties/editor.active_line.background/type",
																										keyword: "type",
																										params: {
																											type: schema14.properties[
																												"editor.active_line.background"
																											].type,
																										},
																										message:
																											"must be string,null",
																									},
																								];
																								return false;
																							}
																							var valid0 = _errs36 === errors;
																						} else {
																							var valid0 = true;
																						}
																						if (valid0) {
																							if (
																								data[
																									"editor.active_line_number"
																								] !== undefined
																							) {
																								const data18 =
																									data[
																										"editor.active_line_number"
																									];
																								const _errs38 = errors;
																								if (
																									typeof data18 !== "string" &&
																									data18 !== null
																								) {
																									validate12.errors = [
																										{
																											instancePath:
																												instancePath +
																												"/editor.active_line_number",
																											schemaPath:
																												"#/properties/editor.active_line_number/type",
																											keyword: "type",
																											params: {
																												type: schema14
																													.properties[
																													"editor.active_line_number"
																												].type,
																											},
																											message:
																												"must be string,null",
																										},
																									];
																									return false;
																								}
																								var valid0 = _errs38 === errors;
																							} else {
																								var valid0 = true;
																							}
																							if (valid0) {
																								if (
																									data[
																										"editor.active_wrap_guide"
																									] !== undefined
																								) {
																									const data19 =
																										data[
																											"editor.active_wrap_guide"
																										];
																									const _errs40 = errors;
																									if (
																										typeof data19 !==
																											"string" &&
																										data19 !== null
																									) {
																										validate12.errors = [
																											{
																												instancePath:
																													instancePath +
																													"/editor.active_wrap_guide",
																												schemaPath:
																													"#/properties/editor.active_wrap_guide/type",
																												keyword: "type",
																												params: {
																													type: schema14
																														.properties[
																														"editor.active_wrap_guide"
																													].type,
																												},
																												message:
																													"must be string,null",
																											},
																										];
																										return false;
																									}
																									var valid0 =
																										_errs40 === errors;
																								} else {
																									var valid0 = true;
																								}
																								if (valid0) {
																									if (
																										data[
																											"editor.background"
																										] !== undefined
																									) {
																										const data20 =
																											data["editor.background"];
																										const _errs42 = errors;
																										if (
																											typeof data20 !==
																												"string" &&
																											data20 !== null
																										) {
																											validate12.errors = [
																												{
																													instancePath:
																														instancePath +
																														"/editor.background",
																													schemaPath:
																														"#/properties/editor.background/type",
																													keyword: "type",
																													params: {
																														type: schema14
																															.properties[
																															"editor.background"
																														].type,
																													},
																													message:
																														"must be string,null",
																												},
																											];
																											return false;
																										}
																										var valid0 =
																											_errs42 === errors;
																									} else {
																										var valid0 = true;
																									}
																									if (valid0) {
																										if (
																											data[
																												"editor.document_highlight.read_background"
																											] !== undefined
																										) {
																											const data21 =
																												data[
																													"editor.document_highlight.read_background"
																												];
																											const _errs44 = errors;
																											if (
																												typeof data21 !==
																													"string" &&
																												data21 !== null
																											) {
																												validate12.errors = [
																													{
																														instancePath:
																															instancePath +
																															"/editor.document_highlight.read_background",
																														schemaPath:
																															"#/properties/editor.document_highlight.read_background/type",
																														keyword: "type",
																														params: {
																															type: schema14
																																.properties[
																																"editor.document_highlight.read_background"
																															].type,
																														},
																														message:
																															"must be string,null",
																													},
																												];
																												return false;
																											}
																											var valid0 =
																												_errs44 === errors;
																										} else {
																											var valid0 = true;
																										}
																										if (valid0) {
																											if (
																												data[
																													"editor.document_highlight.write_background"
																												] !== undefined
																											) {
																												const data22 =
																													data[
																														"editor.document_highlight.write_background"
																													];
																												const _errs46 = errors;
																												if (
																													typeof data22 !==
																														"string" &&
																													data22 !== null
																												) {
																													validate12.errors = [
																														{
																															instancePath:
																																instancePath +
																																"/editor.document_highlight.write_background",
																															schemaPath:
																																"#/properties/editor.document_highlight.write_background/type",
																															keyword: "type",
																															params: {
																																type: schema14
																																	.properties[
																																	"editor.document_highlight.write_background"
																																].type,
																															},
																															message:
																																"must be string,null",
																														},
																													];
																													return false;
																												}
																												var valid0 =
																													_errs46 === errors;
																											} else {
																												var valid0 = true;
																											}
																											if (valid0) {
																												if (
																													data[
																														"editor.foreground"
																													] !== undefined
																												) {
																													const data23 =
																														data[
																															"editor.foreground"
																														];
																													const _errs48 =
																														errors;
																													if (
																														typeof data23 !==
																															"string" &&
																														data23 !== null
																													) {
																														validate12.errors =
																															[
																																{
																																	instancePath:
																																		instancePath +
																																		"/editor.foreground",
																																	schemaPath:
																																		"#/properties/editor.foreground/type",
																																	keyword:
																																		"type",
																																	params: {
																																		type: schema14
																																			.properties[
																																			"editor.foreground"
																																		].type,
																																	},
																																	message:
																																		"must be string,null",
																																},
																															];
																														return false;
																													}
																													var valid0 =
																														_errs48 === errors;
																												} else {
																													var valid0 = true;
																												}
																												if (valid0) {
																													if (
																														data[
																															"editor.gutter.background"
																														] !== undefined
																													) {
																														const data24 =
																															data[
																																"editor.gutter.background"
																															];
																														const _errs50 =
																															errors;
																														if (
																															typeof data24 !==
																																"string" &&
																															data24 !== null
																														) {
																															validate12.errors =
																																[
																																	{
																																		instancePath:
																																			instancePath +
																																			"/editor.gutter.background",
																																		schemaPath:
																																			"#/properties/editor.gutter.background/type",
																																		keyword:
																																			"type",
																																		params: {
																																			type: schema14
																																				.properties[
																																				"editor.gutter.background"
																																			].type,
																																		},
																																		message:
																																			"must be string,null",
																																	},
																																];
																															return false;
																														}
																														var valid0 =
																															_errs50 ===
																															errors;
																													} else {
																														var valid0 = true;
																													}
																													if (valid0) {
																														if (
																															data[
																																"editor.highlighted_line.background"
																															] !== undefined
																														) {
																															const data25 =
																																data[
																																	"editor.highlighted_line.background"
																																];
																															const _errs52 =
																																errors;
																															if (
																																typeof data25 !==
																																	"string" &&
																																data25 !== null
																															) {
																																validate12.errors =
																																	[
																																		{
																																			instancePath:
																																				instancePath +
																																				"/editor.highlighted_line.background",
																																			schemaPath:
																																				"#/properties/editor.highlighted_line.background/type",
																																			keyword:
																																				"type",
																																			params: {
																																				type: schema14
																																					.properties[
																																					"editor.highlighted_line.background"
																																				].type,
																																			},
																																			message:
																																				"must be string,null",
																																		},
																																	];
																																return false;
																															}
																															var valid0 =
																																_errs52 ===
																																errors;
																														} else {
																															var valid0 = true;
																														}
																														if (valid0) {
																															if (
																																data[
																																	"editor.invisible"
																																] !== undefined
																															) {
																																const data26 =
																																	data[
																																		"editor.invisible"
																																	];
																																const _errs54 =
																																	errors;
																																if (
																																	typeof data26 !==
																																		"string" &&
																																	data26 !==
																																		null
																																) {
																																	validate12.errors =
																																		[
																																			{
																																				instancePath:
																																					instancePath +
																																					"/editor.invisible",
																																				schemaPath:
																																					"#/properties/editor.invisible/type",
																																				keyword:
																																					"type",
																																				params:
																																					{
																																						type: schema14
																																							.properties[
																																							"editor.invisible"
																																						]
																																							.type,
																																					},
																																				message:
																																					"must be string,null",
																																			},
																																		];
																																	return false;
																																}
																																var valid0 =
																																	_errs54 ===
																																	errors;
																															} else {
																																var valid0 = true;
																															}
																															if (valid0) {
																																if (
																																	data[
																																		"editor.line_number"
																																	] !==
																																	undefined
																																) {
																																	const data27 =
																																		data[
																																			"editor.line_number"
																																		];
																																	const _errs56 =
																																		errors;
																																	if (
																																		typeof data27 !==
																																			"string" &&
																																		data27 !==
																																			null
																																	) {
																																		validate12.errors =
																																			[
																																				{
																																					instancePath:
																																						instancePath +
																																						"/editor.line_number",
																																					schemaPath:
																																						"#/properties/editor.line_number/type",
																																					keyword:
																																						"type",
																																					params:
																																						{
																																							type: schema14
																																								.properties[
																																								"editor.line_number"
																																							]
																																								.type,
																																						},
																																					message:
																																						"must be string,null",
																																				},
																																			];
																																		return false;
																																	}
																																	var valid0 =
																																		_errs56 ===
																																		errors;
																																} else {
																																	var valid0 = true;
																																}
																																if (valid0) {
																																	if (
																																		data[
																																			"editor.subheader.background"
																																		] !==
																																		undefined
																																	) {
																																		const data28 =
																																			data[
																																				"editor.subheader.background"
																																			];
																																		const _errs58 =
																																			errors;
																																		if (
																																			typeof data28 !==
																																				"string" &&
																																			data28 !==
																																				null
																																		) {
																																			validate12.errors =
																																				[
																																					{
																																						instancePath:
																																							instancePath +
																																							"/editor.subheader.background",
																																						schemaPath:
																																							"#/properties/editor.subheader.background/type",
																																						keyword:
																																							"type",
																																						params:
																																							{
																																								type: schema14
																																									.properties[
																																									"editor.subheader.background"
																																								]
																																									.type,
																																							},
																																						message:
																																							"must be string,null",
																																					},
																																				];
																																			return false;
																																		}
																																		var valid0 =
																																			_errs58 ===
																																			errors;
																																	} else {
																																		var valid0 = true;
																																	}
																																	if (valid0) {
																																		if (
																																			data[
																																				"editor.wrap_guide"
																																			] !==
																																			undefined
																																		) {
																																			const data29 =
																																				data[
																																					"editor.wrap_guide"
																																				];
																																			const _errs60 =
																																				errors;
																																			if (
																																				typeof data29 !==
																																					"string" &&
																																				data29 !==
																																					null
																																			) {
																																				validate12.errors =
																																					[
																																						{
																																							instancePath:
																																								instancePath +
																																								"/editor.wrap_guide",
																																							schemaPath:
																																								"#/properties/editor.wrap_guide/type",
																																							keyword:
																																								"type",
																																							params:
																																								{
																																									type: schema14
																																										.properties[
																																										"editor.wrap_guide"
																																									]
																																										.type,
																																								},
																																							message:
																																								"must be string,null",
																																						},
																																					];
																																				return false;
																																			}
																																			var valid0 =
																																				_errs60 ===
																																				errors;
																																		} else {
																																			var valid0 = true;
																																		}
																																		if (
																																			valid0
																																		) {
																																			if (
																																				data[
																																					"element.active"
																																				] !==
																																				undefined
																																			) {
																																				const data30 =
																																					data[
																																						"element.active"
																																					];
																																				const _errs62 =
																																					errors;
																																				if (
																																					typeof data30 !==
																																						"string" &&
																																					data30 !==
																																						null
																																				) {
																																					validate12.errors =
																																						[
																																							{
																																								instancePath:
																																									instancePath +
																																									"/element.active",
																																								schemaPath:
																																									"#/properties/element.active/type",
																																								keyword:
																																									"type",
																																								params:
																																									{
																																										type: schema14
																																											.properties[
																																											"element.active"
																																										]
																																											.type,
																																									},
																																								message:
																																									"must be string,null",
																																							},
																																						];
																																					return false;
																																				}
																																				var valid0 =
																																					_errs62 ===
																																					errors;
																																			} else {
																																				var valid0 = true;
																																			}
																																			if (
																																				valid0
																																			) {
																																				if (
																																					data[
																																						"element.background"
																																					] !==
																																					undefined
																																				) {
																																					const data31 =
																																						data[
																																							"element.background"
																																						];
																																					const _errs64 =
																																						errors;
																																					if (
																																						typeof data31 !==
																																							"string" &&
																																						data31 !==
																																							null
																																					) {
																																						validate12.errors =
																																							[
																																								{
																																									instancePath:
																																										instancePath +
																																										"/element.background",
																																									schemaPath:
																																										"#/properties/element.background/type",
																																									keyword:
																																										"type",
																																									params:
																																										{
																																											type: schema14
																																												.properties[
																																												"element.background"
																																											]
																																												.type,
																																										},
																																									message:
																																										"must be string,null",
																																								},
																																							];
																																						return false;
																																					}
																																					var valid0 =
																																						_errs64 ===
																																						errors;
																																				} else {
																																					var valid0 = true;
																																				}
																																				if (
																																					valid0
																																				) {
																																					if (
																																						data[
																																							"element.disabled"
																																						] !==
																																						undefined
																																					) {
																																						const data32 =
																																							data[
																																								"element.disabled"
																																							];
																																						const _errs66 =
																																							errors;
																																						if (
																																							typeof data32 !==
																																								"string" &&
																																							data32 !==
																																								null
																																						) {
																																							validate12.errors =
																																								[
																																									{
																																										instancePath:
																																											instancePath +
																																											"/element.disabled",
																																										schemaPath:
																																											"#/properties/element.disabled/type",
																																										keyword:
																																											"type",
																																										params:
																																											{
																																												type: schema14
																																													.properties[
																																													"element.disabled"
																																												]
																																													.type,
																																											},
																																										message:
																																											"must be string,null",
																																									},
																																								];
																																							return false;
																																						}
																																						var valid0 =
																																							_errs66 ===
																																							errors;
																																					} else {
																																						var valid0 = true;
																																					}
																																					if (
																																						valid0
																																					) {
																																						if (
																																							data[
																																								"element.hover"
																																							] !==
																																							undefined
																																						) {
																																							const data33 =
																																								data[
																																									"element.hover"
																																								];
																																							const _errs68 =
																																								errors;
																																							if (
																																								typeof data33 !==
																																									"string" &&
																																								data33 !==
																																									null
																																							) {
																																								validate12.errors =
																																									[
																																										{
																																											instancePath:
																																												instancePath +
																																												"/element.hover",
																																											schemaPath:
																																												"#/properties/element.hover/type",
																																											keyword:
																																												"type",
																																											params:
																																												{
																																													type: schema14
																																														.properties[
																																														"element.hover"
																																													]
																																														.type,
																																												},
																																											message:
																																												"must be string,null",
																																										},
																																									];
																																								return false;
																																							}
																																							var valid0 =
																																								_errs68 ===
																																								errors;
																																						} else {
																																							var valid0 = true;
																																						}
																																						if (
																																							valid0
																																						) {
																																							if (
																																								data[
																																									"element.selected"
																																								] !==
																																								undefined
																																							) {
																																								const data34 =
																																									data[
																																										"element.selected"
																																									];
																																								const _errs70 =
																																									errors;
																																								if (
																																									typeof data34 !==
																																										"string" &&
																																									data34 !==
																																										null
																																								) {
																																									validate12.errors =
																																										[
																																											{
																																												instancePath:
																																													instancePath +
																																													"/element.selected",
																																												schemaPath:
																																													"#/properties/element.selected/type",
																																												keyword:
																																													"type",
																																												params:
																																													{
																																														type: schema14
																																															.properties[
																																															"element.selected"
																																														]
																																															.type,
																																													},
																																												message:
																																													"must be string,null",
																																											},
																																										];
																																									return false;
																																								}
																																								var valid0 =
																																									_errs70 ===
																																									errors;
																																							} else {
																																								var valid0 = true;
																																							}
																																							if (
																																								valid0
																																							) {
																																								if (
																																									data[
																																										"elevated_surface.background"
																																									] !==
																																									undefined
																																								) {
																																									const data35 =
																																										data[
																																											"elevated_surface.background"
																																										];
																																									const _errs72 =
																																										errors;
																																									if (
																																										typeof data35 !==
																																											"string" &&
																																										data35 !==
																																											null
																																									) {
																																										validate12.errors =
																																											[
																																												{
																																													instancePath:
																																														instancePath +
																																														"/elevated_surface.background",
																																													schemaPath:
																																														"#/properties/elevated_surface.background/type",
																																													keyword:
																																														"type",
																																													params:
																																														{
																																															type: schema14
																																																.properties[
																																																"elevated_surface.background"
																																															]
																																																.type,
																																														},
																																													message:
																																														"must be string,null",
																																												},
																																											];
																																										return false;
																																									}
																																									var valid0 =
																																										_errs72 ===
																																										errors;
																																								} else {
																																									var valid0 = true;
																																								}
																																								if (
																																									valid0
																																								) {
																																									if (
																																										data.error !==
																																										undefined
																																									) {
																																										const data36 =
																																											data.error;
																																										const _errs74 =
																																											errors;
																																										if (
																																											typeof data36 !==
																																												"string" &&
																																											data36 !==
																																												null
																																										) {
																																											validate12.errors =
																																												[
																																													{
																																														instancePath:
																																															instancePath +
																																															"/error",
																																														schemaPath:
																																															"#/properties/error/type",
																																														keyword:
																																															"type",
																																														params:
																																															{
																																																type: schema14
																																																	.properties
																																																	.error
																																																	.type,
																																															},
																																														message:
																																															"must be string,null",
																																													},
																																												];
																																											return false;
																																										}
																																										var valid0 =
																																											_errs74 ===
																																											errors;
																																									} else {
																																										var valid0 = true;
																																									}
																																									if (
																																										valid0
																																									) {
																																										if (
																																											data[
																																												"error.background"
																																											] !==
																																											undefined
																																										) {
																																											const data37 =
																																												data[
																																													"error.background"
																																												];
																																											const _errs76 =
																																												errors;
																																											if (
																																												typeof data37 !==
																																													"string" &&
																																												data37 !==
																																													null
																																											) {
																																												validate12.errors =
																																													[
																																														{
																																															instancePath:
																																																instancePath +
																																																"/error.background",
																																															schemaPath:
																																																"#/properties/error.background/type",
																																															keyword:
																																																"type",
																																															params:
																																																{
																																																	type: schema14
																																																		.properties[
																																																		"error.background"
																																																	]
																																																		.type,
																																																},
																																															message:
																																																"must be string,null",
																																														},
																																													];
																																												return false;
																																											}
																																											var valid0 =
																																												_errs76 ===
																																												errors;
																																										} else {
																																											var valid0 = true;
																																										}
																																										if (
																																											valid0
																																										) {
																																											if (
																																												data[
																																													"error.border"
																																												] !==
																																												undefined
																																											) {
																																												const data38 =
																																													data[
																																														"error.border"
																																													];
																																												const _errs78 =
																																													errors;
																																												if (
																																													typeof data38 !==
																																														"string" &&
																																													data38 !==
																																														null
																																												) {
																																													validate12.errors =
																																														[
																																															{
																																																instancePath:
																																																	instancePath +
																																																	"/error.border",
																																																schemaPath:
																																																	"#/properties/error.border/type",
																																																keyword:
																																																	"type",
																																																params:
																																																	{
																																																		type: schema14
																																																			.properties[
																																																			"error.border"
																																																		]
																																																			.type,
																																																	},
																																																message:
																																																	"must be string,null",
																																															},
																																														];
																																													return false;
																																												}
																																												var valid0 =
																																													_errs78 ===
																																													errors;
																																											} else {
																																												var valid0 = true;
																																											}
																																											if (
																																												valid0
																																											) {
																																												if (
																																													data[
																																														"ghost_element.active"
																																													] !==
																																													undefined
																																												) {
																																													const data39 =
																																														data[
																																															"ghost_element.active"
																																														];
																																													const _errs80 =
																																														errors;
																																													if (
																																														typeof data39 !==
																																															"string" &&
																																														data39 !==
																																															null
																																													) {
																																														validate12.errors =
																																															[
																																																{
																																																	instancePath:
																																																		instancePath +
																																																		"/ghost_element.active",
																																																	schemaPath:
																																																		"#/properties/ghost_element.active/type",
																																																	keyword:
																																																		"type",
																																																	params:
																																																		{
																																																			type: schema14
																																																				.properties[
																																																				"ghost_element.active"
																																																			]
																																																				.type,
																																																		},
																																																	message:
																																																		"must be string,null",
																																																},
																																															];
																																														return false;
																																													}
																																													var valid0 =
																																														_errs80 ===
																																														errors;
																																												} else {
																																													var valid0 = true;
																																												}
																																												if (
																																													valid0
																																												) {
																																													if (
																																														data[
																																															"ghost_element.background"
																																														] !==
																																														undefined
																																													) {
																																														const data40 =
																																															data[
																																																"ghost_element.background"
																																															];
																																														const _errs82 =
																																															errors;
																																														if (
																																															typeof data40 !==
																																																"string" &&
																																															data40 !==
																																																null
																																														) {
																																															validate12.errors =
																																																[
																																																	{
																																																		instancePath:
																																																			instancePath +
																																																			"/ghost_element.background",
																																																		schemaPath:
																																																			"#/properties/ghost_element.background/type",
																																																		keyword:
																																																			"type",
																																																		params:
																																																			{
																																																				type: schema14
																																																					.properties[
																																																					"ghost_element.background"
																																																				]
																																																					.type,
																																																			},
																																																		message:
																																																			"must be string,null",
																																																	},
																																																];
																																															return false;
																																														}
																																														var valid0 =
																																															_errs82 ===
																																															errors;
																																													} else {
																																														var valid0 = true;
																																													}
																																													if (
																																														valid0
																																													) {
																																														if (
																																															data[
																																																"ghost_element.disabled"
																																															] !==
																																															undefined
																																														) {
																																															const data41 =
																																																data[
																																																	"ghost_element.disabled"
																																																];
																																															const _errs84 =
																																																errors;
																																															if (
																																																typeof data41 !==
																																																	"string" &&
																																																data41 !==
																																																	null
																																															) {
																																																validate12.errors =
																																																	[
																																																		{
																																																			instancePath:
																																																				instancePath +
																																																				"/ghost_element.disabled",
																																																			schemaPath:
																																																				"#/properties/ghost_element.disabled/type",
																																																			keyword:
																																																				"type",
																																																			params:
																																																				{
																																																					type: schema14
																																																						.properties[
																																																						"ghost_element.disabled"
																																																					]
																																																						.type,
																																																				},
																																																			message:
																																																				"must be string,null",
																																																		},
																																																	];
																																																return false;
																																															}
																																															var valid0 =
																																																_errs84 ===
																																																errors;
																																														} else {
																																															var valid0 = true;
																																														}
																																														if (
																																															valid0
																																														) {
																																															if (
																																																data[
																																																	"ghost_element.hover"
																																																] !==
																																																undefined
																																															) {
																																																const data42 =
																																																	data[
																																																		"ghost_element.hover"
																																																	];
																																																const _errs86 =
																																																	errors;
																																																if (
																																																	typeof data42 !==
																																																		"string" &&
																																																	data42 !==
																																																		null
																																																) {
																																																	validate12.errors =
																																																		[
																																																			{
																																																				instancePath:
																																																					instancePath +
																																																					"/ghost_element.hover",
																																																				schemaPath:
																																																					"#/properties/ghost_element.hover/type",
																																																				keyword:
																																																					"type",
																																																				params:
																																																					{
																																																						type: schema14
																																																							.properties[
																																																							"ghost_element.hover"
																																																						]
																																																							.type,
																																																					},
																																																				message:
																																																					"must be string,null",
																																																			},
																																																		];
																																																	return false;
																																																}
																																																var valid0 =
																																																	_errs86 ===
																																																	errors;
																																															} else {
																																																var valid0 = true;
																																															}
																																															if (
																																																valid0
																																															) {
																																																if (
																																																	data[
																																																		"ghost_element.selected"
																																																	] !==
																																																	undefined
																																																) {
																																																	const data43 =
																																																		data[
																																																			"ghost_element.selected"
																																																		];
																																																	const _errs88 =
																																																		errors;
																																																	if (
																																																		typeof data43 !==
																																																			"string" &&
																																																		data43 !==
																																																			null
																																																	) {
																																																		validate12.errors =
																																																			[
																																																				{
																																																					instancePath:
																																																						instancePath +
																																																						"/ghost_element.selected",
																																																					schemaPath:
																																																						"#/properties/ghost_element.selected/type",
																																																					keyword:
																																																						"type",
																																																					params:
																																																						{
																																																							type: schema14
																																																								.properties[
																																																								"ghost_element.selected"
																																																							]
																																																								.type,
																																																						},
																																																					message:
																																																						"must be string,null",
																																																				},
																																																			];
																																																		return false;
																																																	}
																																																	var valid0 =
																																																		_errs88 ===
																																																		errors;
																																																} else {
																																																	var valid0 = true;
																																																}
																																																if (
																																																	valid0
																																																) {
																																																	if (
																																																		data.hidden !==
																																																		undefined
																																																	) {
																																																		const data44 =
																																																			data.hidden;
																																																		const _errs90 =
																																																			errors;
																																																		if (
																																																			typeof data44 !==
																																																				"string" &&
																																																			data44 !==
																																																				null
																																																		) {
																																																			validate12.errors =
																																																				[
																																																					{
																																																						instancePath:
																																																							instancePath +
																																																							"/hidden",
																																																						schemaPath:
																																																							"#/properties/hidden/type",
																																																						keyword:
																																																							"type",
																																																						params:
																																																							{
																																																								type: schema14
																																																									.properties
																																																									.hidden
																																																									.type,
																																																							},
																																																						message:
																																																							"must be string,null",
																																																					},
																																																				];
																																																			return false;
																																																		}
																																																		var valid0 =
																																																			_errs90 ===
																																																			errors;
																																																	} else {
																																																		var valid0 = true;
																																																	}
																																																	if (
																																																		valid0
																																																	) {
																																																		if (
																																																			data[
																																																				"hidden.background"
																																																			] !==
																																																			undefined
																																																		) {
																																																			const data45 =
																																																				data[
																																																					"hidden.background"
																																																				];
																																																			const _errs92 =
																																																				errors;
																																																			if (
																																																				typeof data45 !==
																																																					"string" &&
																																																				data45 !==
																																																					null
																																																			) {
																																																				validate12.errors =
																																																					[
																																																						{
																																																							instancePath:
																																																								instancePath +
																																																								"/hidden.background",
																																																							schemaPath:
																																																								"#/properties/hidden.background/type",
																																																							keyword:
																																																								"type",
																																																							params:
																																																								{
																																																									type: schema14
																																																										.properties[
																																																										"hidden.background"
																																																									]
																																																										.type,
																																																								},
																																																							message:
																																																								"must be string,null",
																																																						},
																																																					];
																																																				return false;
																																																			}
																																																			var valid0 =
																																																				_errs92 ===
																																																				errors;
																																																		} else {
																																																			var valid0 = true;
																																																		}
																																																		if (
																																																			valid0
																																																		) {
																																																			if (
																																																				data[
																																																					"hidden.border"
																																																				] !==
																																																				undefined
																																																			) {
																																																				const data46 =
																																																					data[
																																																						"hidden.border"
																																																					];
																																																				const _errs94 =
																																																					errors;
																																																				if (
																																																					typeof data46 !==
																																																						"string" &&
																																																					data46 !==
																																																						null
																																																				) {
																																																					validate12.errors =
																																																						[
																																																							{
																																																								instancePath:
																																																									instancePath +
																																																									"/hidden.border",
																																																								schemaPath:
																																																									"#/properties/hidden.border/type",
																																																								keyword:
																																																									"type",
																																																								params:
																																																									{
																																																										type: schema14
																																																											.properties[
																																																											"hidden.border"
																																																										]
																																																											.type,
																																																									},
																																																								message:
																																																									"must be string,null",
																																																							},
																																																						];
																																																					return false;
																																																				}
																																																				var valid0 =
																																																					_errs94 ===
																																																					errors;
																																																			} else {
																																																				var valid0 = true;
																																																			}
																																																			if (
																																																				valid0
																																																			) {
																																																				if (
																																																					data.hint !==
																																																					undefined
																																																				) {
																																																					const data47 =
																																																						data.hint;
																																																					const _errs96 =
																																																						errors;
																																																					if (
																																																						typeof data47 !==
																																																							"string" &&
																																																						data47 !==
																																																							null
																																																					) {
																																																						validate12.errors =
																																																							[
																																																								{
																																																									instancePath:
																																																										instancePath +
																																																										"/hint",
																																																									schemaPath:
																																																										"#/properties/hint/type",
																																																									keyword:
																																																										"type",
																																																									params:
																																																										{
																																																											type: schema14
																																																												.properties
																																																												.hint
																																																												.type,
																																																										},
																																																									message:
																																																										"must be string,null",
																																																								},
																																																							];
																																																						return false;
																																																					}
																																																					var valid0 =
																																																						_errs96 ===
																																																						errors;
																																																				} else {
																																																					var valid0 = true;
																																																				}
																																																				if (
																																																					valid0
																																																				) {
																																																					if (
																																																						data[
																																																							"hint.background"
																																																						] !==
																																																						undefined
																																																					) {
																																																						const data48 =
																																																							data[
																																																								"hint.background"
																																																							];
																																																						const _errs98 =
																																																							errors;
																																																						if (
																																																							typeof data48 !==
																																																								"string" &&
																																																							data48 !==
																																																								null
																																																						) {
																																																							validate12.errors =
																																																								[
																																																									{
																																																										instancePath:
																																																											instancePath +
																																																											"/hint.background",
																																																										schemaPath:
																																																											"#/properties/hint.background/type",
																																																										keyword:
																																																											"type",
																																																										params:
																																																											{
																																																												type: schema14
																																																													.properties[
																																																													"hint.background"
																																																												]
																																																													.type,
																																																											},
																																																										message:
																																																											"must be string,null",
																																																									},
																																																								];
																																																							return false;
																																																						}
																																																						var valid0 =
																																																							_errs98 ===
																																																							errors;
																																																					} else {
																																																						var valid0 = true;
																																																					}
																																																					if (
																																																						valid0
																																																					) {
																																																						if (
																																																							data[
																																																								"hint.border"
																																																							] !==
																																																							undefined
																																																						) {
																																																							const data49 =
																																																								data[
																																																									"hint.border"
																																																								];
																																																							const _errs100 =
																																																								errors;
																																																							if (
																																																								typeof data49 !==
																																																									"string" &&
																																																								data49 !==
																																																									null
																																																							) {
																																																								validate12.errors =
																																																									[
																																																										{
																																																											instancePath:
																																																												instancePath +
																																																												"/hint.border",
																																																											schemaPath:
																																																												"#/properties/hint.border/type",
																																																											keyword:
																																																												"type",
																																																											params:
																																																												{
																																																													type: schema14
																																																														.properties[
																																																														"hint.border"
																																																													]
																																																														.type,
																																																												},
																																																											message:
																																																												"must be string,null",
																																																										},
																																																									];
																																																								return false;
																																																							}
																																																							var valid0 =
																																																								_errs100 ===
																																																								errors;
																																																						} else {
																																																							var valid0 = true;
																																																						}
																																																						if (
																																																							valid0
																																																						) {
																																																							if (
																																																								data.icon !==
																																																								undefined
																																																							) {
																																																								const data50 =
																																																									data.icon;
																																																								const _errs102 =
																																																									errors;
																																																								if (
																																																									typeof data50 !==
																																																										"string" &&
																																																									data50 !==
																																																										null
																																																								) {
																																																									validate12.errors =
																																																										[
																																																											{
																																																												instancePath:
																																																													instancePath +
																																																													"/icon",
																																																												schemaPath:
																																																													"#/properties/icon/type",
																																																												keyword:
																																																													"type",
																																																												params:
																																																													{
																																																														type: schema14
																																																															.properties
																																																															.icon
																																																															.type,
																																																													},
																																																												message:
																																																													"must be string,null",
																																																											},
																																																										];
																																																									return false;
																																																								}
																																																								var valid0 =
																																																									_errs102 ===
																																																									errors;
																																																							} else {
																																																								var valid0 = true;
																																																							}
																																																							if (
																																																								valid0
																																																							) {
																																																								if (
																																																									data[
																																																										"icon.accent"
																																																									] !==
																																																									undefined
																																																								) {
																																																									const data51 =
																																																										data[
																																																											"icon.accent"
																																																										];
																																																									const _errs104 =
																																																										errors;
																																																									if (
																																																										typeof data51 !==
																																																											"string" &&
																																																										data51 !==
																																																											null
																																																									) {
																																																										validate12.errors =
																																																											[
																																																												{
																																																													instancePath:
																																																														instancePath +
																																																														"/icon.accent",
																																																													schemaPath:
																																																														"#/properties/icon.accent/type",
																																																													keyword:
																																																														"type",
																																																													params:
																																																														{
																																																															type: schema14
																																																																.properties[
																																																																"icon.accent"
																																																															]
																																																																.type,
																																																														},
																																																													message:
																																																														"must be string,null",
																																																												},
																																																											];
																																																										return false;
																																																									}
																																																									var valid0 =
																																																										_errs104 ===
																																																										errors;
																																																								} else {
																																																									var valid0 = true;
																																																								}
																																																								if (
																																																									valid0
																																																								) {
																																																									if (
																																																										data[
																																																											"icon.disabled"
																																																										] !==
																																																										undefined
																																																									) {
																																																										const data52 =
																																																											data[
																																																												"icon.disabled"
																																																											];
																																																										const _errs106 =
																																																											errors;
																																																										if (
																																																											typeof data52 !==
																																																												"string" &&
																																																											data52 !==
																																																												null
																																																										) {
																																																											validate12.errors =
																																																												[
																																																													{
																																																														instancePath:
																																																															instancePath +
																																																															"/icon.disabled",
																																																														schemaPath:
																																																															"#/properties/icon.disabled/type",
																																																														keyword:
																																																															"type",
																																																														params:
																																																															{
																																																																type: schema14
																																																																	.properties[
																																																																	"icon.disabled"
																																																																]
																																																																	.type,
																																																															},
																																																														message:
																																																															"must be string,null",
																																																													},
																																																												];
																																																											return false;
																																																										}
																																																										var valid0 =
																																																											_errs106 ===
																																																											errors;
																																																									} else {
																																																										var valid0 = true;
																																																									}
																																																									if (
																																																										valid0
																																																									) {
																																																										if (
																																																											data[
																																																												"icon.muted"
																																																											] !==
																																																											undefined
																																																										) {
																																																											const data53 =
																																																												data[
																																																													"icon.muted"
																																																												];
																																																											const _errs108 =
																																																												errors;
																																																											if (
																																																												typeof data53 !==
																																																													"string" &&
																																																												data53 !==
																																																													null
																																																											) {
																																																												validate12.errors =
																																																													[
																																																														{
																																																															instancePath:
																																																																instancePath +
																																																																"/icon.muted",
																																																															schemaPath:
																																																																"#/properties/icon.muted/type",
																																																															keyword:
																																																																"type",
																																																															params:
																																																																{
																																																																	type: schema14
																																																																		.properties[
																																																																		"icon.muted"
																																																																	]
																																																																		.type,
																																																																},
																																																															message:
																																																																"must be string,null",
																																																														},
																																																													];
																																																												return false;
																																																											}
																																																											var valid0 =
																																																												_errs108 ===
																																																												errors;
																																																										} else {
																																																											var valid0 = true;
																																																										}
																																																										if (
																																																											valid0
																																																										) {
																																																											if (
																																																												data[
																																																													"icon.placeholder"
																																																												] !==
																																																												undefined
																																																											) {
																																																												const data54 =
																																																													data[
																																																														"icon.placeholder"
																																																													];
																																																												const _errs110 =
																																																													errors;
																																																												if (
																																																													typeof data54 !==
																																																														"string" &&
																																																													data54 !==
																																																														null
																																																												) {
																																																													validate12.errors =
																																																														[
																																																															{
																																																																instancePath:
																																																																	instancePath +
																																																																	"/icon.placeholder",
																																																																schemaPath:
																																																																	"#/properties/icon.placeholder/type",
																																																																keyword:
																																																																	"type",
																																																																params:
																																																																	{
																																																																		type: schema14
																																																																			.properties[
																																																																			"icon.placeholder"
																																																																		]
																																																																			.type,
																																																																	},
																																																																message:
																																																																	"must be string,null",
																																																															},
																																																														];
																																																													return false;
																																																												}
																																																												var valid0 =
																																																													_errs110 ===
																																																													errors;
																																																											} else {
																																																												var valid0 = true;
																																																											}
																																																											if (
																																																												valid0
																																																											) {
																																																												if (
																																																													data.ignored !==
																																																													undefined
																																																												) {
																																																													const data55 =
																																																														data.ignored;
																																																													const _errs112 =
																																																														errors;
																																																													if (
																																																														typeof data55 !==
																																																															"string" &&
																																																														data55 !==
																																																															null
																																																													) {
																																																														validate12.errors =
																																																															[
																																																																{
																																																																	instancePath:
																																																																		instancePath +
																																																																		"/ignored",
																																																																	schemaPath:
																																																																		"#/properties/ignored/type",
																																																																	keyword:
																																																																		"type",
																																																																	params:
																																																																		{
																																																																			type: schema14
																																																																				.properties
																																																																				.ignored
																																																																				.type,
																																																																		},
																																																																	message:
																																																																		"must be string,null",
																																																																},
																																																															];
																																																														return false;
																																																													}
																																																													var valid0 =
																																																														_errs112 ===
																																																														errors;
																																																												} else {
																																																													var valid0 = true;
																																																												}
																																																												if (
																																																													valid0
																																																												) {
																																																													if (
																																																														data[
																																																															"ignored.background"
																																																														] !==
																																																														undefined
																																																													) {
																																																														const data56 =
																																																															data[
																																																																"ignored.background"
																																																															];
																																																														const _errs114 =
																																																															errors;
																																																														if (
																																																															typeof data56 !==
																																																																"string" &&
																																																															data56 !==
																																																																null
																																																														) {
																																																															validate12.errors =
																																																																[
																																																																	{
																																																																		instancePath:
																																																																			instancePath +
																																																																			"/ignored.background",
																																																																		schemaPath:
																																																																			"#/properties/ignored.background/type",
																																																																		keyword:
																																																																			"type",
																																																																		params:
																																																																			{
																																																																				type: schema14
																																																																					.properties[
																																																																					"ignored.background"
																																																																				]
																																																																					.type,
																																																																			},
																																																																		message:
																																																																			"must be string,null",
																																																																	},
																																																																];
																																																															return false;
																																																														}
																																																														var valid0 =
																																																															_errs114 ===
																																																															errors;
																																																													} else {
																																																														var valid0 = true;
																																																													}
																																																													if (
																																																														valid0
																																																													) {
																																																														if (
																																																															data[
																																																																"ignored.border"
																																																															] !==
																																																															undefined
																																																														) {
																																																															const data57 =
																																																																data[
																																																																	"ignored.border"
																																																																];
																																																															const _errs116 =
																																																																errors;
																																																															if (
																																																																typeof data57 !==
																																																																	"string" &&
																																																																data57 !==
																																																																	null
																																																															) {
																																																																validate12.errors =
																																																																	[
																																																																		{
																																																																			instancePath:
																																																																				instancePath +
																																																																				"/ignored.border",
																																																																			schemaPath:
																																																																				"#/properties/ignored.border/type",
																																																																			keyword:
																																																																				"type",
																																																																			params:
																																																																				{
																																																																					type: schema14
																																																																						.properties[
																																																																						"ignored.border"
																																																																					]
																																																																						.type,
																																																																				},
																																																																			message:
																																																																				"must be string,null",
																																																																		},
																																																																	];
																																																																return false;
																																																															}
																																																															var valid0 =
																																																																_errs116 ===
																																																																errors;
																																																														} else {
																																																															var valid0 = true;
																																																														}
																																																														if (
																																																															valid0
																																																														) {
																																																															if (
																																																																data.info !==
																																																																undefined
																																																															) {
																																																																const data58 =
																																																																	data.info;
																																																																const _errs118 =
																																																																	errors;
																																																																if (
																																																																	typeof data58 !==
																																																																		"string" &&
																																																																	data58 !==
																																																																		null
																																																																) {
																																																																	validate12.errors =
																																																																		[
																																																																			{
																																																																				instancePath:
																																																																					instancePath +
																																																																					"/info",
																																																																				schemaPath:
																																																																					"#/properties/info/type",
																																																																				keyword:
																																																																					"type",
																																																																				params:
																																																																					{
																																																																						type: schema14
																																																																							.properties
																																																																							.info
																																																																							.type,
																																																																					},
																																																																				message:
																																																																					"must be string,null",
																																																																			},
																																																																		];
																																																																	return false;
																																																																}
																																																																var valid0 =
																																																																	_errs118 ===
																																																																	errors;
																																																															} else {
																																																																var valid0 = true;
																																																															}
																																																															if (
																																																																valid0
																																																															) {
																																																																if (
																																																																	data[
																																																																		"info.background"
																																																																	] !==
																																																																	undefined
																																																																) {
																																																																	const data59 =
																																																																		data[
																																																																			"info.background"
																																																																		];
																																																																	const _errs120 =
																																																																		errors;
																																																																	if (
																																																																		typeof data59 !==
																																																																			"string" &&
																																																																		data59 !==
																																																																			null
																																																																	) {
																																																																		validate12.errors =
																																																																			[
																																																																				{
																																																																					instancePath:
																																																																						instancePath +
																																																																						"/info.background",
																																																																					schemaPath:
																																																																						"#/properties/info.background/type",
																																																																					keyword:
																																																																						"type",
																																																																					params:
																																																																						{
																																																																							type: schema14
																																																																								.properties[
																																																																								"info.background"
																																																																							]
																																																																								.type,
																																																																						},
																																																																					message:
																																																																						"must be string,null",
																																																																				},
																																																																			];
																																																																		return false;
																																																																	}
																																																																	var valid0 =
																																																																		_errs120 ===
																																																																		errors;
																																																																} else {
																																																																	var valid0 = true;
																																																																}
																																																																if (
																																																																	valid0
																																																																) {
																																																																	if (
																																																																		data[
																																																																			"info.border"
																																																																		] !==
																																																																		undefined
																																																																	) {
																																																																		const data60 =
																																																																			data[
																																																																				"info.border"
																																																																			];
																																																																		const _errs122 =
																																																																			errors;
																																																																		if (
																																																																			typeof data60 !==
																																																																				"string" &&
																																																																			data60 !==
																																																																				null
																																																																		) {
																																																																			validate12.errors =
																																																																				[
																																																																					{
																																																																						instancePath:
																																																																							instancePath +
																																																																							"/info.border",
																																																																						schemaPath:
																																																																							"#/properties/info.border/type",
																																																																						keyword:
																																																																							"type",
																																																																						params:
																																																																							{
																																																																								type: schema14
																																																																									.properties[
																																																																									"info.border"
																																																																								]
																																																																									.type,
																																																																							},
																																																																						message:
																																																																							"must be string,null",
																																																																					},
																																																																				];
																																																																			return false;
																																																																		}
																																																																		var valid0 =
																																																																			_errs122 ===
																																																																			errors;
																																																																	} else {
																																																																		var valid0 = true;
																																																																	}
																																																																	if (
																																																																		valid0
																																																																	) {
																																																																		if (
																																																																			data[
																																																																				"link_text.hover"
																																																																			] !==
																																																																			undefined
																																																																		) {
																																																																			const data61 =
																																																																				data[
																																																																					"link_text.hover"
																																																																				];
																																																																			const _errs124 =
																																																																				errors;
																																																																			if (
																																																																				typeof data61 !==
																																																																					"string" &&
																																																																				data61 !==
																																																																					null
																																																																			) {
																																																																				validate12.errors =
																																																																					[
																																																																						{
																																																																							instancePath:
																																																																								instancePath +
																																																																								"/link_text.hover",
																																																																							schemaPath:
																																																																								"#/properties/link_text.hover/type",
																																																																							keyword:
																																																																								"type",
																																																																							params:
																																																																								{
																																																																									type: schema14
																																																																										.properties[
																																																																										"link_text.hover"
																																																																									]
																																																																										.type,
																																																																								},
																																																																							message:
																																																																								"must be string,null",
																																																																						},
																																																																					];
																																																																				return false;
																																																																			}
																																																																			var valid0 =
																																																																				_errs124 ===
																																																																				errors;
																																																																		} else {
																																																																			var valid0 = true;
																																																																		}
																																																																		if (
																																																																			valid0
																																																																		) {
																																																																			if (
																																																																				data.modified !==
																																																																				undefined
																																																																			) {
																																																																				const data62 =
																																																																					data.modified;
																																																																				const _errs126 =
																																																																					errors;
																																																																				if (
																																																																					typeof data62 !==
																																																																						"string" &&
																																																																					data62 !==
																																																																						null
																																																																				) {
																																																																					validate12.errors =
																																																																						[
																																																																							{
																																																																								instancePath:
																																																																									instancePath +
																																																																									"/modified",
																																																																								schemaPath:
																																																																									"#/properties/modified/type",
																																																																								keyword:
																																																																									"type",
																																																																								params:
																																																																									{
																																																																										type: schema14
																																																																											.properties
																																																																											.modified
																																																																											.type,
																																																																									},
																																																																								message:
																																																																									"must be string,null",
																																																																							},
																																																																						];
																																																																					return false;
																																																																				}
																																																																				var valid0 =
																																																																					_errs126 ===
																																																																					errors;
																																																																			} else {
																																																																				var valid0 = true;
																																																																			}
																																																																			if (
																																																																				valid0
																																																																			) {
																																																																				if (
																																																																					data[
																																																																						"modified.background"
																																																																					] !==
																																																																					undefined
																																																																				) {
																																																																					const data63 =
																																																																						data[
																																																																							"modified.background"
																																																																						];
																																																																					const _errs128 =
																																																																						errors;
																																																																					if (
																																																																						typeof data63 !==
																																																																							"string" &&
																																																																						data63 !==
																																																																							null
																																																																					) {
																																																																						validate12.errors =
																																																																							[
																																																																								{
																																																																									instancePath:
																																																																										instancePath +
																																																																										"/modified.background",
																																																																									schemaPath:
																																																																										"#/properties/modified.background/type",
																																																																									keyword:
																																																																										"type",
																																																																									params:
																																																																										{
																																																																											type: schema14
																																																																												.properties[
																																																																												"modified.background"
																																																																											]
																																																																												.type,
																																																																										},
																																																																									message:
																																																																										"must be string,null",
																																																																								},
																																																																							];
																																																																						return false;
																																																																					}
																																																																					var valid0 =
																																																																						_errs128 ===
																																																																						errors;
																																																																				} else {
																																																																					var valid0 = true;
																																																																				}
																																																																				if (
																																																																					valid0
																																																																				) {
																																																																					if (
																																																																						data[
																																																																							"modified.border"
																																																																						] !==
																																																																						undefined
																																																																					) {
																																																																						const data64 =
																																																																							data[
																																																																								"modified.border"
																																																																							];
																																																																						const _errs130 =
																																																																							errors;
																																																																						if (
																																																																							typeof data64 !==
																																																																								"string" &&
																																																																							data64 !==
																																																																								null
																																																																						) {
																																																																							validate12.errors =
																																																																								[
																																																																									{
																																																																										instancePath:
																																																																											instancePath +
																																																																											"/modified.border",
																																																																										schemaPath:
																																																																											"#/properties/modified.border/type",
																																																																										keyword:
																																																																											"type",
																																																																										params:
																																																																											{
																																																																												type: schema14
																																																																													.properties[
																																																																													"modified.border"
																																																																												]
																																																																													.type,
																																																																											},
																																																																										message:
																																																																											"must be string,null",
																																																																									},
																																																																								];
																																																																							return false;
																																																																						}
																																																																						var valid0 =
																																																																							_errs130 ===
																																																																							errors;
																																																																					} else {
																																																																						var valid0 = true;
																																																																					}
																																																																					if (
																																																																						valid0
																																																																					) {
																																																																						if (
																																																																							data[
																																																																								"pane.focused_border"
																																																																							] !==
																																																																							undefined
																																																																						) {
																																																																							const data65 =
																																																																								data[
																																																																									"pane.focused_border"
																																																																								];
																																																																							const _errs132 =
																																																																								errors;
																																																																							if (
																																																																								typeof data65 !==
																																																																									"string" &&
																																																																								data65 !==
																																																																									null
																																																																							) {
																																																																								validate12.errors =
																																																																									[
																																																																										{
																																																																											instancePath:
																																																																												instancePath +
																																																																												"/pane.focused_border",
																																																																											schemaPath:
																																																																												"#/properties/pane.focused_border/type",
																																																																											keyword:
																																																																												"type",
																																																																											params:
																																																																												{
																																																																													type: schema14
																																																																														.properties[
																																																																														"pane.focused_border"
																																																																													]
																																																																														.type,
																																																																												},
																																																																											message:
																																																																												"must be string,null",
																																																																										},
																																																																									];
																																																																								return false;
																																																																							}
																																																																							var valid0 =
																																																																								_errs132 ===
																																																																								errors;
																																																																						} else {
																																																																							var valid0 = true;
																																																																						}
																																																																						if (
																																																																							valid0
																																																																						) {
																																																																							if (
																																																																								data[
																																																																									"panel.background"
																																																																								] !==
																																																																								undefined
																																																																							) {
																																																																								const data66 =
																																																																									data[
																																																																										"panel.background"
																																																																									];
																																																																								const _errs134 =
																																																																									errors;
																																																																								if (
																																																																									typeof data66 !==
																																																																										"string" &&
																																																																									data66 !==
																																																																										null
																																																																								) {
																																																																									validate12.errors =
																																																																										[
																																																																											{
																																																																												instancePath:
																																																																													instancePath +
																																																																													"/panel.background",
																																																																												schemaPath:
																																																																													"#/properties/panel.background/type",
																																																																												keyword:
																																																																													"type",
																																																																												params:
																																																																													{
																																																																														type: schema14
																																																																															.properties[
																																																																															"panel.background"
																																																																														]
																																																																															.type,
																																																																													},
																																																																												message:
																																																																													"must be string,null",
																																																																											},
																																																																										];
																																																																									return false;
																																																																								}
																																																																								var valid0 =
																																																																									_errs134 ===
																																																																									errors;
																																																																							} else {
																																																																								var valid0 = true;
																																																																							}
																																																																							if (
																																																																								valid0
																																																																							) {
																																																																								if (
																																																																									data[
																																																																										"panel.focused_border"
																																																																									] !==
																																																																									undefined
																																																																								) {
																																																																									const data67 =
																																																																										data[
																																																																											"panel.focused_border"
																																																																										];
																																																																									const _errs136 =
																																																																										errors;
																																																																									if (
																																																																										typeof data67 !==
																																																																											"string" &&
																																																																										data67 !==
																																																																											null
																																																																									) {
																																																																										validate12.errors =
																																																																											[
																																																																												{
																																																																													instancePath:
																																																																														instancePath +
																																																																														"/panel.focused_border",
																																																																													schemaPath:
																																																																														"#/properties/panel.focused_border/type",
																																																																													keyword:
																																																																														"type",
																																																																													params:
																																																																														{
																																																																															type: schema14
																																																																																.properties[
																																																																																"panel.focused_border"
																																																																															]
																																																																																.type,
																																																																														},
																																																																													message:
																																																																														"must be string,null",
																																																																												},
																																																																											];
																																																																										return false;
																																																																									}
																																																																									var valid0 =
																																																																										_errs136 ===
																																																																										errors;
																																																																								} else {
																																																																									var valid0 = true;
																																																																								}
																																																																								if (
																																																																									valid0
																																																																								) {
																																																																									if (
																																																																										data.players !==
																																																																										undefined
																																																																									) {
																																																																										const data68 =
																																																																											data.players;
																																																																										const _errs138 =
																																																																											errors;
																																																																										if (
																																																																											errors ===
																																																																											_errs138
																																																																										) {
																																																																											if (
																																																																												Array.isArray(
																																																																													data68,
																																																																												)
																																																																											) {
																																																																												var valid1 = true;
																																																																												const len0 =
																																																																													data68.length;
																																																																												for (
																																																																													let i0 = 0;
																																																																													i0 <
																																																																													len0;
																																																																													i0++
																																																																												) {
																																																																													const data69 =
																																																																														data68[
																																																																															i0
																																																																														];
																																																																													const _errs140 =
																																																																														errors;
																																																																													const _errs141 =
																																																																														errors;
																																																																													if (
																																																																														errors ===
																																																																														_errs141
																																																																													) {
																																																																														if (
																																																																															data69 &&
																																																																															typeof data69 ==
																																																																																"object" &&
																																																																															!Array.isArray(
																																																																																data69,
																																																																															)
																																																																														) {
																																																																															if (
																																																																																data69.background !==
																																																																																undefined
																																																																															) {
																																																																																const data70 =
																																																																																	data69.background;
																																																																																const _errs143 =
																																																																																	errors;
																																																																																if (
																																																																																	typeof data70 !==
																																																																																		"string" &&
																																																																																	data70 !==
																																																																																		null
																																																																																) {
																																																																																	validate12.errors =
																																																																																		[
																																																																																			{
																																																																																				instancePath:
																																																																																					instancePath +
																																																																																					"/players/" +
																																																																																					i0 +
																																																																																					"/background",
																																																																																				schemaPath:
																																																																																					"#/definitions/PlayerColorContent/properties/background/type",
																																																																																				keyword:
																																																																																					"type",
																																																																																				params:
																																																																																					{
																																																																																						type: schema15
																																																																																							.properties
																																																																																							.background
																																																																																							.type,
																																																																																					},
																																																																																				message:
																																																																																					"must be string,null",
																																																																																			},
																																																																																		];
																																																																																	return false;
																																																																																}
																																																																																var valid3 =
																																																																																	_errs143 ===
																																																																																	errors;
																																																																															} else {
																																																																																var valid3 = true;
																																																																															}
																																																																															if (
																																																																																valid3
																																																																															) {
																																																																																if (
																																																																																	data69.cursor !==
																																																																																	undefined
																																																																																) {
																																																																																	const data71 =
																																																																																		data69.cursor;
																																																																																	const _errs145 =
																																																																																		errors;
																																																																																	if (
																																																																																		typeof data71 !==
																																																																																			"string" &&
																																																																																		data71 !==
																																																																																			null
																																																																																	) {
																																																																																		validate12.errors =
																																																																																			[
																																																																																				{
																																																																																					instancePath:
																																																																																						instancePath +
																																																																																						"/players/" +
																																																																																						i0 +
																																																																																						"/cursor",
																																																																																					schemaPath:
																																																																																						"#/definitions/PlayerColorContent/properties/cursor/type",
																																																																																					keyword:
																																																																																						"type",
																																																																																					params:
																																																																																						{
																																																																																							type: schema15
																																																																																								.properties
																																																																																								.cursor
																																																																																								.type,
																																																																																						},
																																																																																					message:
																																																																																						"must be string,null",
																																																																																				},
																																																																																			];
																																																																																		return false;
																																																																																	}
																																																																																	var valid3 =
																																																																																		_errs145 ===
																																																																																		errors;
																																																																																} else {
																																																																																	var valid3 = true;
																																																																																}
																																																																																if (
																																																																																	valid3
																																																																																) {
																																																																																	if (
																																																																																		data69.selection !==
																																																																																		undefined
																																																																																	) {
																																																																																		const data72 =
																																																																																			data69.selection;
																																																																																		const _errs147 =
																																																																																			errors;
																																																																																		if (
																																																																																			typeof data72 !==
																																																																																				"string" &&
																																																																																			data72 !==
																																																																																				null
																																																																																		) {
																																																																																			validate12.errors =
																																																																																				[
																																																																																					{
																																																																																						instancePath:
																																																																																							instancePath +
																																																																																							"/players/" +
																																																																																							i0 +
																																																																																							"/selection",
																																																																																						schemaPath:
																																																																																							"#/definitions/PlayerColorContent/properties/selection/type",
																																																																																						keyword:
																																																																																							"type",
																																																																																						params:
																																																																																							{
																																																																																								type: schema15
																																																																																									.properties
																																																																																									.selection
																																																																																									.type,
																																																																																							},
																																																																																						message:
																																																																																							"must be string,null",
																																																																																					},
																																																																																				];
																																																																																			return false;
																																																																																		}
																																																																																		var valid3 =
																																																																																			_errs147 ===
																																																																																			errors;
																																																																																	} else {
																																																																																		var valid3 = true;
																																																																																	}
																																																																																}
																																																																															}
																																																																														} else {
																																																																															validate12.errors =
																																																																																[
																																																																																	{
																																																																																		instancePath:
																																																																																			instancePath +
																																																																																			"/players/" +
																																																																																			i0,
																																																																																		schemaPath:
																																																																																			"#/definitions/PlayerColorContent/type",
																																																																																		keyword:
																																																																																			"type",
																																																																																		params:
																																																																																			{
																																																																																				type: "object",
																																																																																			},
																																																																																		message:
																																																																																			"must be object",
																																																																																	},
																																																																																];
																																																																															return false;
																																																																														}
																																																																													}
																																																																													var valid1 =
																																																																														_errs140 ===
																																																																														errors;
																																																																													if (
																																																																														!valid1
																																																																													) {
																																																																														break;
																																																																													}
																																																																												}
																																																																											} else {
																																																																												validate12.errors =
																																																																													[
																																																																														{
																																																																															instancePath:
																																																																																instancePath +
																																																																																"/players",
																																																																															schemaPath:
																																																																																"#/properties/players/type",
																																																																															keyword:
																																																																																"type",
																																																																															params:
																																																																																{
																																																																																	type: "array",
																																																																																},
																																																																															message:
																																																																																"must be array",
																																																																														},
																																																																													];
																																																																												return false;
																																																																											}
																																																																										}
																																																																										var valid0 =
																																																																											_errs138 ===
																																																																											errors;
																																																																									} else {
																																																																										var valid0 = true;
																																																																									}
																																																																									if (
																																																																										valid0
																																																																									) {
																																																																										if (
																																																																											data.predictive !==
																																																																											undefined
																																																																										) {
																																																																											const data73 =
																																																																												data.predictive;
																																																																											const _errs149 =
																																																																												errors;
																																																																											if (
																																																																												typeof data73 !==
																																																																													"string" &&
																																																																												data73 !==
																																																																													null
																																																																											) {
																																																																												validate12.errors =
																																																																													[
																																																																														{
																																																																															instancePath:
																																																																																instancePath +
																																																																																"/predictive",
																																																																															schemaPath:
																																																																																"#/properties/predictive/type",
																																																																															keyword:
																																																																																"type",
																																																																															params:
																																																																																{
																																																																																	type: schema14
																																																																																		.properties
																																																																																		.predictive
																																																																																		.type,
																																																																																},
																																																																															message:
																																																																																"must be string,null",
																																																																														},
																																																																													];
																																																																												return false;
																																																																											}
																																																																											var valid0 =
																																																																												_errs149 ===
																																																																												errors;
																																																																										} else {
																																																																											var valid0 = true;
																																																																										}
																																																																										if (
																																																																											valid0
																																																																										) {
																																																																											if (
																																																																												data[
																																																																													"predictive.background"
																																																																												] !==
																																																																												undefined
																																																																											) {
																																																																												const data74 =
																																																																													data[
																																																																														"predictive.background"
																																																																													];
																																																																												const _errs151 =
																																																																													errors;
																																																																												if (
																																																																													typeof data74 !==
																																																																														"string" &&
																																																																													data74 !==
																																																																														null
																																																																												) {
																																																																													validate12.errors =
																																																																														[
																																																																															{
																																																																																instancePath:
																																																																																	instancePath +
																																																																																	"/predictive.background",
																																																																																schemaPath:
																																																																																	"#/properties/predictive.background/type",
																																																																																keyword:
																																																																																	"type",
																																																																																params:
																																																																																	{
																																																																																		type: schema14
																																																																																			.properties[
																																																																																			"predictive.background"
																																																																																		]
																																																																																			.type,
																																																																																	},
																																																																																message:
																																																																																	"must be string,null",
																																																																															},
																																																																														];
																																																																													return false;
																																																																												}
																																																																												var valid0 =
																																																																													_errs151 ===
																																																																													errors;
																																																																											} else {
																																																																												var valid0 = true;
																																																																											}
																																																																											if (
																																																																												valid0
																																																																											) {
																																																																												if (
																																																																													data[
																																																																														"predictive.border"
																																																																													] !==
																																																																													undefined
																																																																												) {
																																																																													const data75 =
																																																																														data[
																																																																															"predictive.border"
																																																																														];
																																																																													const _errs153 =
																																																																														errors;
																																																																													if (
																																																																														typeof data75 !==
																																																																															"string" &&
																																																																														data75 !==
																																																																															null
																																																																													) {
																																																																														validate12.errors =
																																																																															[
																																																																																{
																																																																																	instancePath:
																																																																																		instancePath +
																																																																																		"/predictive.border",
																																																																																	schemaPath:
																																																																																		"#/properties/predictive.border/type",
																																																																																	keyword:
																																																																																		"type",
																																																																																	params:
																																																																																		{
																																																																																			type: schema14
																																																																																				.properties[
																																																																																				"predictive.border"
																																																																																			]
																																																																																				.type,
																																																																																		},
																																																																																	message:
																																																																																		"must be string,null",
																																																																																},
																																																																															];
																																																																														return false;
																																																																													}
																																																																													var valid0 =
																																																																														_errs153 ===
																																																																														errors;
																																																																												} else {
																																																																													var valid0 = true;
																																																																												}
																																																																												if (
																																																																													valid0
																																																																												) {
																																																																													if (
																																																																														data.renamed !==
																																																																														undefined
																																																																													) {
																																																																														const data76 =
																																																																															data.renamed;
																																																																														const _errs155 =
																																																																															errors;
																																																																														if (
																																																																															typeof data76 !==
																																																																																"string" &&
																																																																															data76 !==
																																																																																null
																																																																														) {
																																																																															validate12.errors =
																																																																																[
																																																																																	{
																																																																																		instancePath:
																																																																																			instancePath +
																																																																																			"/renamed",
																																																																																		schemaPath:
																																																																																			"#/properties/renamed/type",
																																																																																		keyword:
																																																																																			"type",
																																																																																		params:
																																																																																			{
																																																																																				type: schema14
																																																																																					.properties
																																																																																					.renamed
																																																																																					.type,
																																																																																			},
																																																																																		message:
																																																																																			"must be string,null",
																																																																																	},
																																																																																];
																																																																															return false;
																																																																														}
																																																																														var valid0 =
																																																																															_errs155 ===
																																																																															errors;
																																																																													} else {
																																																																														var valid0 = true;
																																																																													}
																																																																													if (
																																																																														valid0
																																																																													) {
																																																																														if (
																																																																															data[
																																																																																"renamed.background"
																																																																															] !==
																																																																															undefined
																																																																														) {
																																																																															const data77 =
																																																																																data[
																																																																																	"renamed.background"
																																																																																];
																																																																															const _errs157 =
																																																																																errors;
																																																																															if (
																																																																																typeof data77 !==
																																																																																	"string" &&
																																																																																data77 !==
																																																																																	null
																																																																															) {
																																																																																validate12.errors =
																																																																																	[
																																																																																		{
																																																																																			instancePath:
																																																																																				instancePath +
																																																																																				"/renamed.background",
																																																																																			schemaPath:
																																																																																				"#/properties/renamed.background/type",
																																																																																			keyword:
																																																																																				"type",
																																																																																			params:
																																																																																				{
																																																																																					type: schema14
																																																																																						.properties[
																																																																																						"renamed.background"
																																																																																					]
																																																																																						.type,
																																																																																				},
																																																																																			message:
																																																																																				"must be string,null",
																																																																																		},
																																																																																	];
																																																																																return false;
																																																																															}
																																																																															var valid0 =
																																																																																_errs157 ===
																																																																																errors;
																																																																														} else {
																																																																															var valid0 = true;
																																																																														}
																																																																														if (
																																																																															valid0
																																																																														) {
																																																																															if (
																																																																																data[
																																																																																	"renamed.border"
																																																																																] !==
																																																																																undefined
																																																																															) {
																																																																																const data78 =
																																																																																	data[
																																																																																		"renamed.border"
																																																																																	];
																																																																																const _errs159 =
																																																																																	errors;
																																																																																if (
																																																																																	typeof data78 !==
																																																																																		"string" &&
																																																																																	data78 !==
																																																																																		null
																																																																																) {
																																																																																	validate12.errors =
																																																																																		[
																																																																																			{
																																																																																				instancePath:
																																																																																					instancePath +
																																																																																					"/renamed.border",
																																																																																				schemaPath:
																																																																																					"#/properties/renamed.border/type",
																																																																																				keyword:
																																																																																					"type",
																																																																																				params:
																																																																																					{
																																																																																						type: schema14
																																																																																							.properties[
																																																																																							"renamed.border"
																																																																																						]
																																																																																							.type,
																																																																																					},
																																																																																				message:
																																																																																					"must be string,null",
																																																																																			},
																																																																																		];
																																																																																	return false;
																																																																																}
																																																																																var valid0 =
																																																																																	_errs159 ===
																																																																																	errors;
																																																																															} else {
																																																																																var valid0 = true;
																																																																															}
																																																																															if (
																																																																																valid0
																																																																															) {
																																																																																if (
																																																																																	data[
																																																																																		"scrollbar.thumb.border"
																																																																																	] !==
																																																																																	undefined
																																																																																) {
																																																																																	const data79 =
																																																																																		data[
																																																																																			"scrollbar.thumb.border"
																																																																																		];
																																																																																	const _errs161 =
																																																																																		errors;
																																																																																	if (
																																																																																		typeof data79 !==
																																																																																			"string" &&
																																																																																		data79 !==
																																																																																			null
																																																																																	) {
																																																																																		validate12.errors =
																																																																																			[
																																																																																				{
																																																																																					instancePath:
																																																																																						instancePath +
																																																																																						"/scrollbar.thumb.border",
																																																																																					schemaPath:
																																																																																						"#/properties/scrollbar.thumb.border/type",
																																																																																					keyword:
																																																																																						"type",
																																																																																					params:
																																																																																						{
																																																																																							type: schema14
																																																																																								.properties[
																																																																																								"scrollbar.thumb.border"
																																																																																							]
																																																																																								.type,
																																																																																						},
																																																																																					message:
																																																																																						"must be string,null",
																																																																																				},
																																																																																			];
																																																																																		return false;
																																																																																	}
																																																																																	var valid0 =
																																																																																		_errs161 ===
																																																																																		errors;
																																																																																} else {
																																																																																	var valid0 = true;
																																																																																}
																																																																																if (
																																																																																	valid0
																																																																																) {
																																																																																	if (
																																																																																		data[
																																																																																			"scrollbar.thumb.hover_background"
																																																																																		] !==
																																																																																		undefined
																																																																																	) {
																																																																																		const data80 =
																																																																																			data[
																																																																																				"scrollbar.thumb.hover_background"
																																																																																			];
																																																																																		const _errs163 =
																																																																																			errors;
																																																																																		if (
																																																																																			typeof data80 !==
																																																																																				"string" &&
																																																																																			data80 !==
																																																																																				null
																																																																																		) {
																																																																																			validate12.errors =
																																																																																				[
																																																																																					{
																																																																																						instancePath:
																																																																																							instancePath +
																																																																																							"/scrollbar.thumb.hover_background",
																																																																																						schemaPath:
																																																																																							"#/properties/scrollbar.thumb.hover_background/type",
																																																																																						keyword:
																																																																																							"type",
																																																																																						params:
																																																																																							{
																																																																																								type: schema14
																																																																																									.properties[
																																																																																									"scrollbar.thumb.hover_background"
																																																																																								]
																																																																																									.type,
																																																																																							},
																																																																																						message:
																																																																																							"must be string,null",
																																																																																					},
																																																																																				];
																																																																																			return false;
																																																																																		}
																																																																																		var valid0 =
																																																																																			_errs163 ===
																																																																																			errors;
																																																																																	} else {
																																																																																		var valid0 = true;
																																																																																	}
																																																																																	if (
																																																																																		valid0
																																																																																	) {
																																																																																		if (
																																																																																			data[
																																																																																				"scrollbar.track.background"
																																																																																			] !==
																																																																																			undefined
																																																																																		) {
																																																																																			const data81 =
																																																																																				data[
																																																																																					"scrollbar.track.background"
																																																																																				];
																																																																																			const _errs165 =
																																																																																				errors;
																																																																																			if (
																																																																																				typeof data81 !==
																																																																																					"string" &&
																																																																																				data81 !==
																																																																																					null
																																																																																			) {
																																																																																				validate12.errors =
																																																																																					[
																																																																																						{
																																																																																							instancePath:
																																																																																								instancePath +
																																																																																								"/scrollbar.track.background",
																																																																																							schemaPath:
																																																																																								"#/properties/scrollbar.track.background/type",
																																																																																							keyword:
																																																																																								"type",
																																																																																							params:
																																																																																								{
																																																																																									type: schema14
																																																																																										.properties[
																																																																																										"scrollbar.track.background"
																																																																																									]
																																																																																										.type,
																																																																																								},
																																																																																							message:
																																																																																								"must be string,null",
																																																																																						},
																																																																																					];
																																																																																				return false;
																																																																																			}
																																																																																			var valid0 =
																																																																																				_errs165 ===
																																																																																				errors;
																																																																																		} else {
																																																																																			var valid0 = true;
																																																																																		}
																																																																																		if (
																																																																																			valid0
																																																																																		) {
																																																																																			if (
																																																																																				data[
																																																																																					"scrollbar.track.border"
																																																																																				] !==
																																																																																				undefined
																																																																																			) {
																																																																																				const data82 =
																																																																																					data[
																																																																																						"scrollbar.track.border"
																																																																																					];
																																																																																				const _errs167 =
																																																																																					errors;
																																																																																				if (
																																																																																					typeof data82 !==
																																																																																						"string" &&
																																																																																					data82 !==
																																																																																						null
																																																																																				) {
																																																																																					validate12.errors =
																																																																																						[
																																																																																							{
																																																																																								instancePath:
																																																																																									instancePath +
																																																																																									"/scrollbar.track.border",
																																																																																								schemaPath:
																																																																																									"#/properties/scrollbar.track.border/type",
																																																																																								keyword:
																																																																																									"type",
																																																																																								params:
																																																																																									{
																																																																																										type: schema14
																																																																																											.properties[
																																																																																											"scrollbar.track.border"
																																																																																										]
																																																																																											.type,
																																																																																									},
																																																																																								message:
																																																																																									"must be string,null",
																																																																																							},
																																																																																						];
																																																																																					return false;
																																																																																				}
																																																																																				var valid0 =
																																																																																					_errs167 ===
																																																																																					errors;
																																																																																			} else {
																																																																																				var valid0 = true;
																																																																																			}
																																																																																			if (
																																																																																				valid0
																																																																																			) {
																																																																																				if (
																																																																																					data[
																																																																																						"scrollbar_thumb.background"
																																																																																					] !==
																																																																																					undefined
																																																																																				) {
																																																																																					const data83 =
																																																																																						data[
																																																																																							"scrollbar_thumb.background"
																																																																																						];
																																																																																					const _errs169 =
																																																																																						errors;
																																																																																					if (
																																																																																						typeof data83 !==
																																																																																							"string" &&
																																																																																						data83 !==
																																																																																							null
																																																																																					) {
																																																																																						validate12.errors =
																																																																																							[
																																																																																								{
																																																																																									instancePath:
																																																																																										instancePath +
																																																																																										"/scrollbar_thumb.background",
																																																																																									schemaPath:
																																																																																										"#/properties/scrollbar_thumb.background/type",
																																																																																									keyword:
																																																																																										"type",
																																																																																									params:
																																																																																										{
																																																																																											type: schema14
																																																																																												.properties[
																																																																																												"scrollbar_thumb.background"
																																																																																											]
																																																																																												.type,
																																																																																										},
																																																																																									message:
																																																																																										"must be string,null",
																																																																																								},
																																																																																							];
																																																																																						return false;
																																																																																					}
																																																																																					var valid0 =
																																																																																						_errs169 ===
																																																																																						errors;
																																																																																				} else {
																																																																																					var valid0 = true;
																																																																																				}
																																																																																				if (
																																																																																					valid0
																																																																																				) {
																																																																																					if (
																																																																																						data[
																																																																																							"search.match_background"
																																																																																						] !==
																																																																																						undefined
																																																																																					) {
																																																																																						const data84 =
																																																																																							data[
																																																																																								"search.match_background"
																																																																																							];
																																																																																						const _errs171 =
																																																																																							errors;
																																																																																						if (
																																																																																							typeof data84 !==
																																																																																								"string" &&
																																																																																							data84 !==
																																																																																								null
																																																																																						) {
																																																																																							validate12.errors =
																																																																																								[
																																																																																									{
																																																																																										instancePath:
																																																																																											instancePath +
																																																																																											"/search.match_background",
																																																																																										schemaPath:
																																																																																											"#/properties/search.match_background/type",
																																																																																										keyword:
																																																																																											"type",
																																																																																										params:
																																																																																											{
																																																																																												type: schema14
																																																																																													.properties[
																																																																																													"search.match_background"
																																																																																												]
																																																																																													.type,
																																																																																											},
																																																																																										message:
																																																																																											"must be string,null",
																																																																																									},
																																																																																								];
																																																																																							return false;
																																																																																						}
																																																																																						var valid0 =
																																																																																							_errs171 ===
																																																																																							errors;
																																																																																					} else {
																																																																																						var valid0 = true;
																																																																																					}
																																																																																					if (
																																																																																						valid0
																																																																																					) {
																																																																																						if (
																																																																																							data[
																																																																																								"status_bar.background"
																																																																																							] !==
																																																																																							undefined
																																																																																						) {
																																																																																							const data85 =
																																																																																								data[
																																																																																									"status_bar.background"
																																																																																								];
																																																																																							const _errs173 =
																																																																																								errors;
																																																																																							if (
																																																																																								typeof data85 !==
																																																																																									"string" &&
																																																																																								data85 !==
																																																																																									null
																																																																																							) {
																																																																																								validate12.errors =
																																																																																									[
																																																																																										{
																																																																																											instancePath:
																																																																																												instancePath +
																																																																																												"/status_bar.background",
																																																																																											schemaPath:
																																																																																												"#/properties/status_bar.background/type",
																																																																																											keyword:
																																																																																												"type",
																																																																																											params:
																																																																																												{
																																																																																													type: schema14
																																																																																														.properties[
																																																																																														"status_bar.background"
																																																																																													]
																																																																																														.type,
																																																																																												},
																																																																																											message:
																																																																																												"must be string,null",
																																																																																										},
																																																																																									];
																																																																																								return false;
																																																																																							}
																																																																																							var valid0 =
																																																																																								_errs173 ===
																																																																																								errors;
																																																																																						} else {
																																																																																							var valid0 = true;
																																																																																						}
																																																																																						if (
																																																																																							valid0
																																																																																						) {
																																																																																							if (
																																																																																								data.success !==
																																																																																								undefined
																																																																																							) {
																																																																																								const data86 =
																																																																																									data.success;
																																																																																								const _errs175 =
																																																																																									errors;
																																																																																								if (
																																																																																									typeof data86 !==
																																																																																										"string" &&
																																																																																									data86 !==
																																																																																										null
																																																																																								) {
																																																																																									validate12.errors =
																																																																																										[
																																																																																											{
																																																																																												instancePath:
																																																																																													instancePath +
																																																																																													"/success",
																																																																																												schemaPath:
																																																																																													"#/properties/success/type",
																																																																																												keyword:
																																																																																													"type",
																																																																																												params:
																																																																																													{
																																																																																														type: schema14
																																																																																															.properties
																																																																																															.success
																																																																																															.type,
																																																																																													},
																																																																																												message:
																																																																																													"must be string,null",
																																																																																											},
																																																																																										];
																																																																																									return false;
																																																																																								}
																																																																																								var valid0 =
																																																																																									_errs175 ===
																																																																																									errors;
																																																																																							} else {
																																																																																								var valid0 = true;
																																																																																							}
																																																																																							if (
																																																																																								valid0
																																																																																							) {
																																																																																								if (
																																																																																									data[
																																																																																										"success.background"
																																																																																									] !==
																																																																																									undefined
																																																																																								) {
																																																																																									const data87 =
																																																																																										data[
																																																																																											"success.background"
																																																																																										];
																																																																																									const _errs177 =
																																																																																										errors;
																																																																																									if (
																																																																																										typeof data87 !==
																																																																																											"string" &&
																																																																																										data87 !==
																																																																																											null
																																																																																									) {
																																																																																										validate12.errors =
																																																																																											[
																																																																																												{
																																																																																													instancePath:
																																																																																														instancePath +
																																																																																														"/success.background",
																																																																																													schemaPath:
																																																																																														"#/properties/success.background/type",
																																																																																													keyword:
																																																																																														"type",
																																																																																													params:
																																																																																														{
																																																																																															type: schema14
																																																																																																.properties[
																																																																																																"success.background"
																																																																																															]
																																																																																																.type,
																																																																																														},
																																																																																													message:
																																																																																														"must be string,null",
																																																																																												},
																																																																																											];
																																																																																										return false;
																																																																																									}
																																																																																									var valid0 =
																																																																																										_errs177 ===
																																																																																										errors;
																																																																																								} else {
																																																																																									var valid0 = true;
																																																																																								}
																																																																																								if (
																																																																																									valid0
																																																																																								) {
																																																																																									if (
																																																																																										data[
																																																																																											"success.border"
																																																																																										] !==
																																																																																										undefined
																																																																																									) {
																																																																																										const data88 =
																																																																																											data[
																																																																																												"success.border"
																																																																																											];
																																																																																										const _errs179 =
																																																																																											errors;
																																																																																										if (
																																																																																											typeof data88 !==
																																																																																												"string" &&
																																																																																											data88 !==
																																																																																												null
																																																																																										) {
																																																																																											validate12.errors =
																																																																																												[
																																																																																													{
																																																																																														instancePath:
																																																																																															instancePath +
																																																																																															"/success.border",
																																																																																														schemaPath:
																																																																																															"#/properties/success.border/type",
																																																																																														keyword:
																																																																																															"type",
																																																																																														params:
																																																																																															{
																																																																																																type: schema14
																																																																																																	.properties[
																																																																																																	"success.border"
																																																																																																]
																																																																																																	.type,
																																																																																															},
																																																																																														message:
																																																																																															"must be string,null",
																																																																																													},
																																																																																												];
																																																																																											return false;
																																																																																										}
																																																																																										var valid0 =
																																																																																											_errs179 ===
																																																																																											errors;
																																																																																									} else {
																																																																																										var valid0 = true;
																																																																																									}
																																																																																									if (
																																																																																										valid0
																																																																																									) {
																																																																																										if (
																																																																																											data[
																																																																																												"surface.background"
																																																																																											] !==
																																																																																											undefined
																																																																																										) {
																																																																																											const data89 =
																																																																																												data[
																																																																																													"surface.background"
																																																																																												];
																																																																																											const _errs181 =
																																																																																												errors;
																																																																																											if (
																																																																																												typeof data89 !==
																																																																																													"string" &&
																																																																																												data89 !==
																																																																																													null
																																																																																											) {
																																																																																												validate12.errors =
																																																																																													[
																																																																																														{
																																																																																															instancePath:
																																																																																																instancePath +
																																																																																																"/surface.background",
																																																																																															schemaPath:
																																																																																																"#/properties/surface.background/type",
																																																																																															keyword:
																																																																																																"type",
																																																																																															params:
																																																																																																{
																																																																																																	type: schema14
																																																																																																		.properties[
																																																																																																		"surface.background"
																																																																																																	]
																																																																																																		.type,
																																																																																																},
																																																																																															message:
																																																																																																"must be string,null",
																																																																																														},
																																																																																													];
																																																																																												return false;
																																																																																											}
																																																																																											var valid0 =
																																																																																												_errs181 ===
																																																																																												errors;
																																																																																										} else {
																																																																																											var valid0 = true;
																																																																																										}
																																																																																										if (
																																																																																											valid0
																																																																																										) {
																																																																																											if (
																																																																																												data.syntax !==
																																																																																												undefined
																																																																																											) {
																																																																																												const data90 =
																																																																																													data.syntax;
																																																																																												const _errs183 =
																																																																																													errors;
																																																																																												if (
																																																																																													errors ===
																																																																																													_errs183
																																																																																												) {
																																																																																													if (
																																																																																														data90 &&
																																																																																														typeof data90 ==
																																																																																															"object" &&
																																																																																														!Array.isArray(
																																																																																															data90,
																																																																																														)
																																																																																													) {
																																																																																														for (const key1 in data90) {
																																																																																															const _errs186 =
																																																																																																errors;
																																																																																															if (
																																																																																																!validate13(
																																																																																																	data90[
																																																																																																		key1
																																																																																																	],
																																																																																																	{
																																																																																																		instancePath:
																																																																																																			instancePath +
																																																																																																			"/syntax/" +
																																																																																																			key1
																																																																																																				.replace(
																																																																																																					/~/g,
																																																																																																					"~0",
																																																																																																				)
																																																																																																				.replace(
																																																																																																					/\//g,
																																																																																																					"~1",
																																																																																																				),
																																																																																																		parentData:
																																																																																																			data90,
																																																																																																		parentDataProperty:
																																																																																																			key1,
																																																																																																		rootData,
																																																																																																	},
																																																																																																)
																																																																																															) {
																																																																																																vErrors =
																																																																																																	vErrors ===
																																																																																																	null
																																																																																																		? validate13.errors
																																																																																																		: vErrors.concat(
																																																																																																				validate13.errors,
																																																																																																			);
																																																																																																errors =
																																																																																																	vErrors.length;
																																																																																															}
																																																																																															var valid4 =
																																																																																																_errs186 ===
																																																																																																errors;
																																																																																															if (
																																																																																																!valid4
																																																																																															) {
																																																																																																break;
																																																																																															}
																																																																																														}
																																																																																													} else {
																																																																																														validate12.errors =
																																																																																															[
																																																																																																{
																																																																																																	instancePath:
																																																																																																		instancePath +
																																																																																																		"/syntax",
																																																																																																	schemaPath:
																																																																																																		"#/properties/syntax/type",
																																																																																																	keyword:
																																																																																																		"type",
																																																																																																	params:
																																																																																																		{
																																																																																																			type: "object",
																																																																																																		},
																																																																																																	message:
																																																																																																		"must be object",
																																																																																																},
																																																																																															];
																																																																																														return false;
																																																																																													}
																																																																																												}
																																																																																												var valid0 =
																																																																																													_errs183 ===
																																																																																													errors;
																																																																																											} else {
																																																																																												var valid0 = true;
																																																																																											}
																																																																																											if (
																																																																																												valid0
																																																																																											) {
																																																																																												if (
																																																																																													data[
																																																																																														"tab.active_background"
																																																																																													] !==
																																																																																													undefined
																																																																																												) {
																																																																																													const data92 =
																																																																																														data[
																																																																																															"tab.active_background"
																																																																																														];
																																																																																													const _errs187 =
																																																																																														errors;
																																																																																													if (
																																																																																														typeof data92 !==
																																																																																															"string" &&
																																																																																														data92 !==
																																																																																															null
																																																																																													) {
																																																																																														validate12.errors =
																																																																																															[
																																																																																																{
																																																																																																	instancePath:
																																																																																																		instancePath +
																																																																																																		"/tab.active_background",
																																																																																																	schemaPath:
																																																																																																		"#/properties/tab.active_background/type",
																																																																																																	keyword:
																																																																																																		"type",
																																																																																																	params:
																																																																																																		{
																																																																																																			type: schema14
																																																																																																				.properties[
																																																																																																				"tab.active_background"
																																																																																																			]
																																																																																																				.type,
																																																																																																		},
																																																																																																	message:
																																																																																																		"must be string,null",
																																																																																																},
																																																																																															];
																																																																																														return false;
																																																																																													}
																																																																																													var valid0 =
																																																																																														_errs187 ===
																																																																																														errors;
																																																																																												} else {
																																																																																													var valid0 = true;
																																																																																												}
																																																																																												if (
																																																																																													valid0
																																																																																												) {
																																																																																													if (
																																																																																														data[
																																																																																															"tab.inactive_background"
																																																																																														] !==
																																																																																														undefined
																																																																																													) {
																																																																																														const data93 =
																																																																																															data[
																																																																																																"tab.inactive_background"
																																																																																															];
																																																																																														const _errs189 =
																																																																																															errors;
																																																																																														if (
																																																																																															typeof data93 !==
																																																																																																"string" &&
																																																																																															data93 !==
																																																																																																null
																																																																																														) {
																																																																																															validate12.errors =
																																																																																																[
																																																																																																	{
																																																																																																		instancePath:
																																																																																																			instancePath +
																																																																																																			"/tab.inactive_background",
																																																																																																		schemaPath:
																																																																																																			"#/properties/tab.inactive_background/type",
																																																																																																		keyword:
																																																																																																			"type",
																																																																																																		params:
																																																																																																			{
																																																																																																				type: schema14
																																																																																																					.properties[
																																																																																																					"tab.inactive_background"
																																																																																																				]
																																																																																																					.type,
																																																																																																			},
																																																																																																		message:
																																																																																																			"must be string,null",
																																																																																																	},
																																																																																																];
																																																																																															return false;
																																																																																														}
																																																																																														var valid0 =
																																																																																															_errs189 ===
																																																																																															errors;
																																																																																													} else {
																																																																																														var valid0 = true;
																																																																																													}
																																																																																													if (
																																																																																														valid0
																																																																																													) {
																																																																																														if (
																																																																																															data[
																																																																																																"tab_bar.background"
																																																																																															] !==
																																																																																															undefined
																																																																																														) {
																																																																																															const data94 =
																																																																																																data[
																																																																																																	"tab_bar.background"
																																																																																																];
																																																																																															const _errs191 =
																																																																																																errors;
																																																																																															if (
																																																																																																typeof data94 !==
																																																																																																	"string" &&
																																																																																																data94 !==
																																																																																																	null
																																																																																															) {
																																																																																																validate12.errors =
																																																																																																	[
																																																																																																		{
																																																																																																			instancePath:
																																																																																																				instancePath +
																																																																																																				"/tab_bar.background",
																																																																																																			schemaPath:
																																																																																																				"#/properties/tab_bar.background/type",
																																																																																																			keyword:
																																																																																																				"type",
																																																																																																			params:
																																																																																																				{
																																																																																																					type: schema14
																																																																																																						.properties[
																																																																																																						"tab_bar.background"
																																																																																																					]
																																																																																																						.type,
																																																																																																				},
																																																																																																			message:
																																																																																																				"must be string,null",
																																																																																																		},
																																																																																																	];
																																																																																																return false;
																																																																																															}
																																																																																															var valid0 =
																																																																																																_errs191 ===
																																																																																																errors;
																																																																																														} else {
																																																																																															var valid0 = true;
																																																																																														}
																																																																																														if (
																																																																																															valid0
																																																																																														) {
																																																																																															if (
																																																																																																data[
																																																																																																	"terminal.ansi.black"
																																																																																																] !==
																																																																																																undefined
																																																																																															) {
																																																																																																const data95 =
																																																																																																	data[
																																																																																																		"terminal.ansi.black"
																																																																																																	];
																																																																																																const _errs193 =
																																																																																																	errors;
																																																																																																if (
																																																																																																	typeof data95 !==
																																																																																																		"string" &&
																																																																																																	data95 !==
																																																																																																		null
																																																																																																) {
																																																																																																	validate12.errors =
																																																																																																		[
																																																																																																			{
																																																																																																				instancePath:
																																																																																																					instancePath +
																																																																																																					"/terminal.ansi.black",
																																																																																																				schemaPath:
																																																																																																					"#/properties/terminal.ansi.black/type",
																																																																																																				keyword:
																																																																																																					"type",
																																																																																																				params:
																																																																																																					{
																																																																																																						type: schema14
																																																																																																							.properties[
																																																																																																							"terminal.ansi.black"
																																																																																																						]
																																																																																																							.type,
																																																																																																					},
																																																																																																				message:
																																																																																																					"must be string,null",
																																																																																																			},
																																																																																																		];
																																																																																																	return false;
																																																																																																}
																																																																																																var valid0 =
																																																																																																	_errs193 ===
																																																																																																	errors;
																																																																																															} else {
																																																																																																var valid0 = true;
																																																																																															}
																																																																																															if (
																																																																																																valid0
																																																																																															) {
																																																																																																if (
																																																																																																	data[
																																																																																																		"terminal.ansi.blue"
																																																																																																	] !==
																																																																																																	undefined
																																																																																																) {
																																																																																																	const data96 =
																																																																																																		data[
																																																																																																			"terminal.ansi.blue"
																																																																																																		];
																																																																																																	const _errs195 =
																																																																																																		errors;
																																																																																																	if (
																																																																																																		typeof data96 !==
																																																																																																			"string" &&
																																																																																																		data96 !==
																																																																																																			null
																																																																																																	) {
																																																																																																		validate12.errors =
																																																																																																			[
																																																																																																				{
																																																																																																					instancePath:
																																																																																																						instancePath +
																																																																																																						"/terminal.ansi.blue",
																																																																																																					schemaPath:
																																																																																																						"#/properties/terminal.ansi.blue/type",
																																																																																																					keyword:
																																																																																																						"type",
																																																																																																					params:
																																																																																																						{
																																																																																																							type: schema14
																																																																																																								.properties[
																																																																																																								"terminal.ansi.blue"
																																																																																																							]
																																																																																																								.type,
																																																																																																						},
																																																																																																					message:
																																																																																																						"must be string,null",
																																																																																																				},
																																																																																																			];
																																																																																																		return false;
																																																																																																	}
																																																																																																	var valid0 =
																																																																																																		_errs195 ===
																																																																																																		errors;
																																																																																																} else {
																																																																																																	var valid0 = true;
																																																																																																}
																																																																																																if (
																																																																																																	valid0
																																																																																																) {
																																																																																																	if (
																																																																																																		data[
																																																																																																			"terminal.ansi.bright_black"
																																																																																																		] !==
																																																																																																		undefined
																																																																																																	) {
																																																																																																		const data97 =
																																																																																																			data[
																																																																																																				"terminal.ansi.bright_black"
																																																																																																			];
																																																																																																		const _errs197 =
																																																																																																			errors;
																																																																																																		if (
																																																																																																			typeof data97 !==
																																																																																																				"string" &&
																																																																																																			data97 !==
																																																																																																				null
																																																																																																		) {
																																																																																																			validate12.errors =
																																																																																																				[
																																																																																																					{
																																																																																																						instancePath:
																																																																																																							instancePath +
																																																																																																							"/terminal.ansi.bright_black",
																																																																																																						schemaPath:
																																																																																																							"#/properties/terminal.ansi.bright_black/type",
																																																																																																						keyword:
																																																																																																							"type",
																																																																																																						params:
																																																																																																							{
																																																																																																								type: schema14
																																																																																																									.properties[
																																																																																																									"terminal.ansi.bright_black"
																																																																																																								]
																																																																																																									.type,
																																																																																																							},
																																																																																																						message:
																																																																																																							"must be string,null",
																																																																																																					},
																																																																																																				];
																																																																																																			return false;
																																																																																																		}
																																																																																																		var valid0 =
																																																																																																			_errs197 ===
																																																																																																			errors;
																																																																																																	} else {
																																																																																																		var valid0 = true;
																																																																																																	}
																																																																																																	if (
																																																																																																		valid0
																																																																																																	) {
																																																																																																		if (
																																																																																																			data[
																																																																																																				"terminal.ansi.bright_blue"
																																																																																																			] !==
																																																																																																			undefined
																																																																																																		) {
																																																																																																			const data98 =
																																																																																																				data[
																																																																																																					"terminal.ansi.bright_blue"
																																																																																																				];
																																																																																																			const _errs199 =
																																																																																																				errors;
																																																																																																			if (
																																																																																																				typeof data98 !==
																																																																																																					"string" &&
																																																																																																				data98 !==
																																																																																																					null
																																																																																																			) {
																																																																																																				validate12.errors =
																																																																																																					[
																																																																																																						{
																																																																																																							instancePath:
																																																																																																								instancePath +
																																																																																																								"/terminal.ansi.bright_blue",
																																																																																																							schemaPath:
																																																																																																								"#/properties/terminal.ansi.bright_blue/type",
																																																																																																							keyword:
																																																																																																								"type",
																																																																																																							params:
																																																																																																								{
																																																																																																									type: schema14
																																																																																																										.properties[
																																																																																																										"terminal.ansi.bright_blue"
																																																																																																									]
																																																																																																										.type,
																																																																																																								},
																																																																																																							message:
																																																																																																								"must be string,null",
																																																																																																						},
																																																																																																					];
																																																																																																				return false;
																																																																																																			}
																																																																																																			var valid0 =
																																																																																																				_errs199 ===
																																																																																																				errors;
																																																																																																		} else {
																																																																																																			var valid0 = true;
																																																																																																		}
																																																																																																		if (
																																																																																																			valid0
																																																																																																		) {
																																																																																																			if (
																																																																																																				data[
																																																																																																					"terminal.ansi.bright_cyan"
																																																																																																				] !==
																																																																																																				undefined
																																																																																																			) {
																																																																																																				const data99 =
																																																																																																					data[
																																																																																																						"terminal.ansi.bright_cyan"
																																																																																																					];
																																																																																																				const _errs201 =
																																																																																																					errors;
																																																																																																				if (
																																																																																																					typeof data99 !==
																																																																																																						"string" &&
																																																																																																					data99 !==
																																																																																																						null
																																																																																																				) {
																																																																																																					validate12.errors =
																																																																																																						[
																																																																																																							{
																																																																																																								instancePath:
																																																																																																									instancePath +
																																																																																																									"/terminal.ansi.bright_cyan",
																																																																																																								schemaPath:
																																																																																																									"#/properties/terminal.ansi.bright_cyan/type",
																																																																																																								keyword:
																																																																																																									"type",
																																																																																																								params:
																																																																																																									{
																																																																																																										type: schema14
																																																																																																											.properties[
																																																																																																											"terminal.ansi.bright_cyan"
																																																																																																										]
																																																																																																											.type,
																																																																																																									},
																																																																																																								message:
																																																																																																									"must be string,null",
																																																																																																							},
																																																																																																						];
																																																																																																					return false;
																																																																																																				}
																																																																																																				var valid0 =
																																																																																																					_errs201 ===
																																																																																																					errors;
																																																																																																			} else {
																																																																																																				var valid0 = true;
																																																																																																			}
																																																																																																			if (
																																																																																																				valid0
																																																																																																			) {
																																																																																																				if (
																																																																																																					data[
																																																																																																						"terminal.ansi.bright_green"
																																																																																																					] !==
																																																																																																					undefined
																																																																																																				) {
																																																																																																					const data100 =
																																																																																																						data[
																																																																																																							"terminal.ansi.bright_green"
																																																																																																						];
																																																																																																					const _errs203 =
																																																																																																						errors;
																																																																																																					if (
																																																																																																						typeof data100 !==
																																																																																																							"string" &&
																																																																																																						data100 !==
																																																																																																							null
																																																																																																					) {
																																																																																																						validate12.errors =
																																																																																																							[
																																																																																																								{
																																																																																																									instancePath:
																																																																																																										instancePath +
																																																																																																										"/terminal.ansi.bright_green",
																																																																																																									schemaPath:
																																																																																																										"#/properties/terminal.ansi.bright_green/type",
																																																																																																									keyword:
																																																																																																										"type",
																																																																																																									params:
																																																																																																										{
																																																																																																											type: schema14
																																																																																																												.properties[
																																																																																																												"terminal.ansi.bright_green"
																																																																																																											]
																																																																																																												.type,
																																																																																																										},
																																																																																																									message:
																																																																																																										"must be string,null",
																																																																																																								},
																																																																																																							];
																																																																																																						return false;
																																																																																																					}
																																																																																																					var valid0 =
																																																																																																						_errs203 ===
																																																																																																						errors;
																																																																																																				} else {
																																																																																																					var valid0 = true;
																																																																																																				}
																																																																																																				if (
																																																																																																					valid0
																																																																																																				) {
																																																																																																					if (
																																																																																																						data[
																																																																																																							"terminal.ansi.bright_magenta"
																																																																																																						] !==
																																																																																																						undefined
																																																																																																					) {
																																																																																																						const data101 =
																																																																																																							data[
																																																																																																								"terminal.ansi.bright_magenta"
																																																																																																							];
																																																																																																						const _errs205 =
																																																																																																							errors;
																																																																																																						if (
																																																																																																							typeof data101 !==
																																																																																																								"string" &&
																																																																																																							data101 !==
																																																																																																								null
																																																																																																						) {
																																																																																																							validate12.errors =
																																																																																																								[
																																																																																																									{
																																																																																																										instancePath:
																																																																																																											instancePath +
																																																																																																											"/terminal.ansi.bright_magenta",
																																																																																																										schemaPath:
																																																																																																											"#/properties/terminal.ansi.bright_magenta/type",
																																																																																																										keyword:
																																																																																																											"type",
																																																																																																										params:
																																																																																																											{
																																																																																																												type: schema14
																																																																																																													.properties[
																																																																																																													"terminal.ansi.bright_magenta"
																																																																																																												]
																																																																																																													.type,
																																																																																																											},
																																																																																																										message:
																																																																																																											"must be string,null",
																																																																																																									},
																																																																																																								];
																																																																																																							return false;
																																																																																																						}
																																																																																																						var valid0 =
																																																																																																							_errs205 ===
																																																																																																							errors;
																																																																																																					} else {
																																																																																																						var valid0 = true;
																																																																																																					}
																																																																																																					if (
																																																																																																						valid0
																																																																																																					) {
																																																																																																						if (
																																																																																																							data[
																																																																																																								"terminal.ansi.bright_red"
																																																																																																							] !==
																																																																																																							undefined
																																																																																																						) {
																																																																																																							const data102 =
																																																																																																								data[
																																																																																																									"terminal.ansi.bright_red"
																																																																																																								];
																																																																																																							const _errs207 =
																																																																																																								errors;
																																																																																																							if (
																																																																																																								typeof data102 !==
																																																																																																									"string" &&
																																																																																																								data102 !==
																																																																																																									null
																																																																																																							) {
																																																																																																								validate12.errors =
																																																																																																									[
																																																																																																										{
																																																																																																											instancePath:
																																																																																																												instancePath +
																																																																																																												"/terminal.ansi.bright_red",
																																																																																																											schemaPath:
																																																																																																												"#/properties/terminal.ansi.bright_red/type",
																																																																																																											keyword:
																																																																																																												"type",
																																																																																																											params:
																																																																																																												{
																																																																																																													type: schema14
																																																																																																														.properties[
																																																																																																														"terminal.ansi.bright_red"
																																																																																																													]
																																																																																																														.type,
																																																																																																												},
																																																																																																											message:
																																																																																																												"must be string,null",
																																																																																																										},
																																																																																																									];
																																																																																																								return false;
																																																																																																							}
																																																																																																							var valid0 =
																																																																																																								_errs207 ===
																																																																																																								errors;
																																																																																																						} else {
																																																																																																							var valid0 = true;
																																																																																																						}
																																																																																																						if (
																																																																																																							valid0
																																																																																																						) {
																																																																																																							if (
																																																																																																								data[
																																																																																																									"terminal.ansi.bright_white"
																																																																																																								] !==
																																																																																																								undefined
																																																																																																							) {
																																																																																																								const data103 =
																																																																																																									data[
																																																																																																										"terminal.ansi.bright_white"
																																																																																																									];
																																																																																																								const _errs209 =
																																																																																																									errors;
																																																																																																								if (
																																																																																																									typeof data103 !==
																																																																																																										"string" &&
																																																																																																									data103 !==
																																																																																																										null
																																																																																																								) {
																																																																																																									validate12.errors =
																																																																																																										[
																																																																																																											{
																																																																																																												instancePath:
																																																																																																													instancePath +
																																																																																																													"/terminal.ansi.bright_white",
																																																																																																												schemaPath:
																																																																																																													"#/properties/terminal.ansi.bright_white/type",
																																																																																																												keyword:
																																																																																																													"type",
																																																																																																												params:
																																																																																																													{
																																																																																																														type: schema14
																																																																																																															.properties[
																																																																																																															"terminal.ansi.bright_white"
																																																																																																														]
																																																																																																															.type,
																																																																																																													},
																																																																																																												message:
																																																																																																													"must be string,null",
																																																																																																											},
																																																																																																										];
																																																																																																									return false;
																																																																																																								}
																																																																																																								var valid0 =
																																																																																																									_errs209 ===
																																																																																																									errors;
																																																																																																							} else {
																																																																																																								var valid0 = true;
																																																																																																							}
																																																																																																							if (
																																																																																																								valid0
																																																																																																							) {
																																																																																																								if (
																																																																																																									data[
																																																																																																										"terminal.ansi.bright_yellow"
																																																																																																									] !==
																																																																																																									undefined
																																																																																																								) {
																																																																																																									const data104 =
																																																																																																										data[
																																																																																																											"terminal.ansi.bright_yellow"
																																																																																																										];
																																																																																																									const _errs211 =
																																																																																																										errors;
																																																																																																									if (
																																																																																																										typeof data104 !==
																																																																																																											"string" &&
																																																																																																										data104 !==
																																																																																																											null
																																																																																																									) {
																																																																																																										validate12.errors =
																																																																																																											[
																																																																																																												{
																																																																																																													instancePath:
																																																																																																														instancePath +
																																																																																																														"/terminal.ansi.bright_yellow",
																																																																																																													schemaPath:
																																																																																																														"#/properties/terminal.ansi.bright_yellow/type",
																																																																																																													keyword:
																																																																																																														"type",
																																																																																																													params:
																																																																																																														{
																																																																																																															type: schema14
																																																																																																																.properties[
																																																																																																																"terminal.ansi.bright_yellow"
																																																																																																															]
																																																																																																																.type,
																																																																																																														},
																																																																																																													message:
																																																																																																														"must be string,null",
																																																																																																												},
																																																																																																											];
																																																																																																										return false;
																																																																																																									}
																																																																																																									var valid0 =
																																																																																																										_errs211 ===
																																																																																																										errors;
																																																																																																								} else {
																																																																																																									var valid0 = true;
																																																																																																								}
																																																																																																								if (
																																																																																																									valid0
																																																																																																								) {
																																																																																																									if (
																																																																																																										data[
																																																																																																											"terminal.ansi.cyan"
																																																																																																										] !==
																																																																																																										undefined
																																																																																																									) {
																																																																																																										const data105 =
																																																																																																											data[
																																																																																																												"terminal.ansi.cyan"
																																																																																																											];
																																																																																																										const _errs213 =
																																																																																																											errors;
																																																																																																										if (
																																																																																																											typeof data105 !==
																																																																																																												"string" &&
																																																																																																											data105 !==
																																																																																																												null
																																																																																																										) {
																																																																																																											validate12.errors =
																																																																																																												[
																																																																																																													{
																																																																																																														instancePath:
																																																																																																															instancePath +
																																																																																																															"/terminal.ansi.cyan",
																																																																																																														schemaPath:
																																																																																																															"#/properties/terminal.ansi.cyan/type",
																																																																																																														keyword:
																																																																																																															"type",
																																																																																																														params:
																																																																																																															{
																																																																																																																type: schema14
																																																																																																																	.properties[
																																																																																																																	"terminal.ansi.cyan"
																																																																																																																]
																																																																																																																	.type,
																																																																																																															},
																																																																																																														message:
																																																																																																															"must be string,null",
																																																																																																													},
																																																																																																												];
																																																																																																											return false;
																																																																																																										}
																																																																																																										var valid0 =
																																																																																																											_errs213 ===
																																																																																																											errors;
																																																																																																									} else {
																																																																																																										var valid0 = true;
																																																																																																									}
																																																																																																									if (
																																																																																																										valid0
																																																																																																									) {
																																																																																																										if (
																																																																																																											data[
																																																																																																												"terminal.ansi.dim_black"
																																																																																																											] !==
																																																																																																											undefined
																																																																																																										) {
																																																																																																											const data106 =
																																																																																																												data[
																																																																																																													"terminal.ansi.dim_black"
																																																																																																												];
																																																																																																											const _errs215 =
																																																																																																												errors;
																																																																																																											if (
																																																																																																												typeof data106 !==
																																																																																																													"string" &&
																																																																																																												data106 !==
																																																																																																													null
																																																																																																											) {
																																																																																																												validate12.errors =
																																																																																																													[
																																																																																																														{
																																																																																																															instancePath:
																																																																																																																instancePath +
																																																																																																																"/terminal.ansi.dim_black",
																																																																																																															schemaPath:
																																																																																																																"#/properties/terminal.ansi.dim_black/type",
																																																																																																															keyword:
																																																																																																																"type",
																																																																																																															params:
																																																																																																																{
																																																																																																																	type: schema14
																																																																																																																		.properties[
																																																																																																																		"terminal.ansi.dim_black"
																																																																																																																	]
																																																																																																																		.type,
																																																																																																																},
																																																																																																															message:
																																																																																																																"must be string,null",
																																																																																																														},
																																																																																																													];
																																																																																																												return false;
																																																																																																											}
																																																																																																											var valid0 =
																																																																																																												_errs215 ===
																																																																																																												errors;
																																																																																																										} else {
																																																																																																											var valid0 = true;
																																																																																																										}
																																																																																																										if (
																																																																																																											valid0
																																																																																																										) {
																																																																																																											if (
																																																																																																												data[
																																																																																																													"terminal.ansi.dim_blue"
																																																																																																												] !==
																																																																																																												undefined
																																																																																																											) {
																																																																																																												const data107 =
																																																																																																													data[
																																																																																																														"terminal.ansi.dim_blue"
																																																																																																													];
																																																																																																												const _errs217 =
																																																																																																													errors;
																																																																																																												if (
																																																																																																													typeof data107 !==
																																																																																																														"string" &&
																																																																																																													data107 !==
																																																																																																														null
																																																																																																												) {
																																																																																																													validate12.errors =
																																																																																																														[
																																																																																																															{
																																																																																																																instancePath:
																																																																																																																	instancePath +
																																																																																																																	"/terminal.ansi.dim_blue",
																																																																																																																schemaPath:
																																																																																																																	"#/properties/terminal.ansi.dim_blue/type",
																																																																																																																keyword:
																																																																																																																	"type",
																																																																																																																params:
																																																																																																																	{
																																																																																																																		type: schema14
																																																																																																																			.properties[
																																																																																																																			"terminal.ansi.dim_blue"
																																																																																																																		]
																																																																																																																			.type,
																																																																																																																	},
																																																																																																																message:
																																																																																																																	"must be string,null",
																																																																																																															},
																																																																																																														];
																																																																																																													return false;
																																																																																																												}
																																																																																																												var valid0 =
																																																																																																													_errs217 ===
																																																																																																													errors;
																																																																																																											} else {
																																																																																																												var valid0 = true;
																																																																																																											}
																																																																																																											if (
																																																																																																												valid0
																																																																																																											) {
																																																																																																												if (
																																																																																																													data[
																																																																																																														"terminal.ansi.dim_cyan"
																																																																																																													] !==
																																																																																																													undefined
																																																																																																												) {
																																																																																																													const data108 =
																																																																																																														data[
																																																																																																															"terminal.ansi.dim_cyan"
																																																																																																														];
																																																																																																													const _errs219 =
																																																																																																														errors;
																																																																																																													if (
																																																																																																														typeof data108 !==
																																																																																																															"string" &&
																																																																																																														data108 !==
																																																																																																															null
																																																																																																													) {
																																																																																																														validate12.errors =
																																																																																																															[
																																																																																																																{
																																																																																																																	instancePath:
																																																																																																																		instancePath +
																																																																																																																		"/terminal.ansi.dim_cyan",
																																																																																																																	schemaPath:
																																																																																																																		"#/properties/terminal.ansi.dim_cyan/type",
																																																																																																																	keyword:
																																																																																																																		"type",
																																																																																																																	params:
																																																																																																																		{
																																																																																																																			type: schema14
																																																																																																																				.properties[
																																																																																																																				"terminal.ansi.dim_cyan"
																																																																																																																			]
																																																																																																																				.type,
																																																																																																																		},
																																																																																																																	message:
																																																																																																																		"must be string,null",
																																																																																																																},
																																																																																																															];
																																																																																																														return false;
																																																																																																													}
																																																																																																													var valid0 =
																																																																																																														_errs219 ===
																																																																																																														errors;
																																																																																																												} else {
																																																																																																													var valid0 = true;
																																																																																																												}
																																																																																																												if (
																																																																																																													valid0
																																																																																																												) {
																																																																																																													if (
																																																																																																														data[
																																																																																																															"terminal.ansi.dim_green"
																																																																																																														] !==
																																																																																																														undefined
																																																																																																													) {
																																																																																																														const data109 =
																																																																																																															data[
																																																																																																																"terminal.ansi.dim_green"
																																																																																																															];
																																																																																																														const _errs221 =
																																																																																																															errors;
																																																																																																														if (
																																																																																																															typeof data109 !==
																																																																																																																"string" &&
																																																																																																															data109 !==
																																																																																																																null
																																																																																																														) {
																																																																																																															validate12.errors =
																																																																																																																[
																																																																																																																	{
																																																																																																																		instancePath:
																																																																																																																			instancePath +
																																																																																																																			"/terminal.ansi.dim_green",
																																																																																																																		schemaPath:
																																																																																																																			"#/properties/terminal.ansi.dim_green/type",
																																																																																																																		keyword:
																																																																																																																			"type",
																																																																																																																		params:
																																																																																																																			{
																																																																																																																				type: schema14
																																																																																																																					.properties[
																																																																																																																					"terminal.ansi.dim_green"
																																																																																																																				]
																																																																																																																					.type,
																																																																																																																			},
																																																																																																																		message:
																																																																																																																			"must be string,null",
																																																																																																																	},
																																																																																																																];
																																																																																																															return false;
																																																																																																														}
																																																																																																														var valid0 =
																																																																																																															_errs221 ===
																																																																																																															errors;
																																																																																																													} else {
																																																																																																														var valid0 = true;
																																																																																																													}
																																																																																																													if (
																																																																																																														valid0
																																																																																																													) {
																																																																																																														if (
																																																																																																															data[
																																																																																																																"terminal.ansi.dim_magenta"
																																																																																																															] !==
																																																																																																															undefined
																																																																																																														) {
																																																																																																															const data110 =
																																																																																																																data[
																																																																																																																	"terminal.ansi.dim_magenta"
																																																																																																																];
																																																																																																															const _errs223 =
																																																																																																																errors;
																																																																																																															if (
																																																																																																																typeof data110 !==
																																																																																																																	"string" &&
																																																																																																																data110 !==
																																																																																																																	null
																																																																																																															) {
																																																																																																																validate12.errors =
																																																																																																																	[
																																																																																																																		{
																																																																																																																			instancePath:
																																																																																																																				instancePath +
																																																																																																																				"/terminal.ansi.dim_magenta",
																																																																																																																			schemaPath:
																																																																																																																				"#/properties/terminal.ansi.dim_magenta/type",
																																																																																																																			keyword:
																																																																																																																				"type",
																																																																																																																			params:
																																																																																																																				{
																																																																																																																					type: schema14
																																																																																																																						.properties[
																																																																																																																						"terminal.ansi.dim_magenta"
																																																																																																																					]
																																																																																																																						.type,
																																																																																																																				},
																																																																																																																			message:
																																																																																																																				"must be string,null",
																																																																																																																		},
																																																																																																																	];
																																																																																																																return false;
																																																																																																															}
																																																																																																															var valid0 =
																																																																																																																_errs223 ===
																																																																																																																errors;
																																																																																																														} else {
																																																																																																															var valid0 = true;
																																																																																																														}
																																																																																																														if (
																																																																																																															valid0
																																																																																																														) {
																																																																																																															if (
																																																																																																																data[
																																																																																																																	"terminal.ansi.dim_red"
																																																																																																																] !==
																																																																																																																undefined
																																																																																																															) {
																																																																																																																const data111 =
																																																																																																																	data[
																																																																																																																		"terminal.ansi.dim_red"
																																																																																																																	];
																																																																																																																const _errs225 =
																																																																																																																	errors;
																																																																																																																if (
																																																																																																																	typeof data111 !==
																																																																																																																		"string" &&
																																																																																																																	data111 !==
																																																																																																																		null
																																																																																																																) {
																																																																																																																	validate12.errors =
																																																																																																																		[
																																																																																																																			{
																																																																																																																				instancePath:
																																																																																																																					instancePath +
																																																																																																																					"/terminal.ansi.dim_red",
																																																																																																																				schemaPath:
																																																																																																																					"#/properties/terminal.ansi.dim_red/type",
																																																																																																																				keyword:
																																																																																																																					"type",
																																																																																																																				params:
																																																																																																																					{
																																																																																																																						type: schema14
																																																																																																																							.properties[
																																																																																																																							"terminal.ansi.dim_red"
																																																																																																																						]
																																																																																																																							.type,
																																																																																																																					},
																																																																																																																				message:
																																																																																																																					"must be string,null",
																																																																																																																			},
																																																																																																																		];
																																																																																																																	return false;
																																																																																																																}
																																																																																																																var valid0 =
																																																																																																																	_errs225 ===
																																																																																																																	errors;
																																																																																																															} else {
																																																																																																																var valid0 = true;
																																																																																																															}
																																																																																																															if (
																																																																																																																valid0
																																																																																																															) {
																																																																																																																if (
																																																																																																																	data[
																																																																																																																		"terminal.ansi.dim_white"
																																																																																																																	] !==
																																																																																																																	undefined
																																																																																																																) {
																																																																																																																	const data112 =
																																																																																																																		data[
																																																																																																																			"terminal.ansi.dim_white"
																																																																																																																		];
																																																																																																																	const _errs227 =
																																																																																																																		errors;
																																																																																																																	if (
																																																																																																																		typeof data112 !==
																																																																																																																			"string" &&
																																																																																																																		data112 !==
																																																																																																																			null
																																																																																																																	) {
																																																																																																																		validate12.errors =
																																																																																																																			[
																																																																																																																				{
																																																																																																																					instancePath:
																																																																																																																						instancePath +
																																																																																																																						"/terminal.ansi.dim_white",
																																																																																																																					schemaPath:
																																																																																																																						"#/properties/terminal.ansi.dim_white/type",
																																																																																																																					keyword:
																																																																																																																						"type",
																																																																																																																					params:
																																																																																																																						{
																																																																																																																							type: schema14
																																																																																																																								.properties[
																																																																																																																								"terminal.ansi.dim_white"
																																																																																																																							]
																																																																																																																								.type,
																																																																																																																						},
																																																																																																																					message:
																																																																																																																						"must be string,null",
																																																																																																																				},
																																																																																																																			];
																																																																																																																		return false;
																																																																																																																	}
																																																																																																																	var valid0 =
																																																																																																																		_errs227 ===
																																																																																																																		errors;
																																																																																																																} else {
																																																																																																																	var valid0 = true;
																																																																																																																}
																																																																																																																if (
																																																																																																																	valid0
																																																																																																																) {
																																																																																																																	if (
																																																																																																																		data[
																																																																																																																			"terminal.ansi.dim_yellow"
																																																																																																																		] !==
																																																																																																																		undefined
																																																																																																																	) {
																																																																																																																		const data113 =
																																																																																																																			data[
																																																																																																																				"terminal.ansi.dim_yellow"
																																																																																																																			];
																																																																																																																		const _errs229 =
																																																																																																																			errors;
																																																																																																																		if (
																																																																																																																			typeof data113 !==
																																																																																																																				"string" &&
																																																																																																																			data113 !==
																																																																																																																				null
																																																																																																																		) {
																																																																																																																			validate12.errors =
																																																																																																																				[
																																																																																																																					{
																																																																																																																						instancePath:
																																																																																																																							instancePath +
																																																																																																																							"/terminal.ansi.dim_yellow",
																																																																																																																						schemaPath:
																																																																																																																							"#/properties/terminal.ansi.dim_yellow/type",
																																																																																																																						keyword:
																																																																																																																							"type",
																																																																																																																						params:
																																																																																																																							{
																																																																																																																								type: schema14
																																																																																																																									.properties[
																																																																																																																									"terminal.ansi.dim_yellow"
																																																																																																																								]
																																																																																																																									.type,
																																																																																																																							},
																																																																																																																						message:
																																																																																																																							"must be string,null",
																																																																																																																					},
																																																																																																																				];
																																																																																																																			return false;
																																																																																																																		}
																																																																																																																		var valid0 =
																																																																																																																			_errs229 ===
																																																																																																																			errors;
																																																																																																																	} else {
																																																																																																																		var valid0 = true;
																																																																																																																	}
																																																																																																																	if (
																																																																																																																		valid0
																																																																																																																	) {
																																																																																																																		if (
																																																																																																																			data[
																																																																																																																				"terminal.ansi.green"
																																																																																																																			] !==
																																																																																																																			undefined
																																																																																																																		) {
																																																																																																																			const data114 =
																																																																																																																				data[
																																																																																																																					"terminal.ansi.green"
																																																																																																																				];
																																																																																																																			const _errs231 =
																																																																																																																				errors;
																																																																																																																			if (
																																																																																																																				typeof data114 !==
																																																																																																																					"string" &&
																																																																																																																				data114 !==
																																																																																																																					null
																																																																																																																			) {
																																																																																																																				validate12.errors =
																																																																																																																					[
																																																																																																																						{
																																																																																																																							instancePath:
																																																																																																																								instancePath +
																																																																																																																								"/terminal.ansi.green",
																																																																																																																							schemaPath:
																																																																																																																								"#/properties/terminal.ansi.green/type",
																																																																																																																							keyword:
																																																																																																																								"type",
																																																																																																																							params:
																																																																																																																								{
																																																																																																																									type: schema14
																																																																																																																										.properties[
																																																																																																																										"terminal.ansi.green"
																																																																																																																									]
																																																																																																																										.type,
																																																																																																																								},
																																																																																																																							message:
																																																																																																																								"must be string,null",
																																																																																																																						},
																																																																																																																					];
																																																																																																																				return false;
																																																																																																																			}
																																																																																																																			var valid0 =
																																																																																																																				_errs231 ===
																																																																																																																				errors;
																																																																																																																		} else {
																																																																																																																			var valid0 = true;
																																																																																																																		}
																																																																																																																		if (
																																																																																																																			valid0
																																																																																																																		) {
																																																																																																																			if (
																																																																																																																				data[
																																																																																																																					"terminal.ansi.magenta"
																																																																																																																				] !==
																																																																																																																				undefined
																																																																																																																			) {
																																																																																																																				const data115 =
																																																																																																																					data[
																																																																																																																						"terminal.ansi.magenta"
																																																																																																																					];
																																																																																																																				const _errs233 =
																																																																																																																					errors;
																																																																																																																				if (
																																																																																																																					typeof data115 !==
																																																																																																																						"string" &&
																																																																																																																					data115 !==
																																																																																																																						null
																																																																																																																				) {
																																																																																																																					validate12.errors =
																																																																																																																						[
																																																																																																																							{
																																																																																																																								instancePath:
																																																																																																																									instancePath +
																																																																																																																									"/terminal.ansi.magenta",
																																																																																																																								schemaPath:
																																																																																																																									"#/properties/terminal.ansi.magenta/type",
																																																																																																																								keyword:
																																																																																																																									"type",
																																																																																																																								params:
																																																																																																																									{
																																																																																																																										type: schema14
																																																																																																																											.properties[
																																																																																																																											"terminal.ansi.magenta"
																																																																																																																										]
																																																																																																																											.type,
																																																																																																																									},
																																																																																																																								message:
																																																																																																																									"must be string,null",
																																																																																																																							},
																																																																																																																						];
																																																																																																																					return false;
																																																																																																																				}
																																																																																																																				var valid0 =
																																																																																																																					_errs233 ===
																																																																																																																					errors;
																																																																																																																			} else {
																																																																																																																				var valid0 = true;
																																																																																																																			}
																																																																																																																			if (
																																																																																																																				valid0
																																																																																																																			) {
																																																																																																																				if (
																																																																																																																					data[
																																																																																																																						"terminal.ansi.red"
																																																																																																																					] !==
																																																																																																																					undefined
																																																																																																																				) {
																																																																																																																					const data116 =
																																																																																																																						data[
																																																																																																																							"terminal.ansi.red"
																																																																																																																						];
																																																																																																																					const _errs235 =
																																																																																																																						errors;
																																																																																																																					if (
																																																																																																																						typeof data116 !==
																																																																																																																							"string" &&
																																																																																																																						data116 !==
																																																																																																																							null
																																																																																																																					) {
																																																																																																																						validate12.errors =
																																																																																																																							[
																																																																																																																								{
																																																																																																																									instancePath:
																																																																																																																										instancePath +
																																																																																																																										"/terminal.ansi.red",
																																																																																																																									schemaPath:
																																																																																																																										"#/properties/terminal.ansi.red/type",
																																																																																																																									keyword:
																																																																																																																										"type",
																																																																																																																									params:
																																																																																																																										{
																																																																																																																											type: schema14
																																																																																																																												.properties[
																																																																																																																												"terminal.ansi.red"
																																																																																																																											]
																																																																																																																												.type,
																																																																																																																										},
																																																																																																																									message:
																																																																																																																										"must be string,null",
																																																																																																																								},
																																																																																																																							];
																																																																																																																						return false;
																																																																																																																					}
																																																																																																																					var valid0 =
																																																																																																																						_errs235 ===
																																																																																																																						errors;
																																																																																																																				} else {
																																																																																																																					var valid0 = true;
																																																																																																																				}
																																																																																																																				if (
																																																																																																																					valid0
																																																																																																																				) {
																																																																																																																					if (
																																																																																																																						data[
																																																																																																																							"terminal.ansi.white"
																																																																																																																						] !==
																																																																																																																						undefined
																																																																																																																					) {
																																																																																																																						const data117 =
																																																																																																																							data[
																																																																																																																								"terminal.ansi.white"
																																																																																																																							];
																																																																																																																						const _errs237 =
																																																																																																																							errors;
																																																																																																																						if (
																																																																																																																							typeof data117 !==
																																																																																																																								"string" &&
																																																																																																																							data117 !==
																																																																																																																								null
																																																																																																																						) {
																																																																																																																							validate12.errors =
																																																																																																																								[
																																																																																																																									{
																																																																																																																										instancePath:
																																																																																																																											instancePath +
																																																																																																																											"/terminal.ansi.white",
																																																																																																																										schemaPath:
																																																																																																																											"#/properties/terminal.ansi.white/type",
																																																																																																																										keyword:
																																																																																																																											"type",
																																																																																																																										params:
																																																																																																																											{
																																																																																																																												type: schema14
																																																																																																																													.properties[
																																																																																																																													"terminal.ansi.white"
																																																																																																																												]
																																																																																																																													.type,
																																																																																																																											},
																																																																																																																										message:
																																																																																																																											"must be string,null",
																																																																																																																									},
																																																																																																																								];
																																																																																																																							return false;
																																																																																																																						}
																																																																																																																						var valid0 =
																																																																																																																							_errs237 ===
																																																																																																																							errors;
																																																																																																																					} else {
																																																																																																																						var valid0 = true;
																																																																																																																					}
																																																																																																																					if (
																																																																																																																						valid0
																																																																																																																					) {
																																																																																																																						if (
																																																																																																																							data[
																																																																																																																								"terminal.ansi.yellow"
																																																																																																																							] !==
																																																																																																																							undefined
																																																																																																																						) {
																																																																																																																							const data118 =
																																																																																																																								data[
																																																																																																																									"terminal.ansi.yellow"
																																																																																																																								];
																																																																																																																							const _errs239 =
																																																																																																																								errors;
																																																																																																																							if (
																																																																																																																								typeof data118 !==
																																																																																																																									"string" &&
																																																																																																																								data118 !==
																																																																																																																									null
																																																																																																																							) {
																																																																																																																								validate12.errors =
																																																																																																																									[
																																																																																																																										{
																																																																																																																											instancePath:
																																																																																																																												instancePath +
																																																																																																																												"/terminal.ansi.yellow",
																																																																																																																											schemaPath:
																																																																																																																												"#/properties/terminal.ansi.yellow/type",
																																																																																																																											keyword:
																																																																																																																												"type",
																																																																																																																											params:
																																																																																																																												{
																																																																																																																													type: schema14
																																																																																																																														.properties[
																																																																																																																														"terminal.ansi.yellow"
																																																																																																																													]
																																																																																																																														.type,
																																																																																																																												},
																																																																																																																											message:
																																																																																																																												"must be string,null",
																																																																																																																										},
																																																																																																																									];
																																																																																																																								return false;
																																																																																																																							}
																																																																																																																							var valid0 =
																																																																																																																								_errs239 ===
																																																																																																																								errors;
																																																																																																																						} else {
																																																																																																																							var valid0 = true;
																																																																																																																						}
																																																																																																																						if (
																																																																																																																							valid0
																																																																																																																						) {
																																																																																																																							if (
																																																																																																																								data[
																																																																																																																									"terminal.background"
																																																																																																																								] !==
																																																																																																																								undefined
																																																																																																																							) {
																																																																																																																								const data119 =
																																																																																																																									data[
																																																																																																																										"terminal.background"
																																																																																																																									];
																																																																																																																								const _errs241 =
																																																																																																																									errors;
																																																																																																																								if (
																																																																																																																									typeof data119 !==
																																																																																																																										"string" &&
																																																																																																																									data119 !==
																																																																																																																										null
																																																																																																																								) {
																																																																																																																									validate12.errors =
																																																																																																																										[
																																																																																																																											{
																																																																																																																												instancePath:
																																																																																																																													instancePath +
																																																																																																																													"/terminal.background",
																																																																																																																												schemaPath:
																																																																																																																													"#/properties/terminal.background/type",
																																																																																																																												keyword:
																																																																																																																													"type",
																																																																																																																												params:
																																																																																																																													{
																																																																																																																														type: schema14
																																																																																																																															.properties[
																																																																																																																															"terminal.background"
																																																																																																																														]
																																																																																																																															.type,
																																																																																																																													},
																																																																																																																												message:
																																																																																																																													"must be string,null",
																																																																																																																											},
																																																																																																																										];
																																																																																																																									return false;
																																																																																																																								}
																																																																																																																								var valid0 =
																																																																																																																									_errs241 ===
																																																																																																																									errors;
																																																																																																																							} else {
																																																																																																																								var valid0 = true;
																																																																																																																							}
																																																																																																																							if (
																																																																																																																								valid0
																																																																																																																							) {
																																																																																																																								if (
																																																																																																																									data[
																																																																																																																										"terminal.bright_foreground"
																																																																																																																									] !==
																																																																																																																									undefined
																																																																																																																								) {
																																																																																																																									const data120 =
																																																																																																																										data[
																																																																																																																											"terminal.bright_foreground"
																																																																																																																										];
																																																																																																																									const _errs243 =
																																																																																																																										errors;
																																																																																																																									if (
																																																																																																																										typeof data120 !==
																																																																																																																											"string" &&
																																																																																																																										data120 !==
																																																																																																																											null
																																																																																																																									) {
																																																																																																																										validate12.errors =
																																																																																																																											[
																																																																																																																												{
																																																																																																																													instancePath:
																																																																																																																														instancePath +
																																																																																																																														"/terminal.bright_foreground",
																																																																																																																													schemaPath:
																																																																																																																														"#/properties/terminal.bright_foreground/type",
																																																																																																																													keyword:
																																																																																																																														"type",
																																																																																																																													params:
																																																																																																																														{
																																																																																																																															type: schema14
																																																																																																																																.properties[
																																																																																																																																"terminal.bright_foreground"
																																																																																																																															]
																																																																																																																																.type,
																																																																																																																														},
																																																																																																																													message:
																																																																																																																														"must be string,null",
																																																																																																																												},
																																																																																																																											];
																																																																																																																										return false;
																																																																																																																									}
																																																																																																																									var valid0 =
																																																																																																																										_errs243 ===
																																																																																																																										errors;
																																																																																																																								} else {
																																																																																																																									var valid0 = true;
																																																																																																																								}
																																																																																																																								if (
																																																																																																																									valid0
																																																																																																																								) {
																																																																																																																									if (
																																																																																																																										data[
																																																																																																																											"terminal.dim_foreground"
																																																																																																																										] !==
																																																																																																																										undefined
																																																																																																																									) {
																																																																																																																										const data121 =
																																																																																																																											data[
																																																																																																																												"terminal.dim_foreground"
																																																																																																																											];
																																																																																																																										const _errs245 =
																																																																																																																											errors;
																																																																																																																										if (
																																																																																																																											typeof data121 !==
																																																																																																																												"string" &&
																																																																																																																											data121 !==
																																																																																																																												null
																																																																																																																										) {
																																																																																																																											validate12.errors =
																																																																																																																												[
																																																																																																																													{
																																																																																																																														instancePath:
																																																																																																																															instancePath +
																																																																																																																															"/terminal.dim_foreground",
																																																																																																																														schemaPath:
																																																																																																																															"#/properties/terminal.dim_foreground/type",
																																																																																																																														keyword:
																																																																																																																															"type",
																																																																																																																														params:
																																																																																																																															{
																																																																																																																																type: schema14
																																																																																																																																	.properties[
																																																																																																																																	"terminal.dim_foreground"
																																																																																																																																]
																																																																																																																																	.type,
																																																																																																																															},
																																																																																																																														message:
																																																																																																																															"must be string,null",
																																																																																																																													},
																																																																																																																												];
																																																																																																																											return false;
																																																																																																																										}
																																																																																																																										var valid0 =
																																																																																																																											_errs245 ===
																																																																																																																											errors;
																																																																																																																									} else {
																																																																																																																										var valid0 = true;
																																																																																																																									}
																																																																																																																									if (
																																																																																																																										valid0
																																																																																																																									) {
																																																																																																																										if (
																																																																																																																											data[
																																																																																																																												"terminal.foreground"
																																																																																																																											] !==
																																																																																																																											undefined
																																																																																																																										) {
																																																																																																																											const data122 =
																																																																																																																												data[
																																																																																																																													"terminal.foreground"
																																																																																																																												];
																																																																																																																											const _errs247 =
																																																																																																																												errors;
																																																																																																																											if (
																																																																																																																												typeof data122 !==
																																																																																																																													"string" &&
																																																																																																																												data122 !==
																																																																																																																													null
																																																																																																																											) {
																																																																																																																												validate12.errors =
																																																																																																																													[
																																																																																																																														{
																																																																																																																															instancePath:
																																																																																																																																instancePath +
																																																																																																																																"/terminal.foreground",
																																																																																																																															schemaPath:
																																																																																																																																"#/properties/terminal.foreground/type",
																																																																																																																															keyword:
																																																																																																																																"type",
																																																																																																																															params:
																																																																																																																																{
																																																																																																																																	type: schema14
																																																																																																																																		.properties[
																																																																																																																																		"terminal.foreground"
																																																																																																																																	]
																																																																																																																																		.type,
																																																																																																																																},
																																																																																																																															message:
																																																																																																																																"must be string,null",
																																																																																																																														},
																																																																																																																													];
																																																																																																																												return false;
																																																																																																																											}
																																																																																																																											var valid0 =
																																																																																																																												_errs247 ===
																																																																																																																												errors;
																																																																																																																										} else {
																																																																																																																											var valid0 = true;
																																																																																																																										}
																																																																																																																										if (
																																																																																																																											valid0
																																																																																																																										) {
																																																																																																																											if (
																																																																																																																												data.text !==
																																																																																																																												undefined
																																																																																																																											) {
																																																																																																																												const data123 =
																																																																																																																													data.text;
																																																																																																																												const _errs249 =
																																																																																																																													errors;
																																																																																																																												if (
																																																																																																																													typeof data123 !==
																																																																																																																														"string" &&
																																																																																																																													data123 !==
																																																																																																																														null
																																																																																																																												) {
																																																																																																																													validate12.errors =
																																																																																																																														[
																																																																																																																															{
																																																																																																																																instancePath:
																																																																																																																																	instancePath +
																																																																																																																																	"/text",
																																																																																																																																schemaPath:
																																																																																																																																	"#/properties/text/type",
																																																																																																																																keyword:
																																																																																																																																	"type",
																																																																																																																																params:
																																																																																																																																	{
																																																																																																																																		type: schema14
																																																																																																																																			.properties
																																																																																																																																			.text
																																																																																																																																			.type,
																																																																																																																																	},
																																																																																																																																message:
																																																																																																																																	"must be string,null",
																																																																																																																															},
																																																																																																																														];
																																																																																																																													return false;
																																																																																																																												}
																																																																																																																												var valid0 =
																																																																																																																													_errs249 ===
																																																																																																																													errors;
																																																																																																																											} else {
																																																																																																																												var valid0 = true;
																																																																																																																											}
																																																																																																																											if (
																																																																																																																												valid0
																																																																																																																											) {
																																																																																																																												if (
																																																																																																																													data[
																																																																																																																														"text.accent"
																																																																																																																													] !==
																																																																																																																													undefined
																																																																																																																												) {
																																																																																																																													const data124 =
																																																																																																																														data[
																																																																																																																															"text.accent"
																																																																																																																														];
																																																																																																																													const _errs251 =
																																																																																																																														errors;
																																																																																																																													if (
																																																																																																																														typeof data124 !==
																																																																																																																															"string" &&
																																																																																																																														data124 !==
																																																																																																																															null
																																																																																																																													) {
																																																																																																																														validate12.errors =
																																																																																																																															[
																																																																																																																																{
																																																																																																																																	instancePath:
																																																																																																																																		instancePath +
																																																																																																																																		"/text.accent",
																																																																																																																																	schemaPath:
																																																																																																																																		"#/properties/text.accent/type",
																																																																																																																																	keyword:
																																																																																																																																		"type",
																																																																																																																																	params:
																																																																																																																																		{
																																																																																																																																			type: schema14
																																																																																																																																				.properties[
																																																																																																																																				"text.accent"
																																																																																																																																			]
																																																																																																																																				.type,
																																																																																																																																		},
																																																																																																																																	message:
																																																																																																																																		"must be string,null",
																																																																																																																																},
																																																																																																																															];
																																																																																																																														return false;
																																																																																																																													}
																																																																																																																													var valid0 =
																																																																																																																														_errs251 ===
																																																																																																																														errors;
																																																																																																																												} else {
																																																																																																																													var valid0 = true;
																																																																																																																												}
																																																																																																																												if (
																																																																																																																													valid0
																																																																																																																												) {
																																																																																																																													if (
																																																																																																																														data[
																																																																																																																															"text.disabled"
																																																																																																																														] !==
																																																																																																																														undefined
																																																																																																																													) {
																																																																																																																														const data125 =
																																																																																																																															data[
																																																																																																																																"text.disabled"
																																																																																																																															];
																																																																																																																														const _errs253 =
																																																																																																																															errors;
																																																																																																																														if (
																																																																																																																															typeof data125 !==
																																																																																																																																"string" &&
																																																																																																																															data125 !==
																																																																																																																																null
																																																																																																																														) {
																																																																																																																															validate12.errors =
																																																																																																																																[
																																																																																																																																	{
																																																																																																																																		instancePath:
																																																																																																																																			instancePath +
																																																																																																																																			"/text.disabled",
																																																																																																																																		schemaPath:
																																																																																																																																			"#/properties/text.disabled/type",
																																																																																																																																		keyword:
																																																																																																																																			"type",
																																																																																																																																		params:
																																																																																																																																			{
																																																																																																																																				type: schema14
																																																																																																																																					.properties[
																																																																																																																																					"text.disabled"
																																																																																																																																				]
																																																																																																																																					.type,
																																																																																																																																			},
																																																																																																																																		message:
																																																																																																																																			"must be string,null",
																																																																																																																																	},
																																																																																																																																];
																																																																																																																															return false;
																																																																																																																														}
																																																																																																																														var valid0 =
																																																																																																																															_errs253 ===
																																																																																																																															errors;
																																																																																																																													} else {
																																																																																																																														var valid0 = true;
																																																																																																																													}
																																																																																																																													if (
																																																																																																																														valid0
																																																																																																																													) {
																																																																																																																														if (
																																																																																																																															data[
																																																																																																																																"text.muted"
																																																																																																																															] !==
																																																																																																																															undefined
																																																																																																																														) {
																																																																																																																															const data126 =
																																																																																																																																data[
																																																																																																																																	"text.muted"
																																																																																																																																];
																																																																																																																															const _errs255 =
																																																																																																																																errors;
																																																																																																																															if (
																																																																																																																																typeof data126 !==
																																																																																																																																	"string" &&
																																																																																																																																data126 !==
																																																																																																																																	null
																																																																																																																															) {
																																																																																																																																validate12.errors =
																																																																																																																																	[
																																																																																																																																		{
																																																																																																																																			instancePath:
																																																																																																																																				instancePath +
																																																																																																																																				"/text.muted",
																																																																																																																																			schemaPath:
																																																																																																																																				"#/properties/text.muted/type",
																																																																																																																																			keyword:
																																																																																																																																				"type",
																																																																																																																																			params:
																																																																																																																																				{
																																																																																																																																					type: schema14
																																																																																																																																						.properties[
																																																																																																																																						"text.muted"
																																																																																																																																					]
																																																																																																																																						.type,
																																																																																																																																				},
																																																																																																																																			message:
																																																																																																																																				"must be string,null",
																																																																																																																																		},
																																																																																																																																	];
																																																																																																																																return false;
																																																																																																																															}
																																																																																																																															var valid0 =
																																																																																																																																_errs255 ===
																																																																																																																																errors;
																																																																																																																														} else {
																																																																																																																															var valid0 = true;
																																																																																																																														}
																																																																																																																														if (
																																																																																																																															valid0
																																																																																																																														) {
																																																																																																																															if (
																																																																																																																																data[
																																																																																																																																	"text.placeholder"
																																																																																																																																] !==
																																																																																																																																undefined
																																																																																																																															) {
																																																																																																																																const data127 =
																																																																																																																																	data[
																																																																																																																																		"text.placeholder"
																																																																																																																																	];
																																																																																																																																const _errs257 =
																																																																																																																																	errors;
																																																																																																																																if (
																																																																																																																																	typeof data127 !==
																																																																																																																																		"string" &&
																																																																																																																																	data127 !==
																																																																																																																																		null
																																																																																																																																) {
																																																																																																																																	validate12.errors =
																																																																																																																																		[
																																																																																																																																			{
																																																																																																																																				instancePath:
																																																																																																																																					instancePath +
																																																																																																																																					"/text.placeholder",
																																																																																																																																				schemaPath:
																																																																																																																																					"#/properties/text.placeholder/type",
																																																																																																																																				keyword:
																																																																																																																																					"type",
																																																																																																																																				params:
																																																																																																																																					{
																																																																																																																																						type: schema14
																																																																																																																																							.properties[
																																																																																																																																							"text.placeholder"
																																																																																																																																						]
																																																																																																																																							.type,
																																																																																																																																					},
																																																																																																																																				message:
																																																																																																																																					"must be string,null",
																																																																																																																																			},
																																																																																																																																		];
																																																																																																																																	return false;
																																																																																																																																}
																																																																																																																																var valid0 =
																																																																																																																																	_errs257 ===
																																																																																																																																	errors;
																																																																																																																															} else {
																																																																																																																																var valid0 = true;
																																																																																																																															}
																																																																																																																															if (
																																																																																																																																valid0
																																																																																																																															) {
																																																																																																																																if (
																																																																																																																																	data[
																																																																																																																																		"title_bar.background"
																																																																																																																																	] !==
																																																																																																																																	undefined
																																																																																																																																) {
																																																																																																																																	const data128 =
																																																																																																																																		data[
																																																																																																																																			"title_bar.background"
																																																																																																																																		];
																																																																																																																																	const _errs259 =
																																																																																																																																		errors;
																																																																																																																																	if (
																																																																																																																																		typeof data128 !==
																																																																																																																																			"string" &&
																																																																																																																																		data128 !==
																																																																																																																																			null
																																																																																																																																	) {
																																																																																																																																		validate12.errors =
																																																																																																																																			[
																																																																																																																																				{
																																																																																																																																					instancePath:
																																																																																																																																						instancePath +
																																																																																																																																						"/title_bar.background",
																																																																																																																																					schemaPath:
																																																																																																																																						"#/properties/title_bar.background/type",
																																																																																																																																					keyword:
																																																																																																																																						"type",
																																																																																																																																					params:
																																																																																																																																						{
																																																																																																																																							type: schema14
																																																																																																																																								.properties[
																																																																																																																																								"title_bar.background"
																																																																																																																																							]
																																																																																																																																								.type,
																																																																																																																																						},
																																																																																																																																					message:
																																																																																																																																						"must be string,null",
																																																																																																																																				},
																																																																																																																																			];
																																																																																																																																		return false;
																																																																																																																																	}
																																																																																																																																	var valid0 =
																																																																																																																																		_errs259 ===
																																																																																																																																		errors;
																																																																																																																																} else {
																																																																																																																																	var valid0 = true;
																																																																																																																																}
																																																																																																																																if (
																																																																																																																																	valid0
																																																																																																																																) {
																																																																																																																																	if (
																																																																																																																																		data[
																																																																																																																																			"toolbar.background"
																																																																																																																																		] !==
																																																																																																																																		undefined
																																																																																																																																	) {
																																																																																																																																		const data129 =
																																																																																																																																			data[
																																																																																																																																				"toolbar.background"
																																																																																																																																			];
																																																																																																																																		const _errs261 =
																																																																																																																																			errors;
																																																																																																																																		if (
																																																																																																																																			typeof data129 !==
																																																																																																																																				"string" &&
																																																																																																																																			data129 !==
																																																																																																																																				null
																																																																																																																																		) {
																																																																																																																																			validate12.errors =
																																																																																																																																				[
																																																																																																																																					{
																																																																																																																																						instancePath:
																																																																																																																																							instancePath +
																																																																																																																																							"/toolbar.background",
																																																																																																																																						schemaPath:
																																																																																																																																							"#/properties/toolbar.background/type",
																																																																																																																																						keyword:
																																																																																																																																							"type",
																																																																																																																																						params:
																																																																																																																																							{
																																																																																																																																								type: schema14
																																																																																																																																									.properties[
																																																																																																																																									"toolbar.background"
																																																																																																																																								]
																																																																																																																																									.type,
																																																																																																																																							},
																																																																																																																																						message:
																																																																																																																																							"must be string,null",
																																																																																																																																					},
																																																																																																																																				];
																																																																																																																																			return false;
																																																																																																																																		}
																																																																																																																																		var valid0 =
																																																																																																																																			_errs261 ===
																																																																																																																																			errors;
																																																																																																																																	} else {
																																																																																																																																		var valid0 = true;
																																																																																																																																	}
																																																																																																																																	if (
																																																																																																																																		valid0
																																																																																																																																	) {
																																																																																																																																		if (
																																																																																																																																			data.unreachable !==
																																																																																																																																			undefined
																																																																																																																																		) {
																																																																																																																																			const data130 =
																																																																																																																																				data.unreachable;
																																																																																																																																			const _errs263 =
																																																																																																																																				errors;
																																																																																																																																			if (
																																																																																																																																				typeof data130 !==
																																																																																																																																					"string" &&
																																																																																																																																				data130 !==
																																																																																																																																					null
																																																																																																																																			) {
																																																																																																																																				validate12.errors =
																																																																																																																																					[
																																																																																																																																						{
																																																																																																																																							instancePath:
																																																																																																																																								instancePath +
																																																																																																																																								"/unreachable",
																																																																																																																																							schemaPath:
																																																																																																																																								"#/properties/unreachable/type",
																																																																																																																																							keyword:
																																																																																																																																								"type",
																																																																																																																																							params:
																																																																																																																																								{
																																																																																																																																									type: schema14
																																																																																																																																										.properties
																																																																																																																																										.unreachable
																																																																																																																																										.type,
																																																																																																																																								},
																																																																																																																																							message:
																																																																																																																																								"must be string,null",
																																																																																																																																						},
																																																																																																																																					];
																																																																																																																																				return false;
																																																																																																																																			}
																																																																																																																																			var valid0 =
																																																																																																																																				_errs263 ===
																																																																																																																																				errors;
																																																																																																																																		} else {
																																																																																																																																			var valid0 = true;
																																																																																																																																		}
																																																																																																																																		if (
																																																																																																																																			valid0
																																																																																																																																		) {
																																																																																																																																			if (
																																																																																																																																				data[
																																																																																																																																					"unreachable.background"
																																																																																																																																				] !==
																																																																																																																																				undefined
																																																																																																																																			) {
																																																																																																																																				const data131 =
																																																																																																																																					data[
																																																																																																																																						"unreachable.background"
																																																																																																																																					];
																																																																																																																																				const _errs265 =
																																																																																																																																					errors;
																																																																																																																																				if (
																																																																																																																																					typeof data131 !==
																																																																																																																																						"string" &&
																																																																																																																																					data131 !==
																																																																																																																																						null
																																																																																																																																				) {
																																																																																																																																					validate12.errors =
																																																																																																																																						[
																																																																																																																																							{
																																																																																																																																								instancePath:
																																																																																																																																									instancePath +
																																																																																																																																									"/unreachable.background",
																																																																																																																																								schemaPath:
																																																																																																																																									"#/properties/unreachable.background/type",
																																																																																																																																								keyword:
																																																																																																																																									"type",
																																																																																																																																								params:
																																																																																																																																									{
																																																																																																																																										type: schema14
																																																																																																																																											.properties[
																																																																																																																																											"unreachable.background"
																																																																																																																																										]
																																																																																																																																											.type,
																																																																																																																																									},
																																																																																																																																								message:
																																																																																																																																									"must be string,null",
																																																																																																																																							},
																																																																																																																																						];
																																																																																																																																					return false;
																																																																																																																																				}
																																																																																																																																				var valid0 =
																																																																																																																																					_errs265 ===
																																																																																																																																					errors;
																																																																																																																																			} else {
																																																																																																																																				var valid0 = true;
																																																																																																																																			}
																																																																																																																																			if (
																																																																																																																																				valid0
																																																																																																																																			) {
																																																																																																																																				if (
																																																																																																																																					data[
																																																																																																																																						"unreachable.border"
																																																																																																																																					] !==
																																																																																																																																					undefined
																																																																																																																																				) {
																																																																																																																																					const data132 =
																																																																																																																																						data[
																																																																																																																																							"unreachable.border"
																																																																																																																																						];
																																																																																																																																					const _errs267 =
																																																																																																																																						errors;
																																																																																																																																					if (
																																																																																																																																						typeof data132 !==
																																																																																																																																							"string" &&
																																																																																																																																						data132 !==
																																																																																																																																							null
																																																																																																																																					) {
																																																																																																																																						validate12.errors =
																																																																																																																																							[
																																																																																																																																								{
																																																																																																																																									instancePath:
																																																																																																																																										instancePath +
																																																																																																																																										"/unreachable.border",
																																																																																																																																									schemaPath:
																																																																																																																																										"#/properties/unreachable.border/type",
																																																																																																																																									keyword:
																																																																																																																																										"type",
																																																																																																																																									params:
																																																																																																																																										{
																																																																																																																																											type: schema14
																																																																																																																																												.properties[
																																																																																																																																												"unreachable.border"
																																																																																																																																											]
																																																																																																																																												.type,
																																																																																																																																										},
																																																																																																																																									message:
																																																																																																																																										"must be string,null",
																																																																																																																																								},
																																																																																																																																							];
																																																																																																																																						return false;
																																																																																																																																					}
																																																																																																																																					var valid0 =
																																																																																																																																						_errs267 ===
																																																																																																																																						errors;
																																																																																																																																				} else {
																																																																																																																																					var valid0 = true;
																																																																																																																																				}
																																																																																																																																				if (
																																																																																																																																					valid0
																																																																																																																																				) {
																																																																																																																																					if (
																																																																																																																																						data.warning !==
																																																																																																																																						undefined
																																																																																																																																					) {
																																																																																																																																						const data133 =
																																																																																																																																							data.warning;
																																																																																																																																						const _errs269 =
																																																																																																																																							errors;
																																																																																																																																						if (
																																																																																																																																							typeof data133 !==
																																																																																																																																								"string" &&
																																																																																																																																							data133 !==
																																																																																																																																								null
																																																																																																																																						) {
																																																																																																																																							validate12.errors =
																																																																																																																																								[
																																																																																																																																									{
																																																																																																																																										instancePath:
																																																																																																																																											instancePath +
																																																																																																																																											"/warning",
																																																																																																																																										schemaPath:
																																																																																																																																											"#/properties/warning/type",
																																																																																																																																										keyword:
																																																																																																																																											"type",
																																																																																																																																										params:
																																																																																																																																											{
																																																																																																																																												type: schema14
																																																																																																																																													.properties
																																																																																																																																													.warning
																																																																																																																																													.type,
																																																																																																																																											},
																																																																																																																																										message:
																																																																																																																																											"must be string,null",
																																																																																																																																									},
																																																																																																																																								];
																																																																																																																																							return false;
																																																																																																																																						}
																																																																																																																																						var valid0 =
																																																																																																																																							_errs269 ===
																																																																																																																																							errors;
																																																																																																																																					} else {
																																																																																																																																						var valid0 = true;
																																																																																																																																					}
																																																																																																																																					if (
																																																																																																																																						valid0
																																																																																																																																					) {
																																																																																																																																						if (
																																																																																																																																							data[
																																																																																																																																								"warning.background"
																																																																																																																																							] !==
																																																																																																																																							undefined
																																																																																																																																						) {
																																																																																																																																							const data134 =
																																																																																																																																								data[
																																																																																																																																									"warning.background"
																																																																																																																																								];
																																																																																																																																							const _errs271 =
																																																																																																																																								errors;
																																																																																																																																							if (
																																																																																																																																								typeof data134 !==
																																																																																																																																									"string" &&
																																																																																																																																								data134 !==
																																																																																																																																									null
																																																																																																																																							) {
																																																																																																																																								validate12.errors =
																																																																																																																																									[
																																																																																																																																										{
																																																																																																																																											instancePath:
																																																																																																																																												instancePath +
																																																																																																																																												"/warning.background",
																																																																																																																																											schemaPath:
																																																																																																																																												"#/properties/warning.background/type",
																																																																																																																																											keyword:
																																																																																																																																												"type",
																																																																																																																																											params:
																																																																																																																																												{
																																																																																																																																													type: schema14
																																																																																																																																														.properties[
																																																																																																																																														"warning.background"
																																																																																																																																													]
																																																																																																																																														.type,
																																																																																																																																												},
																																																																																																																																											message:
																																																																																																																																												"must be string,null",
																																																																																																																																										},
																																																																																																																																									];
																																																																																																																																								return false;
																																																																																																																																							}
																																																																																																																																							var valid0 =
																																																																																																																																								_errs271 ===
																																																																																																																																								errors;
																																																																																																																																						} else {
																																																																																																																																							var valid0 = true;
																																																																																																																																						}
																																																																																																																																						if (
																																																																																																																																							valid0
																																																																																																																																						) {
																																																																																																																																							if (
																																																																																																																																								data[
																																																																																																																																									"warning.border"
																																																																																																																																								] !==
																																																																																																																																								undefined
																																																																																																																																							) {
																																																																																																																																								const data135 =
																																																																																																																																									data[
																																																																																																																																										"warning.border"
																																																																																																																																									];
																																																																																																																																								const _errs273 =
																																																																																																																																									errors;
																																																																																																																																								if (
																																																																																																																																									typeof data135 !==
																																																																																																																																										"string" &&
																																																																																																																																									data135 !==
																																																																																																																																										null
																																																																																																																																								) {
																																																																																																																																									validate12.errors =
																																																																																																																																										[
																																																																																																																																											{
																																																																																																																																												instancePath:
																																																																																																																																													instancePath +
																																																																																																																																													"/warning.border",
																																																																																																																																												schemaPath:
																																																																																																																																													"#/properties/warning.border/type",
																																																																																																																																												keyword:
																																																																																																																																													"type",
																																																																																																																																												params:
																																																																																																																																													{
																																																																																																																																														type: schema14
																																																																																																																																															.properties[
																																																																																																																																															"warning.border"
																																																																																																																																														]
																																																																																																																																															.type,
																																																																																																																																													},
																																																																																																																																												message:
																																																																																																																																													"must be string,null",
																																																																																																																																											},
																																																																																																																																										];
																																																																																																																																									return false;
																																																																																																																																								}
																																																																																																																																								var valid0 =
																																																																																																																																									_errs273 ===
																																																																																																																																									errors;
																																																																																																																																							} else {
																																																																																																																																								var valid0 = true;
																																																																																																																																							}
																																																																																																																																						}
																																																																																																																																					}
																																																																																																																																				}
																																																																																																																																			}
																																																																																																																																		}
																																																																																																																																	}
																																																																																																																																}
																																																																																																																															}
																																																																																																																														}
																																																																																																																													}
																																																																																																																												}
																																																																																																																											}
																																																																																																																										}
																																																																																																																									}
																																																																																																																								}
																																																																																																																							}
																																																																																																																						}
																																																																																																																					}
																																																																																																																				}
																																																																																																																			}
																																																																																																																		}
																																																																																																																	}
																																																																																																																}
																																																																																																															}
																																																																																																														}
																																																																																																													}
																																																																																																												}
																																																																																																											}
																																																																																																										}
																																																																																																									}
																																																																																																								}
																																																																																																							}
																																																																																																						}
																																																																																																					}
																																																																																																				}
																																																																																																			}
																																																																																																		}
																																																																																																	}
																																																																																																}
																																																																																															}
																																																																																														}
																																																																																													}
																																																																																												}
																																																																																											}
																																																																																										}
																																																																																									}
																																																																																								}
																																																																																							}
																																																																																						}
																																																																																					}
																																																																																				}
																																																																																			}
																																																																																		}
																																																																																	}
																																																																																}
																																																																															}
																																																																														}
																																																																													}
																																																																												}
																																																																											}
																																																																										}
																																																																									}
																																																																								}
																																																																							}
																																																																						}
																																																																					}
																																																																				}
																																																																			}
																																																																		}
																																																																	}
																																																																}
																																																															}
																																																														}
																																																													}
																																																												}
																																																											}
																																																										}
																																																									}
																																																								}
																																																							}
																																																						}
																																																					}
																																																				}
																																																			}
																																																		}
																																																	}
																																																}
																																															}
																																														}
																																													}
																																												}
																																											}
																																										}
																																									}
																																								}
																																							}
																																						}
																																					}
																																				}
																																			}
																																		}
																																	}
																																}
																															}
																														}
																													}
																												}
																											}
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		} else {
			validate12.errors = [
				{
					instancePath,
					schemaPath: "#/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
				},
			];
			return false;
		}
	}
	validate12.errors = vErrors;
	return errors === 0;
}
function validate11(
	data,
	{ instancePath = "", parentData, parentDataProperty, rootData = data } = {},
) {
	let vErrors = null;
	let errors = 0;
	if (errors === 0) {
		if (data && typeof data == "object" && !Array.isArray(data)) {
			let missing0;
			if (
				(data.appearance === undefined && (missing0 = "appearance")) ||
				(data.name === undefined && (missing0 = "name")) ||
				(data.style === undefined && (missing0 = "style"))
			) {
				validate11.errors = [
					{
						instancePath,
						schemaPath: "#/required",
						keyword: "required",
						params: { missingProperty: missing0 },
						message: "must have required property '" + missing0 + "'",
					},
				];
				return false;
			} else {
				const _errs1 = errors;
				for (const key0 in data) {
					if (!(key0 === "appearance" || key0 === "name" || key0 === "style")) {
						validate11.errors = [
							{
								instancePath,
								schemaPath: "#/additionalProperties",
								keyword: "additionalProperties",
								params: { additionalProperty: key0 },
								message: "must NOT have additional properties",
							},
						];
						return false;
						break;
					}
				}
				if (_errs1 === errors) {
					if (data.appearance !== undefined) {
						const data0 = data.appearance;
						const _errs2 = errors;
						if (typeof data0 !== "string") {
							validate11.errors = [
								{
									instancePath: instancePath + "/appearance",
									schemaPath: "#/definitions/AppearanceContent/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string",
								},
							];
							return false;
						}
						if (!(data0 === "light" || data0 === "dark")) {
							validate11.errors = [
								{
									instancePath: instancePath + "/appearance",
									schemaPath: "#/definitions/AppearanceContent/enum",
									keyword: "enum",
									params: { allowedValues: schema13.enum },
									message: "must be equal to one of the allowed values",
								},
							];
							return false;
						}
						var valid0 = _errs2 === errors;
					} else {
						var valid0 = true;
					}
					if (valid0) {
						if (data.name !== undefined) {
							const _errs5 = errors;
							if (typeof data.name !== "string") {
								validate11.errors = [
									{
										instancePath: instancePath + "/name",
										schemaPath: "#/properties/name/type",
										keyword: "type",
										params: { type: "string" },
										message: "must be string",
									},
								];
								return false;
							}
							var valid0 = _errs5 === errors;
						} else {
							var valid0 = true;
						}
						if (valid0) {
							if (data.style !== undefined) {
								const _errs7 = errors;
								if (
									!validate12(data.style, {
										instancePath: instancePath + "/style",
										parentData: data,
										parentDataProperty: "style",
										rootData,
									})
								) {
									vErrors =
										vErrors === null
											? validate12.errors
											: vErrors.concat(validate12.errors);
									errors = vErrors.length;
								}
								var valid0 = _errs7 === errors;
							} else {
								var valid0 = true;
							}
						}
					}
				}
			}
		} else {
			validate11.errors = [
				{
					instancePath,
					schemaPath: "#/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
				},
			];
			return false;
		}
	}
	validate11.errors = vErrors;
	return errors === 0;
}
function validate10(
	data,
	{ instancePath = "", parentData, parentDataProperty, rootData = data } = {},
) {
	/*# sourceURL="https://github.com/zed-industries/extensions/blob/main/schemas/theme-family.json" */
	let vErrors = null;
	let errors = 0;
	if (errors === 0) {
		if (data && typeof data == "object" && !Array.isArray(data)) {
			let missing0;
			if (
				(data.author === undefined && (missing0 = "author")) ||
				(data.name === undefined && (missing0 = "name")) ||
				(data.themes === undefined && (missing0 = "themes"))
			) {
				validate10.errors = [
					{
						instancePath,
						schemaPath: "#/required",
						keyword: "required",
						params: { missingProperty: missing0 },
						message: "must have required property '" + missing0 + "'",
					},
				];
				return false;
			} else {
				if (data.author !== undefined) {
					const _errs1 = errors;
					if (typeof data.author !== "string") {
						validate10.errors = [
							{
								instancePath: instancePath + "/author",
								schemaPath: "#/properties/author/type",
								keyword: "type",
								params: { type: "string" },
								message: "must be string",
							},
						];
						return false;
					}
					var valid0 = _errs1 === errors;
				} else {
					var valid0 = true;
				}
				if (valid0) {
					if (data.name !== undefined) {
						const _errs3 = errors;
						if (typeof data.name !== "string") {
							validate10.errors = [
								{
									instancePath: instancePath + "/name",
									schemaPath: "#/properties/name/type",
									keyword: "type",
									params: { type: "string" },
									message: "must be string",
								},
							];
							return false;
						}
						var valid0 = _errs3 === errors;
					} else {
						var valid0 = true;
					}
					if (valid0) {
						if (data.themes !== undefined) {
							const data2 = data.themes;
							const _errs5 = errors;
							if (errors === _errs5) {
								if (Array.isArray(data2)) {
									var valid1 = true;
									const len0 = data2.length;
									for (let i0 = 0; i0 < len0; i0++) {
										const _errs7 = errors;
										if (
											!validate11(data2[i0], {
												instancePath: instancePath + "/themes/" + i0,
												parentData: data2,
												parentDataProperty: i0,
												rootData,
											})
										) {
											vErrors =
												vErrors === null
													? validate11.errors
													: vErrors.concat(validate11.errors);
											errors = vErrors.length;
										}
										var valid1 = _errs7 === errors;
										if (!valid1) {
											break;
										}
									}
								} else {
									validate10.errors = [
										{
											instancePath: instancePath + "/themes",
											schemaPath: "#/properties/themes/type",
											keyword: "type",
											params: { type: "array" },
											message: "must be array",
										},
									];
									return false;
								}
							}
							var valid0 = _errs5 === errors;
						} else {
							var valid0 = true;
						}
					}
				}
			}
		} else {
			validate10.errors = [
				{
					instancePath,
					schemaPath: "#/type",
					keyword: "type",
					params: { type: "object" },
					message: "must be object",
				},
			];
			return false;
		}
	}
	validate10.errors = vErrors;
	return errors === 0;
}
