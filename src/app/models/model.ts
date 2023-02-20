import Api from "@/services";
import IModel from "./i-model";
import Entity, {IEntity} from "./entity";

class Model implements IModel {

  page: number = 1;
  _apiEntityName: string;
  method: string = "get";

  constraints = {
    where: {},
    whereIn: {},
    whereBetween: {},
    whereNotNull: [],
  };

  constructor() {
    this._apiEntityName = this.constructor.apiEntityName;

  }

  setMethod = (methodName: string) => {
    this.method = methodName;
  }

  clearConstraints = () => {
    this.constraints = {
      where: {},
      whereIn: {},
      whereBetween: {},
    };
  }

  setWhere = (params: { [key: string]: any }) => {
    this.constraints.where = Object.assign(this.constraints.where, params);
    return this;
  }

  setWhereIn = (params: { [key: string]: any }) => {
    this.constraints.whereIn = Object.assign(this.constraints.whereIn, params);
    return this;
  }

  setWhereBetween  = (params: { [key: string]: any }) => {
    this.constraints.whereBetween = Object.assign(this.constraints.whereBetween, params);
    return this;
  }

  whereNotNull  = (params: []) => {
    this.constraints.whereNotNull = [...this.constraints.whereNotNull, ...params];
    return this;
  }

  setPage = (page: number) => {
    this.page = page;
    return this;
  }

  with = [];
  setWith = (withList = []): any => {
    this.with = [...this.with, ...withList];
    return this;
  }

  _limit = 500;
  setLimit(limit: number) {
    this._limit = limit;
    return this;
  }

  set limit(limit: number) {
    this._limit = limit;
    return this;
  }

  post = () => {
    this.method = "POST";
    this.get();
  }

  async get(id?: number | string) {

    let primaryKeyValue = (id) ? id : '';

    let uri = `/api/${this._apiEntityName}/get/${primaryKeyValue}`;
    if (this.method != "get") `/api/${this._apiEntityName}/method/${this.method}/${primaryKeyValue}`;

    let response = await Api.get(uri, {
      query: {
        ...this.constraints,
        include: {...this.with},
        limit: this._limit,
        page: this.page,
      }
    });

    if (id) {
      return this.entity = {
        ...response.data,
        type: this._apiEntityName,
        // primaryKey: this.entity.primaryKey,
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

  async create(entity: IEntity): Promise<any> {
    return Api.post(`/api/${this.constructor.apiEntityName}/create/`, {
      body: entity.getAttributes(),
    });
  }

  async update(entity: IEntity) {
    return await Api.post(`/api/${this.constructor.apiEntityName}/update/${entity.getAttribute(entity.getPrimaryKey())}`, {
      body: entity.getAttributes(),
    });
  }

  static async save(records: IEntity[]) {console.log(this.apiEntityName);
    return await Api.post(`/api/${this.apiEntityName}/save/`, {
      body: {records},
    });
  }

  static async delete(primaryKeyValue) {
    return await Api.get(`/api/${this.constructor.apiEntityName}/method/delete/${primaryKeyValue}`); // TODO
  }

  static createEntity(attributes: {}) {
    return new Entity(this, attributes);
  }

}

export default Model;
