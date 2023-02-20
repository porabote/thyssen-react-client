export default class __SagaTaskRegistry {
  constructor() {
    this._taskPromises = [];
  }

  addTask(task) {
    if (!this._taskPromises) {
      this._taskPromises = [];
    }
    this._taskPromises.push(task.done);
  }

  getPromise() {
    return new Promise((resolve) => {
      const promises = this._taskPromises;
      if (!promises) {
        resolve();
        return;
      }
      this._taskPromises = undefined;
      Promise.all(promises).then(resolve).catch(resolve);
    }).then(() => {
      const promises = this._taskPromises;
      if (promises) {
        return this.getPromise();
      }
      return undefined;
    });
  }
}
