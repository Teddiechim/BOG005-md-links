const { mdLinks } = require("../index.js");
const { linksArray } = require("./test.js");

describe("mdLinks", () => {
  it("mdLinks returns an array of objects with the links of the directory", async () => {
    const path = await mdLinks("./archivos");
    console.log(path);
    expect(path).toEqual(linksArray);
  });
});
