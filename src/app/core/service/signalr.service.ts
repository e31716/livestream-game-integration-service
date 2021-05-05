import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ConfigService } from '@core/config/config.service';
import { Observable } from 'rxjs';

@Injectable()
export class SignalrService {
  public livestreamapiHubConnection: signalR.HubConnection;
  private chatHubConnection: signalR.HubConnection;

  constructor(
    private configService: ConfigService) { }

  /**
   * Get Connect
   * @param id: Channel ID
   */
  public connectHub(url: string, connectSuccessCB?: any, reconnectSuccessCB?: any) {
    this[url + 'HubConnection'] = new signalR.HubConnectionBuilder()
      .withUrl(`${this.configService.API_URL_Origin}/${url}`, {
        // skipNegotiation: true,
        // transport: signalR.HttpTransportType.WebSockets,
        accessTokenFactory: () => {
          return this.configService.getAuthToken();
        }
      })
      .withAutomaticReconnect()
      .build();

    this[url + 'HubConnection']
      .start()
      .then(() => {
        console.log(`${url} Connection started`);
        if (connectSuccessCB !== undefined) { connectSuccessCB(); }
      })
      .catch(err => console.log('Error while starting connection: ' + err));


    // handler when reconnected
    this[url + 'HubConnection']
      .onreconnected((connectionId?: string) => {
        console.log(`${url} Reconnected Successfully`);
        if (reconnectSuccessCB !== undefined) { reconnectSuccessCB(); }
      });

    // handler when close connection
    this[url + 'HubConnection']
      .onclose(() => {
        console.log(`${url} Connection Closed`);
      });
  }

  /**
   * Connet to a channel and recieve data
   * @param url: hub name
   * @param id: Channel ID
   */
  public addListener(url: string, id: string, callback: any) {
    this[url + 'HubConnection'].on(id, callback);
  }

  /**
   * Send msg to server
   * @param url: hub name
   * @param id: Channel ID
   * @param msg: Content to server
   */
  public send(url: string, id: string, msg: any): void {
    if (msg === null) {
      this[url + 'HubConnection'].invoke(id);
    } else {
      this[url + 'HubConnection'].invoke(id, msg);
    }
  }
  /**
   * Stop signalr connection
   * @param url: hub name
   */
  public stopHub(url: string): void {
    this[url + 'HubConnection'].stop();
  }
}
