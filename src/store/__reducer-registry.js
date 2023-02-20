class __reducerRegistry {
  constructor () {
    if (!__reducerRegistry.instance) {
      this._emitChange = null
      this._reducers = {}
      __reducerRegistry.instance = this
    }
    return __reducerRegistry.instance
  }

  getReducers () {
    return {...this._reducers}
  }

  register (name, reducer) {
    this._reducers = {...this._reducers, [name]: reducer}
    if (this._emitChange) {
      this._emitChange(this.getReducers())
    }
  }

  setChangeListener (listner) {
    this._emitChange = listner
  }
}

const reducerRegistry = new __reducerRegistry();
