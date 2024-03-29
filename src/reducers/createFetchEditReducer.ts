import { RequestError } from "@thepalaceproject/web-opds-client/lib/DataFetcher";
import ActionCreator from "../actions";
import { Action } from "redux";

export interface FetchEditState<T> {
  data: T | null;
  isFetching: boolean;
  isEditing: boolean;
  fetchError: RequestError | null;
  formError?: RequestError | null;
  isLoaded: boolean;
  responseBody?: string;
  successMessage?: string;
}

export interface FullAction extends Action {
    error?: RequestError | String;
    data?: Object;
    url?: String;
}

export interface FetchEditReducer<T> {
  (state: FetchEditState<T>, action: FullAction): FetchEditState<T>;
}

export default<T> (fetchPrefix: string, editPrefix?: string): FetchEditReducer<T> => {
  const initialState: FetchEditState<T> = {
    data: null,
    isFetching: false,
    isEditing: false,
    fetchError: null,
    formError: null,
    isLoaded: false,
    responseBody: null,
    successMessage: null
  };

  const fetchEditReducer = (state: FetchEditState<T> = initialState, action: FullAction): FetchEditState<T> => {
    switch (action.type) {
      case `${fetchPrefix}_${ActionCreator.REQUEST}`:
        return Object.assign({}, state, {
          data: null,
          isLoaded: false,
          isFetching: true,
          fetchError: null,
          formError: null,
          responseBody: null
        });

      case `${fetchPrefix}_${ActionCreator.FAILURE}`:
        return Object.assign({}, state, {
          fetchError: action.error,
          formError: null,
          isFetching: false,
          isLoaded: true
        });

      case `${fetchPrefix}_${ActionCreator.LOAD}`:
        return Object.assign({}, state, {
          data: action.data,
          isFetching: false,
          isLoaded: true
        });

      default:

        if (editPrefix) {
          switch (action.type) {
            case `${editPrefix}_${ActionCreator.REQUEST}`:
              return Object.assign({}, state, {
                isEditing: true,
                fetchError: null,
                formError: null,
                responseBody: null,
                successMessage: null
              });

            case `${editPrefix}_${ActionCreator.SUCCESS}`:
              return Object.assign({}, state, {
                isEditing: false,
                fetchError: null,
                formError: null,
                responseBody: null,
                successMessage: null
              });

            case `${editPrefix}_${ActionCreator.FAILURE}`:
              return Object.assign({}, state, {
                isEditing: false,
                formError: action.error
              });

            case `${editPrefix}_${ActionCreator.LOAD}`:
              return Object.assign({}, state, {
                responseBody: action.data,
                successMessage: action.data,
                formError: null
              });

            default:
              return state;
          }
        }
        return state;
    }
  };
  return fetchEditReducer;
};
