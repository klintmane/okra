import { test } from "uvu";
import * as assert from "uvu/assert";

import { h } from "../../packages/okra";
import { render } from "../../packages/okra-dom";
import { getDOM } from "../utils";

test("should render div", () => {
  const { document } = getDOM();
  const comp = <div className="hello"></div>;

  render(comp, document.body);

  assert.is(document.body.innerHTML, "<div></div>");
});

test.run();
