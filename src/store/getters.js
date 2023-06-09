export default {
  getAllInvoices(state) {
    return state.invoices;
  },
  getNumberOfInvoices(state) {
    return Object.keys(state.invoices).length;
  },
  getInvoice: (state) => (id) => {
    return state.invoices.find(invoice => invoice.id === id);
  },
  getInvoiceStatus: (state) => (id) => {
    const invoice = state.invoices.find(invoice => invoice.id === id);
    return invoice.status;
  },
  getIsMobile(state) {
    return state.isMobile;
  },
  getLightModeToggle(state) {
    return state.lightMode;
  },
  getShowFormToggle(state) {
    return state.showFormToggle;
  }
}