; (function (global) {

  function RegionsStorage(onDestroy) {

    var regionsList = Object.create(null, {
      toString: { value: Object.prototype.toString }
    });

    /*-------------------- private -------------------------*/
    var count = 0;
    var history = [];

    /**
    * Removes an ID from the list of known identifiers.
    *
    * @param {String} id - An ID for removing.
    */
    function _historyItemRemove(id) {

      var index = history.findIndex(function (item) { return item === id; });
      if (index !== -1) {
        history.splice(index, 1);
      }
    }

    /**
    * Adds a new region element to the regions list.
    *
    * @param {Region} region - A Region object instance
    */
    this.add = function (region) {

      var id = region.getRegionId();
      if (id in regionsList) {
        console.error("[Error]: A region with such ID is already exist");
        return;
      }

      regionsList[id] = region;
      history.push(id);
      count++;
    };

    /**
    * Removes a region according to passed region id.
    *
    * @param {String} regionId - An ID of the region.
    */
    this.remove = function (regionId) {

      if (regionId in regionsList) {
        onDestroy(regionsList[regionId]);
        delete regionsList[regionId];
        count--;
        _historyItemRemove(regionId);
      }
      else {
        console.error("[Error]: Unknown region. Deletion is aborted");
      }
    };

    /**
    * Returns count of the drawn regions.
    */
    this.getCount = function () {

      return count;
    };

    /**
    * Removes last drawn region.
    */
    this.pop = function () {
      this.remove(history.pop());
    };

    /**
    * Applies an action to each item in the regions list.
    *
    * @param {Function} callback - An action for applying.
    */
    this.forEach = function (callback) {

      for (var id in regionsList) { callback(regionsList[id]); }
    };

    this.toString = function () {
      console.log("--- RegionsStorage ---");
      console.log("-- count: " + count);
      console.log("-- regions: " + JSON.stringify(regionsList));
      console.log("-- history: " + history);
    };

    /**
    * Sets an initial state of the storage.
    */
    this.reset = function () {

      for (var id in regionsList) { delete regionsList[id]; }
      count = 0;
      history = [];
    };
  }

  global.RegionsStorage = RegionsStorage;
  console.info('RegionsStorage - ready to use');
}(window));