import Api from "@services";

export default class Entity {

  primaryKey = 'id';

  record = {};

  constraints = {
    where: {},
    whereIn: {},
  };

  where = (params) => {
    this.constraints.where = Object.assign(this.constraints.where, params);
    return this;
  }

  async get(id) {

    let primaryKeyValue = (id) ? id : ''

    let response = await Api.get(`/api/${this.name}/get/${primaryKeyValue}`, {
      query: {
        ...this.constraints,
      }
    });

    if (id) {
      return this.record = {
        ...response.data,
        type: this.name,
        primaryKey: this.primaryKey,
        update: this.update,
      }
    } else {
      return {
        data: response.data,
        meta: response.meta,
      };
    }

    return this.record;
  }

  async update() {
    return await Api.post(`/api/${this.type}/update/${this.attributes[this.primaryKey]}`, {
      body: this.attributes
    });
  }

  async delete(id) {
    return await Api.get(`/api/${this.name}/delete/${id}`);
  }

  // save = (values, callback) => {
  //
  //   let apiMethod = (typeof this.primaryKey != "undefined" && values[this.primaryKey]) ? 'edit' : 'create';
  //
  //   Api.post(`/api/${this.name}/method/${apiMethod}/`, {
  //     body: values
  //   }).then((resp) => {
  //     if (typeof callback == "function") callback(resp);
  //   });
  // }
}