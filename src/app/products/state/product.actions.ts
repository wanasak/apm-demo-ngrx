import { Action } from '@ngrx/store';
import { Product } from '../product';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 */
export enum ProductActionTypes {
  ToggleProductCode = '[Product] ToggleProductCode',
  SetCurrentProductId = '[Product] SetCurrentProductId',
  ClearCurrentProduct = '[Product] ClearCurrentProduct',
  InitializeCurrentProduct = '[Product] InitializeCurrentProduct',
  Load = '[Product] Load',
  LoadSuccess = '[Product] LoadSuccess',
  LoadFail = '[Product] LoadFail',
  UpdateProduct = '[Product] UpdateProduct',
  UpdateProductSuccess = '[Product] UpdateProductSuccess',
  UpdateProductFail = '[Product] UpdateProductFail'
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 */
export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.ToggleProductCode;

  constructor(public payload: boolean) {}
}

export class SetCurrentProductId implements Action {
  readonly type = ProductActionTypes.SetCurrentProductId;

  constructor(public payload: { id: number }) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.ClearCurrentProduct;
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.InitializeCurrentProduct;
}

export class Load implements Action {
  readonly type = ProductActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LoadSuccess;

  constructor(public payload: Product[]) {}
}

export class LoadFail implements Action {
  readonly type = ProductActionTypes.LoadFail;

  constructor(public payload: string) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: Product) {}
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: Product) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;

  constructor(public payload: string) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type ProductActions =
  | ToggleProductCode
  | SetCurrentProductId
  | ClearCurrentProduct
  | InitializeCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail
  | UpdateProduct
  | UpdateProductSuccess
  | UpdateProductFail;
