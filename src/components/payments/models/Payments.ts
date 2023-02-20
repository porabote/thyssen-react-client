import Model from "@/app/models/model";
import Api from "@/services";

class Payments extends Model {

  static get apiEntityName(): string {
    return "Payments";
  }

  static setAccept = async (recordId: number, status) => {
    const result = await Api.get(`/api/payments/method/setAccept/${recordId}/`, {
      query: {status: + status}
    });
    if (result.error) {
      alert(result.error);
    } else {
      alert("Статус успешно изменен.");
    }
  }

  static getScanFiles = async (recordId: number) => {
    const result = await Api.get(`/api/payments/method/getScanFiles/${recordId}/`);
    if (result.error) {
      alert(result.error);
    }

    return result;
  }

  static setPspTable = async (scanFileId, paymentId) => {
    const result = await Api.get(`/api/payments/method/createImageOfPspTable/`, {
      query: {
        scanFileId,
        paymentId,
      }
    });
    if (result.error) {
      alert(result.error);
    }

    return result.data;
  }

}

export default Payments;
