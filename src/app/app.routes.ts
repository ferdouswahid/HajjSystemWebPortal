import { Route } from '@angular/router';
import { AuthGuard } from './service/AuthGuard';


export const routeList: Route[] = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', loadComponent: () => import('./module/login/LoginComp').then(m => m.LoginComp) },

  { path: 'customer-user-create', loadComponent: () => import('./module/customer_user_creation/CustomerUserCreationComp').then(m => m.CustomerUserCreationComp) },

  { path: 'company-user-create', loadComponent: () => import('./module/company_user_creation/CompanyUserCreationComp').then(m => m.CompanyUserCreationComp) },

  {
    path: 'authenticated',
    canActivate: [AuthGuard],
    loadComponent: () => import('./module/authenticated/AuthenticatedComp').then(m => m.AuthenticatedComp),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./module/authenticated/dashboard/DashboardComp').then(m => m.DashboardComp)
      },
      {
        path: 'app-setup',
        loadComponent: () => import('./module/authenticated/app_setup/AppSetupComp').then(m => m.AppSetupComp)
      },
      {
        path: 'season',
        loadComponent: () => import('./module/authenticated/season/SeasonComp').then(m => m.SeasonComp)
      },
      {
        path: 'company-create',
        loadComponent: () => import('./module/authenticated/company_create/CompanyCreate').then(m => m.CompanyCreate)
      },
      {
        path: 'company-update',
        loadComponent: () => import('./module/authenticated/company_update/CompanyUpdate').then(m => m.CompanyUpdate)
      },
      {
        path: 'location',
        loadComponent: () => import('./module/authenticated/location/LocationComp').then(m => m.LocationComp)
      },
      {
        path: 'meal-type',
        loadComponent: () => import('./module/authenticated/meal_type/MealTypeComp').then(m => m.MealTypeComp)
      },
      {
        path: 'airline-route',
        loadComponent: () => import('./module/authenticated/airline_route/AirlineRouteComp').then(m => m.AirlineRouteComp)
      },
      {
        path: 'vehicle-contract',
        loadComponent: () => import('./module/authenticated/vehicle_contract/VehicleContractComp').then(m => m.VehicleContractComp)
      },
      {
        path: 'vehicle-route',
        loadComponent: () => import('./module/authenticated/vehicle_route/VehicleRouteComp').then(m => m.VehicleRouteComp)
      },
      {
        path: 'vendor',
        loadComponent: () => import('./module/authenticated/vendor/VendorComp').then(m => m.VendorComp)
      }
      ]
      }

      ];
