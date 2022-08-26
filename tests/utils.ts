import { parseHTML } from "linkedom";

export const getDOM = () =>
  parseHTML(`
    <!doctype html>
    <html lang="en">
      <head>
        <title>Hello SSR</title>
      </head>
      <body></body>
    </html>
  `);
