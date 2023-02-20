import Model from "@/app/models/model";
import Api from "@/services";

class Bills extends Model {

  static get apiEntityName(): string {
    return "Bills";
  }
  //
  // static setAccept = async (recordId: number, status) => {
  //   const result = await Api.get(`/api/payments/method/setAccept/${recordId}/`, {
  //     query: {status: + status}
  //   });
  //   if (result.error) {
  //     alert(result.error);
  //   } else {
  //     alert("Статус успешно изменен.");
  //   }
  //
  // }

}

export default Bills;
