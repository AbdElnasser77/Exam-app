import { inject, PLATFORM_ID } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { DiplomasService } from '../diplomas/services/diplomas.service';
import { catchError, of } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

export const diplomaResolver: ResolveFn<any> = (route, state) => {

  const diplomasService = inject(DiplomasService);
  const platformId = inject(PLATFORM_ID);

  const diplomaId = route.paramMap.get('diplomaId');

  if (!diplomaId) {
    return of(null);
  }

  let token = '';

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token') ?? '';
  }

  return diplomasService.getDiplomaById(token, diplomaId).pipe(
    catchError(() => of(null))
  );
};