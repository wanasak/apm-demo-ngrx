import { Product } from './../product';
import { ProductActions, ProductActionTypes } from './product.actions';

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
