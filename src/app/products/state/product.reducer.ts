import { Product } from './../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
}

const initialState: ProductState = {
  showProductCode: false,
  currentProductId: 0,
  products: []
};

const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getCurrentProduct = createSelector(
  getCurrentProductId,
  getProducts,
  (id, products) => products.find(p => p.id === id)
);

export function reducer(state = initialState, action): ProductState {
  switch (action.type) {
    case 'TOGGLE_PRODUCT_CODE':
      return { ...state, showProductCode: action.payload };

    default:
      return state;
  }
}
