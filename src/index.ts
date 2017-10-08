import { setAttributes } from './utils';
import { BootstrapThreeMenuInterface, setBcMenu } from './interfaces';

class BootstrapThreeMenu implements BootstrapThreeMenuInterface {

  private _navbarCollapse: Element;
  private _navBarLists: NodeListOf<Element>;
  private _navBarListsItems: NodeListOf<Element>;
  private hover: boolean;

  /**
   * Constructor
   * @param {string} element
   * @param {boolean} hover
   */

  constructor(element: string, hover: boolean) {
    this._navbarCollapse = document.querySelector(element);
    this._navBarLists = document.querySelectorAll(`${element} ul`);
    this._navBarListsItems = document.querySelectorAll(`${element} ul li`);

    this.hover = hover;

    this.init();
  }

  /**
   * Initate build functions
   */
  public init() {
    this._setLists(this._navBarLists);
    this._setListItems(this._navBarListsItems);

    window.onresize = () => this._setListItems(this._navBarListsItems);
  }

  /**
   * Add toggle attributes to menu.
   * @param {Element} el
   * @private
   */
  private _setToggle(el: Element) {
    el.classList.add('dropdown-toggle');
    setAttributes(el, {
      'aria-expanded': false,
      'aria-haspopup': true,
      'data-toggle': 'dropdown',
      'role': 'button',
    });
  }

  /**
   * Determine what settings to use on device.
   * @param el
   * @private
   */
  private _determineDeviceSettings(el) {
    if (this.hover && window.innerWidth < 1200) {
      // Add Click Toggle and remove hover style if it exists.
      if (document.getElementById('bc-bootstrap-menu')) {
        document.getElementById('bc-bootstrap-menu').remove();
      }
      this._setToggle(el);
    } else if (this.hover && window.innerWidth > 1200) {
      this._addHoverStyle();
    } else {
      this._setToggle(el);
    }
  }

  /**
   * Add Css Styles in order to make menus show on hover.
   * @private
   */
  private _addHoverStyle() {
    // Hover Style
    const selector = `#${this._navbarCollapse.getAttribute('id')}` || `.${this._navbarCollapse.getAttribute('class')}`;
    // Add Style Tag to head if it does not exist in order to activate hover
    if (document.getElementById('bc-bootstrap-menu') === null) {
      document.head.insertAdjacentHTML('beforeend', `
              <style id="bc-bootstrap-menu">
                ${selector} .dropdown:hover > .dropdown-menu {
                  display: block;
                }
              </style>
            `);
    }
  }

  /**
   * Assign right classes for top level lists and dropdown lists
   * @param lists
   * @private
   */
  private _setLists(lists): void {
    for (const list of lists) {
      if (list.parentElement === this._navbarCollapse) {
        list.classList.add('nav', 'navbar-nav');
      } else if (list.parentNode.tagName === 'LI') {
        list.classList.add('dropdown-menu');
        list.parentNode.classList.add('dropdown');
      }
    }
  }

  /**
   * Set Dropdown for list items
   * @param listItems
   * @private
   */
  private _setListItems(listItems): void {
    for (const listItem of listItems) {
      const lic = listItem.children;
      const lip = listItem.parentElement;

      // Set Anchor Attributes
      if (listItem.classList.contains('dropdown')) {
        // Determine if it should have click toggle or hover
        this._determineDeviceSettings(lic[0]);

        // Add caret if it ddoes have one.
        const caret = lic[0].querySelector('span.caret');
        if (caret === null) {
          lic[0].innerHTML += `&nbsp;<span class="caret"></span>`;
        }
      }

      // Set Active Link attrs
      if (lic[0].href === window.location.pathname) {
        lip.classList.add('active');
        lic[0].innerHTML += `&nbsp;<span class="sr-only">(current)</span>`;
      }
    }
  }
}

var global = window || global;
global.setBcMenu = setBcMenu;
global.BootstrapThreeMenu = BootstrapThreeMenu;