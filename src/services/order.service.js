class OrderService {
  get_orders(page, post) {
    return axios.post('general/order/allOrders?page=' + page, post)
  }
  order_details(id) {
    return axios.get('general/order/show/' + id)
  }
  change_status(id) {
    return axios.post('general/order/changeStatus/' + id, {})
  }
  cancel_order(id) {
    return axios.post('general/order/cancelOrder/' + id, {})
  }
  delete_order_item(id) {
    return axios.delete('general/order/deleteOrderItem/' + id)
  }
  change_order_item_quantity(data) {
    return axios.post('general/order/changeOrderItemQuantity', data)
  }
  bulk_change_status(data) {
    return axios.post('general/order/bulkchangeStatus', data)
  }
  edit_order(data) {
    return axios.post('general/order/updateOrder', data)
  }




  // order status
  get_order_status() {
    return axios.get('general/order_status')
  }
  add_order_status(data) {
    return axios.post('general/order_status/store', data)
  }
  edit_order_status(data) {
    return axios.post('general/order_status/update', data)
  }
  bulk_order_status(data) {
    return axios.post('general/order_status/bulkUpdate', data)
  }
  delete_order_status(id) {
    return axios.delete('general/order_status/delete/' + id)
  }
}
export default new OrderService();