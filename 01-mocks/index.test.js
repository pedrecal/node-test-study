const { error } = require("./src/constants");
const File = require("./src/file");
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItemsFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJson(filePath);

    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItemsFile-valid.csv";
    const result = await File.csvToJson(filePath);

    const expected = [
      {
        name: "Alexandre Pedrecal",
        id: 123,
        profession: "Software Engineer",
        birthDay: 1997,
      },
      {
        name: "Valter Campos",
        id: 124,
        profession: "Barber",
        birthDay: 1970,
      },
      {
        name: "Indaiá Pedrecal",
        id: 125,
        profession: "Social Worker",
        birthDay: 1971,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
