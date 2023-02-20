import Model from "@/app/models/model";

class PurchaseRequests extends Model {

  static get apiEntityName(): string {
    return "PurchaseRequest";
  }

}

export default PurchaseRequests;
