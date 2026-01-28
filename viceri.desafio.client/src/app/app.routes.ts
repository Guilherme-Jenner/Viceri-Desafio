import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'ListarHeroi',
        pathMatch: 'full'
    },
    {
        path: 'ListarHeroi',
        loadComponent: () => import('./features/heroi/lista-heroi/lista-heroi').then(c => c.ListaHeroi)
    },
    {
        path: 'CriarHeroi',
        loadComponent: () => import('./features/heroi/form-heroi/form-heroi').then(c => c.FormHeroi)
    },
    {
        path: 'EditarHeroi/:id',
        loadComponent: () => import('./features/heroi/form-heroi/form-heroi').then(c => c.FormHeroi)
    },
    {
        path: 'VerHeroi/:id',
        loadComponent: () => import('./features/heroi/form-heroi/form-heroi').then(c => c.FormHeroi)
    }
];
