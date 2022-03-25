import endPointApi from "../helpers/api/endpointApi";
const test = require("ava");
const { getMinBody } = require("../helpers/testData/body");

const ep = new endPointApi();
test.serial.skip("test create endpoint", async t => {
  const response = await ep.postSample(getMinBody);
  console.log(response);
  t.is(response.status, 200, `Expected response to be 200 but received ${response.status}`);
});

test.serial.skip("test get all endpoint", async t => {
  const response = await ep.getSample(getMinBody);
  console.log(response);
  t.is(response.status, 200, `Expected response to be 200 but received ${response.status}`);
  t.is(response.data.id, getMinBody.id, `Expected response id to be ${getMinBody.id} but received ${response.data.id}`);
});

test.serial("test pic", async t => {
  const response = await ep.getNasa(getMinBody);
  console.log(response);
  t.is(response.status, 200, `Expected response to be 200 but received ${response.status}`);
  t.is(response.data.id, getMinBody.id, `Expected response id to be ${getMinBody.id} but received ${response.data.id}`);
});
