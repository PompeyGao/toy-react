import { createElement, Component, render } from "./toy-react";

class DemoComponent extends Component{
  render() {
    return (
      <div>
        <h1>demo</h1>
        {this.children}
      </div>
    );
  }
}

render(
  <DemoComponent id="1" class="cls">
    <div>111</div>
    <div>
      <a>222</a>
    </div>
    <div></div>
  </DemoComponent>,
  document.body
);
