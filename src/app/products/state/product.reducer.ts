import { Product } from './../product';
import * as fromRoot from '../../state/app.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number;
  products: Product[];
  error: string;
}

const initialState: ProductState = {
  showProductCode: false,
  currentProductId: 0,
  products: [],
  error: ''
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

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, id) => {
    if (id === 0) {
      return {
        id: 0,
        productName: '',
        productCode: 'NEW',
        description: '',
        starRating: 0
      } as Product;
    } else {
      return id ? state.products.find(p => p.id === id) : null;
    }
  }
);

export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

export function reducer(
  state = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.InitializeCurrentProduct:
      return { ...state, currentProductId: 0 };

    case ProductActionTypes.ToggleProductCode:
      return { ...state, showProductCode: action.payload };

    case ProductActionTypes.SetCurrentProductId:
      return { ...state, currentProductId: action.payload.id };

    case ProductActionTypes.LoadSuccess:
      return { ...state, products: action.payload, error: '' };

    case ProductActionTypes.LoadFail:
      return { ...state, error: action.payload };

    case ProductActionTypes.UpdateProductSuccess:
      const updatedProducts = state.products.map(p =>
        p.id === action.payload.id ? action.payload : p
      );
      return {
        ...state,
        products: updatedProducts,
        error: '',
        currentProductId: action.payload.id
      };

    case ProductActionTypes.UpdateProductFail:
      return { ...state, error: action.payload };

    default:
      return state;
  }
}
