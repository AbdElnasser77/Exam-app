import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authGuard: CanMatchFn = () => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;
  return !!localStorage.getItem('token')
    ? true
    : inject(Router).createUrlTree(['/auth/login']);
};

export const guestGuard: CanMatchFn = () => {
  if (!isPlatformBrowser(inject(PLATFORM_ID))) return true;
  return localStorage.getItem('token')
    ? inject(Router).createUrlTree(['/diplomas'])
    : true;
};
