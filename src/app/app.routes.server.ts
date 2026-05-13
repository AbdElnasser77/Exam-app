import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'diplomas/:diplomaId/exams', renderMode: RenderMode.Server },
  { path: 'diplomas/:diplomaId/exams/:examId', renderMode: RenderMode.Server },
  { path: 'diplomas/:diplomaId/exams/:examId/results/:submissionId', renderMode: RenderMode.Server },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
