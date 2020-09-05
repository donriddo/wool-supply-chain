import Web3 from "web3";
import Core from "../../build/contracts/Core.json";

const App = {
  web3: null,
  account: null,
  meta: null,
  currentActor: null,
  itemStates: [
    'Planted',
    'Harvested',
    'MetWoolProcessor',
    'ShippedFromFarmer',
    'Processed',
    'MetFabricDesigner',
    'ShippedFromProcessor',
    'Sewn',
    'Advertised',
    'Purchased',
  ],

  start: async function () {
    const { web3 } = this;

    try {
      // get contract instance
      const networkId = await web3.eth.net.getId();
      console.log({ networkId, nws: Core.networks });
      const deployedNetwork = Core.networks[networkId];
      this.meta = new web3.eth.Contract(
        Core.abi,
        deployedNetwork.address,
      );

      // get accounts
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];
      this.currentActor = accounts[0];

      $('#currentActorId').text(this.currentActor);
      $('#originFarmerID').val(this.currentActor);
      $.each(accounts, function (val, text) {
        $('#setCurrentActor').append($('<option></option>').val(text).html(text))
      });

      $('#setCurrentActorBtn').click(e => {
        e.preventDefault();
        const value = $("#setCurrentActor").val();
        if (value) {
          this.currentActor = $("#setCurrentActor").val();
          $('#currentActorId').text(this.currentActor);
        }
      });

      $('#seeCurrentActorBtn').click(e => {
        e.preventDefault();
        $("#currentActor").show();
      });

      $('#closeCurrentActorBtn').click(e => {
        e.preventDefault();
        $("#currentActor").hide();
      });

      $('#seeCurrentItemBtn').click(e => {
        e.preventDefault();
        $("#currentItem").show();
      });

      $('#closeCurrentItemBtn').click(e => {
        e.preventDefault();
        $("#currentItem").hide();
      });

      $('#newFarmerBtn').click(e => {
        e.preventDefault();
        const value = $("#newFarmerId").val();
        if (value) {
          this.addNewActor('farmer', value);
        }
      });

      $('#plantWoolBtn').click(async e => {
        e.preventDefault();
        const plantWoolUpc = $("#plantWoolUpc").val();
        const originFarmerId = $("#originFarmerID").val();
        const originFarmName = $("#originFarmName").val();
        const originFarmInformation = $("#originFarmInformation").val();
        const originFarmLatitude = $("#originFarmLatitude").val();
        const originFarmLongitude = $("#originFarmLongitude").val();
        const productNotes = $("#productNotes").val();

        console.log({
          plantWoolUpc,
          originFarmerId,
          originFarmName,
          originFarmInformation,
          originFarmLatitude,
          originFarmLongitude,
          productNotes,
        })

        await this.plantNewWool(
          plantWoolUpc,
          originFarmerId,
          originFarmName,
          originFarmInformation,
          originFarmLatitude,
          originFarmLongitude,
          productNotes,
        );

        await this.setCurrentItem(plantWoolUpc);
      });

      $('#harvestWoolBtn').click(async e => {
        e.preventDefault();
        const harvestWoolUpc = $("#harvestWoolUpc").val();
        const harvestWoolAmount = $("#woolPrice").val();

        console.log({
          harvestWoolUpc,
          harvestWoolAmount,
        })

        await this.harvestWool(
          harvestWoolUpc,
          harvestWoolAmount,
        );

        await this.setCurrentItem(harvestWoolUpc);
      });

      $('#meetProcessorBtn').click(async e => {
        e.preventDefault();
        const meetProcessorUpc = $("#meetProcessorUpc").val();

        console.log({
          meetProcessorUpc,
        })

        await this.meetWoolProcessor(
          meetProcessorUpc,
        );

        await this.setCurrentItem(meetProcessorUpc);
      });

      $('#shipWoolBtn').click(async e => {
        e.preventDefault();
        const shipWoolUpc = $("#shipWoolUpc").val();
        const shipWoolAmount = $("#shipWoolAmount").val();

        console.log({
          shipWoolUpc,
          shipWoolAmount,
        })

        await this.shipWool(
          shipWoolUpc,
          shipWoolAmount,
        );

        await this.setCurrentItem(shipWoolUpc);
      });

      $('#processWoolBtn').click(async e => {
        e.preventDefault();
        const processWoolUpc = $("#processWoolUpc").val();
        const fabricPrice = $("#fabricPrice").val();

        console.log({
          processWoolUpc,
          fabricPrice,
        })

        await this.processWool(
          processWoolUpc,
          fabricPrice,
        );

        await this.setCurrentItem(processWoolUpc);
      });

      $('#meetDesignerBtn').click(async e => {
        e.preventDefault();
        const meetDesignerUpc = $("#meetDesignerUpc").val();

        console.log({
          meetDesignerUpc,
        })

        await this.meetFabricDesigner(
          meetDesignerUpc,
        );

        await this.setCurrentItem(meetDesignerUpc);
      });

      $('#shipFabricBtn').click(async e => {
        e.preventDefault();
        const shipFabricUpc = $("#shipFabricUpc").val();
        const shipFabricAmount = $("#shipFabricAmount").val();

        console.log({
          shipFabricUpc,
          shipFabricAmount,
        })

        await this.shipFabric(
          shipFabricUpc,
          shipFabricAmount,
        );

        await this.setCurrentItem(shipFabricUpc);
      });

      $('#sewFabricBtn').click(async e => {
        e.preventDefault();
        const sewFabricUpc = $("#sewFabricUpc").val();
        const fabricPrice = $("#clothPrice").val();

        console.log({
          sewFabricUpc,
          fabricPrice,
        })

        await this.sewCloth(
          sewFabricUpc,
          fabricPrice,
        );

        await this.setCurrentItem(sewFabricUpc);
      });

      $('#advertiseBtn').click(async e => {
        e.preventDefault();
        const advertiseUpc = $("#advertiseUpc").val();

        console.log({
          advertiseUpc,
        })

        await this.advertiseCloth(
          advertiseUpc,
        );

        await this.setCurrentItem(advertiseUpc);
      });

      $('#buyClothBtn').click(async e => {
        e.preventDefault();
        const buyClothUpc = $("#buyClothUpc").val();
        const buyClothAmount = $("#buyClothAmount").val();

        console.log({
          buyClothUpc,
          buyClothAmount,
        })

        await this.purchaseCloth(
          buyClothUpc,
          buyClothAmount,
        );

        await this.setCurrentItem(buyClothUpc);
      });

      $('#clothDetailsBtn').click(async e => {
        e.preventDefault();
        const clothDetailsUpc = $("#clothDetailsUpc").val();

        console.log({
          clothDetailsUpc,
        })

        const clothDetails = await this.fetchItemDetails(
          clothDetailsUpc,
        );
        console.log({ clothDetails });
        await this.setCurrentItem(clothDetailsUpc);
      });

      $('#clothOriginBtn').click(async e => {
        e.preventDefault();
        const clothOriginUpc = $("#clothOriginUpc").val();

        console.log({
          clothOriginUpc,
        })

        const clothOrigin = await this.fetchItemOrigin(
          clothOriginUpc,
        );
        console.log({ clothOrigin });
        await this.setCurrentItem(clothOriginUpc);
      });

      $('#clothActorsBtn').click(async e => {
        e.preventDefault();
        const clothActorsUpc = $("#clothActorsUpc").val();

        console.log({
          clothActorsUpc,
        })

        const clothActors = await this.fetchItemActors(
          clothActorsUpc,
        );
        console.log({ clothActors });
        await this.setCurrentItem(clothActorsUpc);
      });
    } catch (error) {
      console.error("Could not connect to contract or chain.", error);
    }
  },

  setStatus: function (message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },

  callAsyncFunction: async function () {
    const args = Array.prototype.slice.call(arguments);
    const fn = args.shift();
    const [method, gasFee] = args.pop().split(':');
    try {
      // e.g addNewFarmer.apply(null, account).send({ from: this.currentActor })
      return await fn.apply(null, args)[method]({ from: this.currentActor, value: gasFee });
    } catch (error) {
      console.log(error);
    }
  },

  setCurrentItem: async function (upc) {
    $('#currentItemUpc').text(upc);
    const response = await this.fetchItemState(upc);
    console.log({ response });
    $('#currentItemState').text(this.itemStates[+response]);
    $('#nextItemState').text(this.itemStates[+response + 1] || '');
    $("#currentItem").show();
  },

  addNewActor: async function (type, account) {
    const {
      addFarmer,
      addWoolProcessor,
      addFabricDesigner,
      addBuyer,
    } = this.meta.methods;

    switch (type) {
      case 'farmer':
        return await this.callAsyncFunction(addFarmer, account, 'send');
      case 'processor':
        return await this.callAsyncFunction(addWoolProcessor, account, 'send');
      case 'designer':
        return await this.callAsyncFunction(addFabricDesigner, account, 'send');
      case 'buyer':
        return await this.callAsyncFunction(addBuyer, account, 'send');

      default:
        break;
    }
  },

  plantNewWool: async function (
    upc,
    originFarmerId,
    farmName,
    farmInfo,
    farmLat,
    farmLong,
    notes,
  ) {
    const { plantItem } = this.meta.methods;
    return await this.callAsyncFunction(
      plantItem,
      upc,
      originFarmerId,
      farmName,
      farmInfo,
      farmLat,
      farmLong,
      notes,
      'send',
    );
  },

  harvestWool: async function (
    upc,
    price,
  ) {
    const { harvestItem } = this.meta.methods;
    return await this.callAsyncFunction(
      harvestItem,
      upc,
      price,
      'send',
    );
  },

  meetWoolProcessor: async function (
    upc,
  ) {
    const { meetWoolProcessor } = this.meta.methods;
    return await this.callAsyncFunction(
      meetWoolProcessor,
      upc,
      'send',
    );
  },

  shipWool: async function (
    upc,
    amount,
  ) {
    const { shipFromFarmer } = this.meta.methods;
    return await this.callAsyncFunction(
      shipFromFarmer,
      upc,
      `send:${amount}`,
    );
  },

  processWool: async function (
    upc,
    price,
  ) {
    const { processItem } = this.meta.methods;
    return await this.callAsyncFunction(
      processItem,
      upc,
      price,
      'send',
    );
  },

  meetFabricDesigner: async function (
    upc,
  ) {
    const { meetFabricDesigner } = this.meta.methods;
    return await this.callAsyncFunction(
      meetFabricDesigner,
      upc,
      'send',
    );
  },

  shipFabric: async function (
    upc,
    amount,
  ) {
    const { shipFromProcessor } = this.meta.methods;
    return await this.callAsyncFunction(
      shipFromProcessor,
      upc,
      `send:${amount}`,
    );
  },

  sewCloth: async function (
    upc,
    price,
  ) {
    const { sew } = this.meta.methods;
    return await this.callAsyncFunction(
      sew,
      upc,
      price,
      'send',
    );
  },

  advertiseCloth: async function (
    upc,
  ) {
    const { advertise } = this.meta.methods;
    return await this.callAsyncFunction(
      advertise,
      upc,
      'send',
    );
  },

  purchaseCloth: async function (
    upc,
    amount,
  ) {
    const { purchase } = this.meta.methods;
    return await this.callAsyncFunction(
      purchase,
      upc,
      `send:${amount}`,
    );
  },

  fetchItemState: async function (
    upc,
  ) {
    const { fetchItemState } = this.meta.methods;
    return await this.callAsyncFunction(
      fetchItemState,
      upc,
      'call',
    );
  },

  fetchItemState: async function (
    upc,
  ) {
    const { fetchItemState } = this.meta.methods;
    return await this.callAsyncFunction(
      fetchItemState,
      upc,
      'call',
    );
  },

  fetchItemDetails: async function (
    upc,
  ) {
    const { fetchItemDetails } = this.meta.methods;
    return await this.callAsyncFunction(
      fetchItemDetails,
      upc,
      'call',
    );
  },

  fetchItemOrigin: async function (
    upc,
  ) {
    const { fetchItemOrigin } = this.meta.methods;
    return await this.callAsyncFunction(
      fetchItemOrigin,
      upc,
      'call',
    );
  },

  fetchItemActors: async function (
    upc,
  ) {
    const { fetchItemActors } = this.meta.methods;
    return await this.callAsyncFunction(
      fetchItemActors,
      upc,
      'call',
    );
  },

};

window.App = App;

window.addEventListener("load", async function () {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    await window.ethereum.enable(); // get permission to access accounts
  } else {
    console.warn("No web3 detected. Falling back to http://127.0.0.1:9545. You should remove this fallback when you deploy live",);
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:9545"));
  }

  App.start();
});
