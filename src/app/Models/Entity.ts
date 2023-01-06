import {ArrayMapper} from "@/app/Collections/";
import IModel from "@/app/Models/IModel";

export interface IEntity {
  primaryKey: string | number | null
  attributes: { [key: string]: any }
  apiEntityName: string | null;

  getAttribute(name: string): any

  setAttribute(name: string, value: any, mode?: string): any

  save: () => any;
};

class Entity implements IEntity {

  isNew: boolean;
  primaryKey = 'id';
  apiEntityName;
  attributes: { [key: string]: any } = {};
  model;

  constructor(model: IModel, attributes:{[key: string]: any} = {}) {
    this.apiEntityName = model.getApiEntityName();
    this.model = model;
    this.setAttributes(attributes);
    this.isNew = (attributes[this.primaryKey]) ? true : false;
  }

  setAttributes(attributes: {}) {
    this.attributes = attributes;
  }

  getAttribute(name: string): any {
    return ArrayMapper.getValueByPath(name, this.attributes);
  }

  setAttribute(name: string, value: any, mode?: string) {

    if (!mode) mode = 'merge';

    const valueBranch = ArrayMapper.buildPathBranch(name, value)

    switch (mode) {
      case 'merge': //if value is string or object
        var values = ArrayMapper.mergeValues(this.attributes, valueBranch);
        break;
      case 'delete': // unset value ( with key )
        var values = ArrayMapper.deleteValue(this.attributes, name);
        break;
      case 'replace': // if value is array - target array will be replaced to source array
        var values = ArrayMapper.replaceValue(this.attributes, valueBranch);
        break;
      case 'push': // if value is array - source array will be added to target array
        var values = ArrayMapper.pushValue(this.attributes, name, value);
        break;
      case 'spliceByKey': // if value is array - source array will be removed from target array
        var values = ArrayMapper.spliceByKey(this.attributes, name, value)
        break;
      case 'patch': // Set new path in source
        var values = ArrayMapper.setPatch(this.attributes, name, value)
        break;
    }

    this.attributes = values;

  }

  save = async () => {
    let saveResult = await this.model.save(this.attributes);
    console.log(saveResult);
  }

};

export default Entity;
