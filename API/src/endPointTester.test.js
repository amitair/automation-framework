const test = require("ava");
const endPointApi = require("../helpers/api/endpointApi");
const { getMinBody } = require("../helpers/testData/body");

test.serial("test create endpoint", async t => {
  const response = endPointApi.postSample(getMinBody);
  console.log(response);
  t.is(response.status, 200, `Expected response to be 200 but received ${response.status}`);
});

test.serial("test get all endpoint", async t => {
  const response = endPointApi.getSample(getMinBody);
  console.log(response);
  t.is(response.status, 200, `Expected response to be 200 but received ${response.status}`);
  t.is(response.data.id, getMinBody.id, `Expected response id to be ${getMinBody.id} but received ${response.data.id}`);
});
