const sinon = require("sinon");
const { deepStrictEqual } = require("assert");
const Service = require("./service");
const { SWAPI } = require("./constants");
const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

const SWAPI_PLANETS1 = `${SWAPI.BASE_URL}${SWAPI.PLANETS1_ENDPOINT}`;
const SWAPI_PLANETS2 = `${SWAPI.BASE_URL}${SWAPI.PLANETS2_ENDPOINT}`;

(async () => {
  /* ---- This will request from the internet ---- */
  // {
  //   const service = new Service();
  //   const withoutStub = await service.makeRequest(
  //     `${SWAPI.BASE_URL}${SWAPI.PLANETS2_ENDPOINT}`
  //   );
  //   console.log(JSON.stringify(withoutStub));
  // }

  // Mock API response w/ stubs
  const service = new Service();
  const stub = sinon.stub(service, service.makeRequest.name);

  stub.withArgs(SWAPI_PLANETS1).resolves(mocks.tatooine);
  stub.withArgs(SWAPI_PLANETS2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
      appearedIn: 5,
    };

    const results = await service.getPlanets(SWAPI_PLANETS1);

    deepStrictEqual(results, expected);
  }
  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
      appearedIn: 2,
    };

    const results = await service.getPlanets(SWAPI_PLANETS2);
    console.log("results", results);

    deepStrictEqual(results, expected);
  }
})();
