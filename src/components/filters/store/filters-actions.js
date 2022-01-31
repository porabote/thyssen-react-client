export const updateFilters = (data, storeAlias) => {
  return {
    type: "UPDATE_FILTERS",
    payload: {
      data,
      storeAlias
    }
  }
}