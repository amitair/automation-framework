import faker from "faker/locale/en";
import moment, { utc } from "moment";
import { generateUpc } from "../util/commonFunctions";
import csvjson from "csvtojson";
import papa from "papaparse";

const delay = require("delay");
const fse = require("fs-extra");
const JSONToCSV = require("json2csv").parse;
const json2xls = require("json2xls");

// accepts JSON and key value pair, and returns updated JSON value
function changeValue(jsonObj, keyName, keyValue) {
  jsonObj[keyName] = keyValue;
  return jsonObj;
};

function shuffleProducts(products, isShuffle) {
  if (isShuffle === "true") {
    for (let i = products.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [products[i], products[j]] = [products[j], products[i]];
    }
  }
};

function getCsvJsonData(csvFile) {
  if (csvFile.includes("/")) {
    return csvjson().fromFile(csvFile);
  } else {
    return csvjson().fromString(csvFile);
  }
}

async function getJsonToCsvData(jsonObj, outputFile) {
  const csv = JSONToCSV(jsonObj, { quote: "" });
  fse.writeFileSync(outputFile, csv);
}

async function getJsonToXlsData(jsonObj, outputFile) {
  const xls = json2xls(jsonObj);
  fse.writeFileSync(outputFile, xls, "binary");
}

async function updateSFPSalesOrderFields(jsonObj, outputFile) {
  // const csvJsonArray = await getCsvJsonData(inputFile);
  // csvJsonArray.forEach((element) => {
  //   element.salesOrderNumber = `${faker.datatype.number({ "min": 101, "max": 999 })}-${faker.datatype.number({ "min": 1000001, "max": 9999999 })}-${faker.datatype.number({ "min": 1000001, "max": 9999999 })}`;
  //   element.customerOrderType = "PRI";
  //   element.customerSku = faker.random.alphaNumeric(50);
  // });
  jsonObj["salesOrderNumber"] = `${faker.datatype.number({ "min": 101, "max": 999 })}-${faker.datatype.number({ "min": 1000001, "max": 9999999 })}-${faker.datatype.number({ "min": 1000001, "max": 9999999 })}`;
  jsonObj["customerOrderType"] = "PRI";
  jsonObj["customerSku"] = faker.random.alphaNumeric(50);

  const csv = JSONToCSV(jsonObj, { quote: "" });
  fse.writeFileSync(outputFile, csv);
}

// updates overwrite all values for a key
async function updateColumnValue(jsonObj, outputFile, columnName, columnValue) {
  // const csvJsonArray = await getCsvJsonData(inputFile);
  // csvJsonArray.forEach((element) => {
  //   element.salesOrderNumber = `TEST-A-${faker.random.alphaNumeric(23)}`;
  //   element.purchaseOrderNumber = `TEST-A-PO-${faker.random.alphaNumeric(20)}`;
  //   element[columnName] = columnValue;
  // });

  const csv = JSONToCSV(jsonObj, { quote: "" });
  fse.writeFileSync(outputFile, csv);
}

// updates referenceids to unique numbers in csv file and accepts string to remove the header from file
async function updateSalesOrderNumberAndDeleteHeader(inputFile, outputFile, headers, ...deletedHeaders) {
  let myCsv = await fse.readFileSync(inputFile, "utf8");
  const csvJsonArray = await getCsvJsonData(myCsv);
  csvJsonArray.forEach((element) => {
    element.salesOrderNumber = `TEST-A-${faker.random.alphaNumeric(23)}`;
    element.purchaseOrderNumber = `TEST-A-PO-${faker.random.alphaNumeric(20)}`;
  });
  myCsv = JSONToCSV(csvJsonArray, {
    headers,
    quote: ""
  });
  for (let i = 0; i < deletedHeaders.length; i++) {
    myCsv = myCsv.replace(deletedHeaders[i], "");
  }
  fse.writeFileSync(outputFile, myCsv);
}

// updates referenceids to unique numbers in csv file and accepts string for key item to delete entire column
async function updateCsvAndDeleteColumn(inputFile, outputFile, headers, ...deletedColumns) {
  const csvJsonArray = await getCsvJsonData(inputFile);
  csvJsonArray.forEach((element) => {
    element.salesOrderNumber = `TEST-A-${faker.random.alphaNumeric(23)}`;
    element.purchaseOrderNumber = `TEST-A-PO-${faker.random.alphaNumeric(20)}`;
    for (let i = 0; i < deletedColumns.length; i++) {
      delete element[deletedColumns[i]];
    }
  });
  const csv = await JSONToCSV(csvJsonArray, {
    headers,
    quote: ""
  });
  fse.writeFileSync(outputFile, csv);
}

// updates referenceids to unique numbers in csv file and accepts string for key item to delete all values for that column
async function updateCsvAndDeleteValues(inputFile, outputFile, headers, ...deletedValues) {
  let myCsv = await fse.readFileSync(inputFile, "utf8");
  const valueToDelete = [];
  const csvJsonArray = await getCsvJsonData(inputFile);
  csvJsonArray.forEach((element) => {
    element.salesOrderNumber = `TEST-A-${faker.random.alphaNumeric(23)}`;
    element.purchaseOrderNumber = `TEST-A-PO-${faker.random.alphaNumeric(20)}`;
    for (let i = 0; i < deletedValues.length; i++) {
      valueToDelete[i] = element[deletedValues[i]];
    }
  });
  myCsv = JSONToCSV(csvJsonArray, {
    headers,
    quote: ""
  });
  for (let i = 0; i < deletedValues.length; i++) {
    if (deletedValues[i] === "unit_quantity") {
      valueToDelete[i] = "," + valueToDelete[i] + ",";
      myCsv = myCsv.replace(valueToDelete[i], ",,");
    }
    myCsv = myCsv.replace(valueToDelete[i], "");
  }
  fse.writeFileSync(outputFile, myCsv);
}

function getSalesOrderNumber(csvFile) {
  const myCSV = fse.readFileSync(csvFile, "UTF-8");
  const soNumber = papa.parse(myCSV).data[1][0];
  return soNumber.toUpperCase();
}

export {
  changeValue,
  shuffleProducts,
  getCsvJsonData,
  getJsonToCsvData,
  getJsonToXlsData,
  updateColumnValue,
  updateSFPSalesOrderFields,
  updateSalesOrderNumberAndDeleteHeader,
  updateCsvAndDeleteColumn,
  updateCsvAndDeleteValues,
  getSalesOrderNumber
};
