import { Body, Inject, Injectable, Post } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { Payment } from './payment/entities/payment.entity';

@Injectable()
export class AppService {
  constructor(
    @Inject('PAYMENT_REPOSITORY')
    private paymentRepository: Repository<Payment>,
  ) { }
  getHello(): string {
    return 'Hello World!';
  }

  async payment(req) {
    var amount = req.amount ;
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl = 'http://localhost:5173';
    var ipnUrl = 'https://b44a-2405-4802-1f36-c110-85f-3e04-1432-c12d.ngrok-free.app';
    var requestType = "payWithMethod";
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';
    var rawSignature = "accessKey=" + accessKey + "&amount=" + amount + "&extraData=" + extraData + "&ipnUrl=" + ipnUrl + "&orderId=" + orderId + "&orderInfo=" + orderInfo + "&partnerCode=" + partnerCode + "&redirectUrl=" + redirectUrl + "&requestId=" + requestId + "&requestType=" + requestType;

    console.log("--------------------RAW SIGNATURE----------------")
    console.log(rawSignature)
    var signature = crypto.createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    console.log("--------------------SIGNATURE----------------")
    console.log(signature)

    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: "Test",
      storeId: "MomoTestStore",
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature
    });

    const option = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/create',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestBody)
      },
      data: requestBody
    }

    let result
    try {
      result = await axios(option);
      return result.data;
    } catch (error) {
      console.log(error)
    }
  }

  async paymentCallback(req) {
    console.log("call back nha");
    console.log(req.body);
    return req.body;
  }

  async check(req) {
    const { orderId } = req;

    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=MOMO&requestId=${orderId}`;

    const signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');

    const requestBody = JSON.stringify({
      partnerCode: 'MOMO',
      requestId: orderId,
      orderId: orderId,
      signature: signature,
      lang: 'vi',
    });

    // options for axios
    const options = {
      method: 'POST',
      url: 'https://test-payment.momo.vn/v2/gateway/api/query',
      headers: {
        'Content-Type': 'application/json',
      },
      data: requestBody,
    };

    const result = await axios(options);
    let paymentEntity = await this.paymentRepository.findOneBy({ orderId: orderId });
    if (paymentEntity) {
      paymentEntity.message = result.data.message;
      paymentEntity.resultCode = result.data.resultCode;
      await this.paymentRepository.save(paymentEntity);
    }
    return result.data;
  }
}
