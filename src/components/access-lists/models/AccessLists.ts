import Model from "@/app/models/model";

class AccessLists extends Model {

  static get apiEntityName(): string {
    return "AccessLists";
  }

  static check = () => {
    alert("check");
  }

}

export default AccessLists;
