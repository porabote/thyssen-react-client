export default interface IModel {
  method: string;
  apiEntityName: string | null;
  getApiEntityName: () => string | null;
  save: (attributes: {[key: string]: any}) => any;
  //new(configs: {}, apiClassName: string): void;
 // apiClassName?: string;
 // Entity: any;
};
