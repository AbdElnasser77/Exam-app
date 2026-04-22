import { isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const isLoggedInGuard: CanActivateFn = (route, state) => {
  if (isPlatformServer(inject(PLATFORM_ID))) return true;

  return localStorage.getItem('token') ? inject(Router).createUrlTree(['/diplomas'])  : true ;
};
