import uuid from 'uuid/v1';

export default class Region {
  constructor(name){
    this._id = uuid();
    this._name = name;
  }

  get id(){
    return this._id;
  }

  get name() {
    return this._name;
  }
  
  getRegionId() {
    return this._id;
  }
}