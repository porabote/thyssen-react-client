import Api from "@services";
import Entity from "@app/Models/entity";

class File extends Entity {
  name = 'File';

  async upload(formData) {
    return await Api.post(`/api/files/method/upload`, {
      body: formData
    });
  }

}

export default new File;
