import { Inject, Injectable } from '@angular/core';
import PocketBase, {
  CommonOptions,
  ListResult,
  RecordFullListOptions,
  RecordListOptions,
  RecordModel,
  RecordOptions,
} from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  protected pb;
  protected collection;
  private ls: Storage;

  constructor(@Inject(String) collectionName: string) {
    this.pb = new PocketBase('http://127.0.0.1:8090');
    this.collection = this.pb.collection(collectionName);
    this.ls = localStorage;
  }

  public async get(
    options: RecordFullListOptions = {},
    hasUser: boolean = true
  ): Promise<RecordModel[] | undefined> {
    options = hasUser ? this.handleUserParameterFilter(options) : options;
    return this.collection.getFullList(options).catch(this.errorHandler);
  }

  private handleUserParameterFilter(
    options: RecordListOptions
  ): RecordListOptions {
    let loggedUser = JSON.parse(this.ls.getItem('pocketbase_auth') as string);

    if (Object.keys(options).length === 0) {
      return { filter: `user_id = '${loggedUser.model.id}'` };
    } else if (
      options.hasOwnProperty('filter') &&
      !options.filter?.includes('user_id')
    ) {
      options.filter += ` && user_id = '${loggedUser.model.id}'`;
      return options;
    } else {
      return { filter: `user_id = '${loggedUser.model.id}'` };
    }
  }

  public async getPaginated(
    page?: number | undefined,
    perPage?: number | undefined,
    options: RecordListOptions = {},
    hasUser: boolean = true
  ): Promise<ListResult<RecordModel> | undefined> {
    options = hasUser ? this.handleUserParameterFilter(options) : options;
    return this.collection
      .getList(page, perPage, options)
      .catch(this.errorHandler);
  }

  public async create(
    bodyParams: { [key: string]: any } | FormData = {},
    options?: RecordOptions | undefined,
    hasUser: boolean = true
  ): Promise<RecordModel | undefined> {
    bodyParams = hasUser
      ? this.handleUserParameterCreate(bodyParams)
      : bodyParams;

    return this.collection.create(bodyParams, options).catch(this.errorHandler);
  }

  private handleUserParameterCreate(
    bodyParams?: { [key: string]: any } | FormData
  ): { [key: string]: any } | FormData {
    let loggedUser = JSON.parse(this.ls.getItem('pocketbase_auth') as string);
    if (bodyParams instanceof FormData) {
      bodyParams.append('user_id', loggedUser.model.id);
      return bodyParams;
    }

    bodyParams = { ...bodyParams, user_id: loggedUser.model.id };
    return bodyParams;
  }

  public async delete(
    id: string,
    options?: CommonOptions | undefined
  ): Promise<boolean | undefined> {
    return this.collection.delete(id, options).catch(this.errorHandler);
  }

  protected errorHandler(error: any) {
    console.error(error);
    return undefined;
  }
}
