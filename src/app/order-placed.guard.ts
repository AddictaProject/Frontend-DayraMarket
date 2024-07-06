import { CanActivateFn, Router } from '@angular/router';
import { OrderService } from './Services/OrderService/order.service';
import { inject } from '@angular/core';

export const orderPlacedGuard: CanActivateFn = (route, state) => {
  let isOrderPlaced=localStorage.getItem('orderPlaced');
  const router=inject(Router)
  if(isOrderPlaced){
    return true
  }
  router.navigate(["/"])
  return false

};
