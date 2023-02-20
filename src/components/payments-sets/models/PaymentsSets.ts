import Model from "@/app/models/model";
import Api from "@/services"

class PaymentsSets extends Model {

  static get apiEntityName(): string {
    return "PaymentsSets";
  }

  static getCourses = async (date) => {
    let courses = await Api.get(`/api/payments-sets/method/getCbrfCourses?date_req=${date}`);
    return courses.data;
  }

}

export default PaymentsSets;
