import { LitElement, html, customElement, css } from 'lit-element';

@customElement('todo-view')
class TodoView extends LitElement {
  static get styles() {
    return css`
      p {
        color: red;
      }
    `
  }
  render() {
    return html`
      <p>todo-view</p>
    `;
  }
}