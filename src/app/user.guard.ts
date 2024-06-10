import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './Services/UserService/user.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = (route, state) => {
  const authServices=inject(UserService)
  const router=inject(Router)
  if(authServices.userState){
    return true
  }
  else{
    router.navigate(["/login"])
    return false
  }
};
