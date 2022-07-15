const db = require("./database");

beforeAll(async () => {
  try {
    console.log("tryin got sync db");
    await db.sequelize.sync();
    console.log("after db sync");
  } catch (err) {
    console.table(
      "🚀 ~ file: database.test.js ~ line 9 ~ beforeAll ~ err",
      err
    );
    console.error("failed to sync db");
  }
});

test("create person", async () => {
  expect.assertions(1);
  const person = await db.Person.create({
    id: 1,
    firstName: "Sammy",
    lastName: "Davis Jr.",
    email: "sammy@example.com"
  });
  expect(person.id).toEqual(1);
});

test("get person", async () => {
  expect.assertions(2);
  const person = await db.Person.findByPk(1);
  expect(person.firstName).toEqual("Sammy");
  expect(person.lastName).toEqual("Davis Jr.");
});

test("delete person", async () => {
  expect.assertions(1);
  await db.Person.destroy({
    where: {
      id: 1
    }
  });
  const person = await db.Person.findByPk(1);
  expect(person).toBeNull();
});

afterAll(async () => {
  await db.sequelize.close();
});
