import { Injectable } from '@angular/core';
import { BaseService } from '../base/base.service';
import { FileOptions } from 'pocketbase';

@Injectable({
  providedIn: 'root',
})
export class FileService extends BaseService {
  constructor() {
    super('f');
  }

  public getFileUrl(
    record: { [key: string]: any },
    filename: string,
    queryParams?: FileOptions | undefined
  ): string {
    return this.pb.files.getUrl(record, filename, queryParams);
  }
}
