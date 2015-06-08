define([], function(){

  var Constants = function(){
    this.ORDER_STATUS_RECIEVED = "1";
    this.ORDER_STATUS_CONFIRMED = "2";
    this.ORDER_STATUS_CANCELLED_BY_VENDOR = "3";
    this.ORDER_STATUS_CANCELLED_BY_CUSTOMER = "4";
    this.ORDER_STATUS_PRINTING = "5";
    this.ORDER_STATUS_PACKING = "6";
    this.ORDER_STATUS_DISPATCH = "7";
    this.ORDER_STATUS_SHIPPED = "8";
    this.ORDER_STATUS_DELIVERED = "9";
    this.ORDER_STATUS_RETURN_CREATED = "10";
    this.ORDER_STATUS_RETURNED = "11";

  };
  return OrdersView;
});
