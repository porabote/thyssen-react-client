import Api from "@/services";
import IModel from "./IModel";

export default class Model implements IModel {

  entity: any;
  apiEntityName: string | null = null;
  method: string = "get";

  constraints = {
    where: {},
    whereIn: {},
  };

  with = {};

  setMethod = (methodName: string) => {
    this.method = methodName;
  }

  constructor(attributes: {}, apiEntityNameIn = "") {
    this.apiEntityName = apiEntityNameIn;
  }

  getApiEntityName(): string | null {
    return this.apiEntityName;
  }

  clearConstraints = () => {
    this.constraints = {
      where: {},
      whereIn: {},
    };
  }

  setWhere = (params: { [key: string]: any }) => {
    this.constraints.where = Object.assign(this.constraints.where, params);
    return this;
  }

  setWith = (withList = {}) => {
    this.with = Object.assign(this.with, withList);
    return this;
  }

  async get(id: number | string) {

    let primaryKeyValue = (id) ? id : '';

    let uri = `/api/${this.getApiEntityName()}/get/${primaryKeyValue}`;
    if (this.method != "get") `/api/${this.getApiEntityName()}/method/${this.method}/${primaryKeyValue}`;

    let response = await Api.get(uri, {
      query: {
        ...this.constraints,
        include: {...this.with},
      }
    });

    if (id) {
      return this.entity = {
        ...response.data,
        type: this.getApiEntityName(),
        primaryKey: this.entity.primaryKey,
        update: this.update,
      }
    } else {
      return {
        data: response.data,
        meta: response.meta,
      };
    }

    this.with = {};
    this.clearConstraints();

    return this.entity;
  }

  async save(attributes = {}): Promise<any> {
    return Api.post(`/api/${this.getApiEntityName()}/create/`, {
      body: attributes,
    });
  }

  async update() {
    return await Api.post(`/api/${this.getApiEntityName()}/update/${this.entity.getPrimaryKey()}`, {
      body: this.entity.getAttributes(),
    });
  }

  async delete(id: number | string) {
    return await Api.get(`/api/${this.getApiEntityName()}/delete/${id}`);
  }

}
