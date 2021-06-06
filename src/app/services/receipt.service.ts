import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Receipt } from '../models/receipt.model';
import { ReceiptType } from '../models/receiptType.enum';

@Injectable({
  providedIn: 'root'
})
export class ReceiptService {
  private url: string;

  constructor(private http: HttpClient
    , private router: Router) {
    this.url = environment.baseURL + 'receipt/';
  }

  getAllReceipt(receiptType: ReceiptType, fromDateTime: Date, toDateTime: Date, customerId: number = null, receiptStatus: boolean = null, pageNo: number = null, size: number = null) {
    let fromDateParsed: string = null;
    let toDateParsed: string = null;
    let searchParams = new HttpParams();

    if (receiptType == ReceiptType.ER || receiptType == ReceiptType.DR)
      searchParams = searchParams.append('receiptType', receiptType);

    if (fromDateTime != null)
      fromDateParsed = toDateTime.toJSON();
    if (toDateTime != null)
      toDateParsed = toDateTime.toJSON();

    searchParams = searchParams.append('fromDateTime', fromDateParsed);
    searchParams = searchParams.append('toDateTime', toDateParsed);

    if (customerId != null)
      searchParams = searchParams.append('customerId', customerId.toString());
    if (receiptStatus != null)
      searchParams = searchParams.append('receiptStatus', receiptStatus.toString());
    if (pageNo != null)
      searchParams = searchParams.append('pageNo', pageNo.toString());
    if (size != null)
      searchParams = searchParams.append('size', size.toString());

    this.http.get<{}>(this.url, { params: searchParams });
  }

  //{ 'status': string, 'message': string, 'allReceipt': { 'content': Receipt[], "pageable": { "sort": {}, offset: number, pageNumber: number, pageSize: number, } } }
  getReceipt(receiptId: number) {
    return this.http.get(this.url + receiptId);
  }

  createReceipt(receipt: Receipt) {
    return this.http.post(this.url, receipt);
  }

  deleteRecipt(receiptId: number) {
    return this.http.delete(this.url + receiptId);
  }

}
