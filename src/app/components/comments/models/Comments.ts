import Model from "@/app/models/model";

class Comments extends Model {

  static get apiEntityName(): string {
    return "Comment";
  }

}

export default Comments;
