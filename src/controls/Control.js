import ol from 'ol'
import { mixin } from '../utilities'
import {ControlLogicMixin} from './ControlLogicMixin'

/**
 * @typedef {object} g4uControlOptions
 * @property {string} [controlType] the type of the control. If not given the name of the control is used
 * @property {number} [importance] how important the control is on the map. the higher this value is, the longer it
 *    will be kept on the map if the viewport gets smaller.
 * @property {string} [activeGroup] if controls are in the same active group only one of them can be active at the same
 *    time
 * @property {string} [className]
 * @property {HTMLElement} element
 * @property {L10N} localiser the localiser to use by the control.
 * @property {string} controlName the name of the control.
 * @property {boolean} [singleButton=false] if the control only consists of one button
 * @property {String|HTMLElement|jQuery} [target]
 * @property {Localizable} [title] not used by every control
 * @property {Localizable} [tipLabel] not used by every control
 * @property {Float} [float]
 * @property {boolean} [windowed=false] whether the control resides inside a window or not
 */

/**
 * This is a customized ol.control.Control class, all logic is in the ol.control.ControlLogic
 * @class Control
 * @extends {ControlLogicMixin}
 * @extends {ol.control.Control}
 */

export const Control = mixin(ol.control.Control, ControlLogicMixin)
