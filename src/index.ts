import { setAttributes } from './utils';
import { BootstrapThreeMenuInterface, setBcMenu } from './interfaces';

class BootstrapThreeMenu implements BootstrapThreeMenuInterface {

  private _navbarCollapse: Element;
  private _navBarLists: NodeListOf<Element>;
  private _navBarListsItems: NodeListOf<Element>;
  private hover: boolean;

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
   * Set Dropdown for
   * @param listItems
   * @private
   */

  private _setListItems(listItems): void {
    for (const listItem of listItems) {
      const lic = listItem.children;
      const lip = listItem.parentElement;

      // Hover Style
      const selector = `#${this._navbarCollapse.getAttribute('id')}` || `.${this._navbarCollapse.getAttribute('class')}`;

      // Set Anchor Attributes
      if (listItem.classList.contains('dropdown')) {
        if (this.hover) {
          // Add Style Tag to head if it does not exist in order to activate hover
          if (document.getElementById('bs-menu-style') === null) {
            document.head.insertAdjacentHTML('beforeend', `
              <style id="bc-bootstrap-menu">
                ${selector} .dropdown:hover > .dropdown-menu {
                  display: block;
                }
              </style>
            `);
          }

        } else {
          // Add Click Toggle
          lic[0].classList.add('dropdown-toggle');
          setAttributes(lic[0], {
            'data-toggle': 'dropdown',
            'role': 'button',
            'aria-haspopup': true,
            'aria-expanded': false
          });
        }

        // Add Caret
        lic[0].innerHTML += `&nbsp;<span class="caret"></span>`;
      }

      // Set Active Link attrs
      if (lic[0].href === window.location.pathname) {
        lip.classList.add('active');
        lic[0].innerHTML += `&nbsp;<span class="sr-only">(current)</span>`
      }
    }
  }

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

  init() {
    this._setLists(this._navBarLists);
    this._setListItems(this._navBarListsItems);
  }

}

var global = window || global;
global.setBcMenu = setBcMenu;
global.BootstrapThreeMenu = BootstrapThreeMenu;