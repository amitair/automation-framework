import faker from "faker/locale/en";

// for the purpose of this exercise all pets are mixed pitbulls like mine (even if there random pic comes out differently)
// also as 0 returns a random id, I am assuming it is unique otherwise I would have to ei
export const { petBody } = {
  get petBody() {
    return {
      "id": Date.now(),
      "category": {
        "id": 1,
        "name": "dog"
      },
      "name": faker.name.firstName(),
      "photoUrls": [
        "https://random.dog/"
      ],
      "tags": [{
        "id": 12,
        "name": "mixed"
      },
      {
        "id": 13,
        "name": "Pitbull"
      }
      ],
      "status": "available"
    };
  }
};
