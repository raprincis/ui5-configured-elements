/**
 * @typedef {object} ValueHelpColumnConfiguration
 * @property {string} name
 * @property {string} label
 * @property {string} template
 * @property {string|undefined} width
 */

/**
 * @typedef {object} ValueHelpConfiguration
 * @property {string} key
 * @property {boolean} supportMultiselect
 * @property {object} binding // List Binding
 * @property {ValueHelpColumnConfiguration[]} columns
 */