import IModel from "@/app/Models/IModel";

export interface IModelDataSource {
  model: any;
  constraints: {
    where?: {}
  };
  dataPath: string;
};

const ModelDataSource = async ({model, constraints = {}, dataPath = "data"}: IModelDataSource) => {

  let modelInstance = new model({});
  if (constraints.where) {
    modelInstance.setWhere(constraints.where)
  }

  let res = await modelInstance.get();

  let path = dataPath.split(".");
  path.map((step) => res = res[step]);

  let dataList: {}[] = [];
  if (typeof res === "object") {
    dataList = Object.entries(res).map((item: any[]): any[] => item[1]);
  } else {
    dataList = res;
  }

  return dataList;

};

export default ModelDataSource;
