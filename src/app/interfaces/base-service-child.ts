import {
  CommonOptions,
  ListResult,
  RecordFullListOptions,
  RecordListOptions,
  RecordModel,
  RecordOptions,
} from 'pocketbase';

export interface BaseServiceChild {
  get(options?: RecordFullListOptions): Promise<RecordModel[] | undefined>;

  getPaginated(
    page?: number | undefined,
    perPage?: number | undefined,
    options?: RecordListOptions | undefined
  ): Promise<ListResult<RecordModel> | undefined>;

  create(
    bodyParams?: { [key: string]: any } | FormData | undefined,
    options?: RecordOptions | undefined
  ): Promise<RecordModel | undefined>;

  delete(
    id: string,
    options?: CommonOptions | undefined
  ): Promise<boolean | undefined>;
}
