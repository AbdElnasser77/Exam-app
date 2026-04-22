import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanMatchFn, Router } from '@angular/router';

export const authRequiredGuard: CanMatchFn = () => {

  if(isPlatformServer(inject(PLATFORM_ID))) return true;

  return !!localStorage.getItem('token') ? true : inject(Router).createUrlTree(['/auth/login']);
};
