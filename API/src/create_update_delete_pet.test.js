import PETAPI from '../helpers/api/PetStoreAPI'
import { petBody } from '../helpers/testData/petshopData'
import test from 'ava'

let petID = ''
const PSA = new PETAPI()
const responseProperties = Object.keys(petBody)
const delay = require('delay')

test.serial('Create a new pet', async t => {
  const createResponse = await PSA.createPet('special-key', petBody)
  t.is(createResponse.status, 200, `Expected response status to be 200, but recieved status: ${createResponse.status} - ${createResponse.statusText}\nWith data: ${JSON.stringify(createResponse.data)}\nAnd with config: ${JSON.stringify(createResponse.config)}`)
  petID = createResponse.data.id
  t.regex(createResponse.data.id.toString(), /(\d){5}/, `Expected pet ID to be a random number with 5 or more digits (because why not?) but got ${createResponse.data.id}`)
  responseProperties.forEach(property => {
    t.is(JSON.stringify(createResponse.data[property]), JSON.stringify(petBody[property]), `Expected response property: "${property}" to be equal in original body and response from api, but recieved: \n${JSON.stringify(createResponse.data[property])} \nfrom response and\n${JSON.stringify(petBody[property])}\nfrom original body , \nWith response data: ${JSON.stringify(createResponse.data)}\nAnd with config: ${JSON.stringify(createResponse.config)}`)
  })
})

test.serial('Verify pet from get endpoint', async t => {
  await delay(1000)
  let getResponse = await PSA.getPet('special-key', petID)
  // poll get endpoint as it returns 404 on some calls
  let i = 0
  while (i < 5 && getResponse.status !== 200) {
    if (getResponse.status !== 200) {
      getResponse = await PSA.getPet('special-key', petID)
    }
    i++
  }
  t.is(getResponse.status, 200, `Expected response status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  responseProperties.forEach(property => {
    t.is(JSON.stringify(getResponse.data[property]), JSON.stringify(petBody[property]), `Expected response property: "${property}" to be equal in original body and response from api, but recieved: \n${JSON.stringify(getResponse.data[property])} \nfrom response and\n${JSON.stringify(petBody[property])}\nfrom original body , \nWith response data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  })
})

test.serial('Update created pet', async t => {
  petBody.tags[0] = {"id": 13, "name": "hound"};
  const createResponse = await PSA.updatePet('special-key', petBody)
  t.is(createResponse.status, 200, `Expected response status to be 200, but recieved status: ${createResponse.status} - ${createResponse.statusText}\nWith data: ${JSON.stringify(createResponse.data)}\nAnd with config: ${JSON.stringify(createResponse.config)}`)
  t.regex(createResponse.data.id.toString(), /(\d){5}/, `Expected pet ID to be a random number with 5 or more digits (because why not?) but got ${createResponse.data.id}`)
  responseProperties.forEach(property => {
    t.is(JSON.stringify(createResponse.data[property]), JSON.stringify(petBody[property]), `Expected response property: "${property}" to be equal in original body and response from api, but recieved: \n${JSON.stringify(createResponse.data[property])} \nfrom response and\n${JSON.stringify(petBody[property])}\nfrom original body , \nWith response data: ${JSON.stringify(createResponse.data)}\nAnd with config: ${JSON.stringify(createResponse.config)}`)
  })
})

test.serial('Verify pet from get endpoint after update', async t => {
  await delay(1000)
  let getResponse = await PSA.getPet('special-key', petID)
  // poll get endpoint as it returns 404 on some calls
  let i = 0
  while (i < 5 && getResponse.status !== 200) {
    if (getResponse.status !== 200) {
      getResponse = await PSA.getPet('special-key', petID)
    }
    i++
  }
  console.log("after update",getResponse.data);
  t.is(getResponse.status, 200, `Expected response status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  responseProperties.forEach(property => {
    t.is(JSON.stringify(getResponse.data[property]), JSON.stringify(petBody[property]), `Expected response property: "${property}" to be equal in original body and response from api, but recieved: \n${JSON.stringify(getResponse.data[property])} \nfrom response and\n${JSON.stringify(petBody[property])}\nfrom original body , \nWith response data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  })
})

test.serial('Delete pet', async t => {
  await delay(1000)
  let deleteResponse = await PSA.deletePet('special-key', petID)
  // poll delete endpoint as it returns 404 on some calls
  let i = 0
  while (i < 5 && deleteResponse.status !== 200) {
    if (deleteResponse.status !== 200) {
      deleteResponse = await PSA.deletePet('special-key', petID)
    }
    i++
  }
  t.is(deleteResponse.status, 200, `Expected response status to be 200, but recieved status: ${deleteResponse.status} - ${deleteResponse.statusText}\nWith data: ${JSON.stringify(deleteResponse.data)}\nAnd with config: ${JSON.stringify(deleteResponse.config)}`)
  t.is(deleteResponse.data.code, 200, `Expected code status to be 200, but recieved status: ${deleteResponse.status} - ${deleteResponse.statusText}\nWith data: ${JSON.stringify(deleteResponse.data)}\nAnd with config: ${JSON.stringify(deleteResponse.config)}`)
  t.is(deleteResponse.data.type, 'unknown', `Expected type status to be 200, but recieved status: ${deleteResponse.status} - ${deleteResponse.statusText}\nWith data: ${JSON.stringify(deleteResponse.data)}\nAnd with config: ${JSON.stringify(deleteResponse.config)}`)
  t.regex(deleteResponse.data.message, /(\d).*/, `Expected message status to be 200, but recieved status: ${deleteResponse.status} - ${deleteResponse.statusText}\nWith data: ${JSON.stringify(deleteResponse.data)}\nAnd with config: ${JSON.stringify(deleteResponse.config)}`)
})

test.serial('Verify pet is deleted', async t => {
  await delay(1000)
  const getResponse = await PSA.getPet('special-key', petID)
  t.is(getResponse.status, 404, `Expected response status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  t.is(getResponse.data.code, 1, `Expected code status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  t.is(getResponse.data.type, 'error', `Expected type status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
  t.is(getResponse.data.message, 'Pet not found', `Expected message status to be 200, but recieved status: ${getResponse.status} - ${getResponse.statusText}\nWith data: ${JSON.stringify(getResponse.data)}\nAnd with config: ${JSON.stringify(getResponse.config)}`)
})
