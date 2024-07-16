export class CryptoWebSocketService {
    private socket: WebSocket | null = null;
  
    constructor(private url: string) {}
  
    public connect() {
      this.socket = new WebSocket(this.url);
  
      this.socket.onopen = () => {
        console.log('WebSocket connection opened');
      };
  
      this.socket.onmessage = (event: MessageEvent) => {
        this.handleMessage(event);
      };
  
      this.socket.onerror = (error: Event) => {
        console.error('WebSocket error:', error);
      };
  
      this.socket.onclose = (event: CloseEvent) => {
        console.log('WebSocket connection closed:', event);
      };
    }
  
    private handleMessage(event: MessageEvent) {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      // Custom event handling can be added here
    }
  
    public setOnMessageHandler(handler: (event: MessageEvent) => void) {
      if (this.socket) {
        this.socket.onmessage = handler;
      }
    }
  
    public disconnect() {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  