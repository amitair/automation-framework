import faker from "faker/locale/en";

function getMinBody() {
  return {
    "id": Date.now(),
    "name": faker.name.firstName(),
    "photos": [
      "https://random.photo/"
    ],
    "status": "available"
  };
};

export { getMinBody };
