import { ProductService } from './../product.service';
import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as productActions from '../state/product.actions';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  @Effect()
  loadProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.Load),
    mergeMap(() =>
      this.productService.getProducts().pipe(
        map(res => new productActions.LoadSuccess(res)),
        catchError(err => of(new productActions.LoadFail(err)))
      )
    )
  );

  @Effect()
  updateProduct$ = this.actions$.pipe(
    ofType<productActions.UpdateProduct>(
      productActions.ProductActionTypes.UpdateProduct
    ),
    map(action => action.payload),
    mergeMap(product =>
      this.productService.updateProduct(product).pipe(
        map(res => new productActions.UpdateProductSuccess(res)),
        catchError(err => of(new productActions.UpdateProductFail(err)))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
