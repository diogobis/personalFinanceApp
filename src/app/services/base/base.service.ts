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

  constructor(@Inject(String) collectionName: string) {
    this.pb = new PocketBase('http://127.0.0.1:8090');
    this.collection = this.pb.collection(collectionName);
  }

  public async get(
    options: RecordFullListOptions = {}
  ): Promise<RecordModel[] | undefined> {
    return this.collection.getFullList(options).catch(this.errorHandler);
  }

  public async getPaginated(
    page?: number | undefined,
    perPage?: number | undefined,
    options?: RecordListOptions | undefined
  ): Promise<ListResult<RecordModel> | undefined> {
    return this.collection
      .getList(page, perPage, options)
      .catch(this.errorHandler);
  }

  public async create(
    bodyParams?: { [key: string]: any } | FormData | undefined,
    options?: RecordOptions | undefined
  ): Promise<RecordModel | undefined> {
    return this.collection.create(bodyParams, options).catch(this.errorHandler);
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
