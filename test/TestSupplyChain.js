const Core = artifacts.require("Core");

let accounts;
let owner;
let farmer;
let woolProcessor;
let fabricDesigner;
let buyer;

const UPC = 1;
const FARM_NAME = "Akindele Farms";
const FARM_INFO = "The most awesome farm you can ever manage";
const FARM_LAT = "3.98754";
const FARM_LONG = "-7.84322";
const FARM_PRODUCT_NOTES = "How easy to forget clothes came from wool";
const WOOL_HARVESTED_PRICE = 300;
const FABRIC_PROCESSED_PRICE = 500;
const CLOTH_SEWN_PRICE = 1500;

const ITEM_STATES = {
  Planted: 0,
  Harvested: 1,
  MetWoolProcessor: 2,
  ShippedFromFarmer: 3,
  Processed: 4,
  MetFabricDesigner: 5,
  ShippedFromProcessor: 6,
  Sewn: 7,
  Advertised: 8,
  Purchased: 9
};

contract('Core', (accs) => {
  accounts = accs;
  owner = accounts[0];
  farmer = accounts[1];
  woolProcessor = accounts[2];
  fabricDesigner = accounts[3];
  buyer = accounts[4];
});

it('ensures owner is the first account', async () => {
  const instance = await Core.deployed();
  assert.equal(await instance.owner.call(), owner);
});

it('ensures owner has all permissions for farmer, wool processor, fabric designer and buyer by default', async () => {
  const instance = await Core.deployed();
  assert.equal(await instance.isFarmer.call(owner), true);
  assert.equal(await instance.isWoolProcessor.call(owner), true);
  assert.equal(await instance.isFabricDesigner.call(owner), true);
  assert.equal(await instance.isBuyer.call(owner), true);
});

it('ensures owner can plant item: wool', async () => {
  const instance = await Core.deployed();

  await instance.plantItem(
    UPC + 1,
    owner,
    FARM_NAME,
    FARM_INFO,
    FARM_LAT,
    FARM_LONG,
    FARM_PRODUCT_NOTES,
    { from: owner }
  );

  assert.equal(await instance.fetchItemState.call(UPC + 1), ITEM_STATES.Planted);
});

it('ensures owner can add all roles: farmer, wool processor, fabric designer and buyer', async () => {
  const instance = await Core.deployed();
  assert.equal(await instance.isFarmer.call(farmer), false);
  assert.equal(await instance.isWoolProcessor.call(woolProcessor), false);
  assert.equal(await instance.isFabricDesigner.call(fabricDesigner), false);
  assert.equal(await instance.isBuyer.call(buyer), false);

  await instance.addFarmer(
    farmer,
    { from: owner }
  );

  await instance.addWoolProcessor(
    woolProcessor,
    { from: owner }
  );

  await instance.addFabricDesigner(
    fabricDesigner,
    { from: owner }
  );

  await instance.addBuyer(
    buyer,
    { from: owner }
  );

  assert.equal(await instance.isFarmer.call(farmer), true);
  assert.equal(await instance.isWoolProcessor.call(woolProcessor), true);
  assert.equal(await instance.isFabricDesigner.call(fabricDesigner), true);
  assert.equal(await instance.isBuyer.call(buyer), true);
});

it('ensures farmer can plant item: wool', async () => {
  const instance = await Core.deployed();

  await instance.plantItem(
    UPC,
    farmer,
    FARM_NAME,
    FARM_INFO,
    FARM_LAT,
    FARM_LONG,
    FARM_PRODUCT_NOTES,
    { from: farmer }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Planted);
});

it('ensures farmer can harvest item: wool', async () => {
  const instance = await Core.deployed();

  await instance.harvestItem(
    UPC,
    WOOL_HARVESTED_PRICE,
    { from: farmer }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Harvested);
});

it('ensures farmer can meet wool processor', async () => {
  const instance = await Core.deployed();

  await instance.meetWoolProcessor(
    UPC,
    { from: farmer }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetWoolProcessor);
});

it('ensures farmer can not buy and ship wool from himself', async () => {
  const instance = await Core.deployed();

  try {
    await instance.shipFromFarmer(
      UPC,
      { from: farmer }
    );
  } catch (error) {
    assert.include(error.message, "Not a wool processor");
  }

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetWoolProcessor);
});

it('ensures woolProcessor cannot ship wool without complete payment', async () => {
  const instance = await Core.deployed();

  try {
    await instance.shipFromFarmer(
      UPC,
      { from: woolProcessor }
    );
  } catch (error) {
    assert.include(error.message, "Insufficient funds");
  }

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetWoolProcessor);
});

it('ensures woolProcessor can ship wool', async () => {
  const instance = await Core.deployed();

  await instance.shipFromFarmer(
    UPC,
    { from: woolProcessor, value: WOOL_HARVESTED_PRICE }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.ShippedFromFarmer);
});

it('ensures woolProcessor can process wool', async () => {
  const instance = await Core.deployed();

  await instance.processItem(
    UPC,
    FABRIC_PROCESSED_PRICE,
    { from: woolProcessor }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Processed);
});

it('ensures woolProcessor can meet fabric designer', async () => {
  const instance = await Core.deployed();

  await instance.meetFabricDesigner(
    UPC,
    { from: woolProcessor }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetFabricDesigner);
});


it('ensures woolProcessor can not buy and ship fabric from himself', async () => {
  const instance = await Core.deployed();

  try {
    await instance.shipFromProcessor(
      UPC,
      { from: woolProcessor }
    );
  } catch (error) {
    assert.include(error.message, "Not a fabric designer");
  }

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetFabricDesigner);
});

it('ensures fabricDesigner cannot ship fabric without complete payment', async () => {
  const instance = await Core.deployed();

  try {
    await instance.shipFromProcessor(
      UPC,
      { from: fabricDesigner }
    );
  } catch (error) {
    assert.include(error.message, "Insufficient funds");
  }

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.MetFabricDesigner);
});

it('ensures fabricDesigner can ship fabric', async () => {
  const instance = await Core.deployed();

  await instance.shipFromProcessor(
    UPC,
    { from: fabricDesigner, value: FABRIC_PROCESSED_PRICE }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.ShippedFromProcessor);
});

it('ensures fabricDesigner can sew fabric into cloth', async () => {
  const instance = await Core.deployed();

  await instance.sew(
    UPC,
    CLOTH_SEWN_PRICE,
    { from: fabricDesigner }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Sewn);
});

it('ensures fabricDesigner can sew advertise cloth', async () => {
  const instance = await Core.deployed();

  await instance.advertise(
    UPC,
    { from: fabricDesigner }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Advertised);
});

it('ensures buyer cannot purchase cloth without complete payment', async () => {
  const instance = await Core.deployed();

  try {
    await instance.purchase(
      UPC,
      { from: buyer }
    );
  } catch (error) {
    assert.include(error.message, "Insufficient funds");
  }

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Advertised);
});

it('ensures buyer can purchase cloth', async () => {
  const instance = await Core.deployed();

  await instance.purchase(
    UPC,
    { from: buyer, value: CLOTH_SEWN_PRICE }
  );

  assert.equal(await instance.fetchItemState.call(UPC), ITEM_STATES.Purchased);
});

it('ensures buyer can fetch cloth origin', async () => {
  const instance = await Core.deployed();

  const clothOrigin = await instance.fetchItemOrigin.call(
    UPC,
    { from: buyer }
  );

  assert(clothOrigin.originFarmerID, farmer);
  assert(clothOrigin.originFarmName, FARM_NAME);
  assert(clothOrigin.originFarmInformation, FARM_INFO);
  assert(clothOrigin.originFarmLatitude, FARM_LAT);
  assert(clothOrigin.originFarmLongitude, FARM_LONG);
});

it('ensures buyer can fetch cloth price history', async () => {
  const instance = await Core.deployed();

  const priceHistory = await instance.fetchItemPrices.call(
    UPC,
    { from: buyer }
  );

  assert(priceHistory.woolPrice, WOOL_HARVESTED_PRICE);
  assert(priceHistory.fabricPrice, FABRIC_PROCESSED_PRICE);
  assert(priceHistory.clothPrice, CLOTH_SEWN_PRICE);
});

it('ensures buyer can retrieve everyone involved in the making of the cloth', async () => {
  const instance = await Core.deployed();

  const actors = await instance.fetchItemActors.call(
    UPC,
    { from: buyer }
  );

  assert(actors.originFarmerID, farmer);
  assert(actors.processorID, woolProcessor);
  assert(actors.designerID, fabricDesigner);
  assert(actors.buyerID, buyer);
});

it('ensures buyer cannot fetch item that has not been bought', async () => {
  const instance = await Core.deployed();

  try {
    await instance.fetchItemDetails(
      UPC + 1,
      { from: buyer }
    );
  } catch (error) {
    assert.include(error.message, "Item not purchased");
  }
});

it('ensures buyer cannot fetch item that does not exist', async () => {
  const instance = await Core.deployed();

  try {
    await instance.fetchItemDetails(
      UPC + 2,
      { from: buyer }
    );
  } catch (error) {
    assert.include(error.message, "Item does not exist");
  }
});
