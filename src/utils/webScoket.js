/*
 * @Author: lw
 * @Date: 2022-11-08 10:44:23
 * @LastEditTime: 2022-11-08 14:47:32
 * @LastEditors: lw
 * @Description: 
 * @FilePath: \callCenter\src\utils\webScoket.js
 */
// scoket.js
const webSocketurl = import.meta.env.VITE_APP_WEBSOCKET_BASE_URL; // 利用node环境变量设置scoket path

class WebSocketUtil{
	constructor(wspath){
		let protocol =webSocketurl.includes("https://")?webSocketurl.replace("https://","wss://"):webSocketurl.replace("http://","wss://");
		let wsuri = `${protocol}/${wspath?wspath:''}`
		// new 实例
		console.log("wsuri",wsuri)
		this.websock = new WebSocket(wsuri)
	}

	// 心跳检测
	heartCheck(){ 
		let self = this;
		if (this.timeoutObj) {
			clearInterval(this.timeoutObj)
		}
    	this.timeoutObj = setInterval(function(){
      		// 这里发送一个心跳，后端收到后，返回一个心跳消息，
      		// onmessage拿到返回的心跳就说明连接正常
      		if (self.readyState() != 1) {
        		clearInterval(self.timeoutObj)
			}
			self.websock.send("HeartBeat");
			// 发送心跳检测
      		console.log("HeartBeat");
		}, 5000)
  	}

  	// 实例创建后自定义创建 handler
  	on(funName,handler){
		this.websock[`on${funName}`] = handler
		// 暴露onmessage、onclose、onopen、onerror方法
	}
	// 发送scoket数据
	send(msg){
		this.websock.send(msg)
	}

	// 监听websock链接状态
	readyState(){
	// 获取webscoket实例链接状态 0：正在建立连接连接,还没有完成 1：连接成功,可以进行通信 2：连接正在进行关闭握手,即将关闭 3：连接已经关闭或者根本没有建立
		return this.websock.readyState;
	}
}

// 导出实例
export default WebSocketUtil