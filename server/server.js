//*============ IMPORTS ============*//
const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();
const port = 8000;
//
//
//*============ CREATE FAKER DATA ============*//
const fakeFirstName = faker.name.firstName();
const fakeLastName = faker.name.lastName();
//*---- USER ----
const createUser = () => {
  const newFake = {
    _id: faker.datatype.uuid(),
    firstName: fakeFirstName,
    lastName: fakeLastName,
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(
      fakeFirstName,
      fakeLastName,
      fakeLastName + "." + faker.internet.domainSuffix()
    ),
    password: faker.internet.password(),
  };
  return newFake;
};

//*---- COMPANY ----
const createCompany = () => {
  const fakeState = faker.address.stateAbbr();
  const newFake = {
    _id: faker.datatype.uuid(),
    companyName: fakeLastName + " " + faker.company.companySuffix(),
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: fakeState,
    zipCode: faker.address.zipCodeByState(fakeState),
    country: "United States",
  };
  return newFake;
};

//
//
//*============ API ROUTES ============*//
app.get("/api/users/new", (req, res) => {
  res.json(createUser());
});

app.get("/api/companies/new", (req, res) => {
  res.json(createCompany());
});

app.get("/api/user/company", (req, res) => {
  res.json({
    user: createUser(),
    company: createCompany(),
  });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
