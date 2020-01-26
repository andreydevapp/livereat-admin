import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HerramientasService {

  constructor(public loadingController: LoadingController,
    public toastController: ToastController) { }
  
  // carga
  loading:any;

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message:'Por favor espere'
    });
    return await this.loading.present();
  }

  dismissLoading(){
    this.loading.dismiss();
  }

  //alerts
  async presentAlert(message) {
    const toast = await this.toastController.create({
      message,
      duration: 5000,
      buttons: [
        {
          text: 'Cerrar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
