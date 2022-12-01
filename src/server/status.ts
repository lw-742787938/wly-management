/*
 * @Author: lw
 * @Date: 2022-11-01 14:14:43
 * @LastEditTime: 2022-11-03 09:34:41
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\server\status.ts
 */
export const showMessage = (status:number|string) : string => {
  let message:string = "";
  switch (status) {
      case 'EXECUTE_SUCCESS':
          message = "交易成功";
          break;
      case 'EXECUTE_PROCESSING':
          message = "交易处理中";
          break;
      case 'EXECUTE_FAIL':
          message = "交易失败";
          break;
      case 'INTERNAL_ERROR':
          message = "系统内部错误";
          break;
      case 'SERVICE_NOT_FOUND_ERROR':
          message = "服务不存在";
          break;
      case 'PARAMETER_ERROR':
          message = "参数错误";
          break;
      case 'PARAM_FORMAT_ERROR':
          message = "参数格式错误";
          break;
      case 'UNAUTHENTICATED':
          message = "认证(签名)错误";
          break;
      case 'UNAUTHORIZED':
          message = "未授权的服务";
          break;
      case 'REQUEST_NO_NOT_UNIQUE':
          message = "商户请求号不唯一";
          break;
      case 'FIELD_NOT_UNIQUE':
          message = "对象字段重复";
          break;
      case 'REDIRECT_URL_NOT_EXIST':
          message = "重定向服务需设置redirectUrl";
          break;
      case 'PARTNER_NOT_REGISTER':
          message = "合作伙伴没有注册";
          break;
      case 'PARTNER_NOT_PRODUCT':
          message = "商户没有配置产品";
          break;
      case 'UNSUPPORTED_SECHEME':
          message = "不支持的请求协议";
          break;
      default:
          message = `请重试或检查网络！`;
  }
  return `${message}`;
};