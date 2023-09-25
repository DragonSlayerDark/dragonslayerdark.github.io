import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertResult } from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

 Swal3 = Swal.mixin({
    customClass: {
      container: 'swalcontainer',
      popup: 'swalpopup',
      icon: 'swalicon',
      title: 'swaltitle',
      confirmButton: 'swalbutton swalaccept',
      cancelButton: 'swalbutton swalcnl',

    },
    buttonsStyling: false
  })


  sendAlert(icon: SweetAlertIcon, title: string, text: string) {
    this.Swal3.fire({
      icon,
      title,
      text,
      timer: 4000,
      showConfirmButton: false
      // footer: '<a href>Why do I have this issue?</a>',
    });
  }

  sendConfirmation(icon: SweetAlertIcon, title: string, text: string): Promise<SweetAlertResult> {
    return new Promise((res, rej) => {
      this.Swal3.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      }).then((result) => {
        res(result);
      });
    });
  }

  sendInput(title: string, typeInput: 'text' | 'email' | 'password' | 'number' | 'tel' | 'range' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'file' | 'url' = "text", inputValidator?: (value: any) => string, confirm = "Confirm", cancel = "Cancel"): Promise<SweetAlertResult> {
    return Swal
      .fire({
        title,
        input: typeInput,
        showCancelButton: true,
        confirmButtonText: confirm,
        cancelButtonText: cancel,
        inputValidator
      });

  }

  downloadURI(uri: string, name: string) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }


  dateInput(defaultDate: string): Promise<{ date: string }> {
    return new Promise((resolve, reject) => {
      const inputDate = (defaultValue: string) => `
      <input
        id="datepicker"
        type="date"
        max="${new Date().toISOString().split('T')[0]}"
        value="${defaultValue}"
      />
    `;

      const showInput = (defaultValue: string) => {
        this.Swal3.fire({
          title: 'Seleccione Fecha de aplicacion',
          html: inputDate(defaultValue),
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const selectedDate = (document.getElementById('datepicker') as HTMLInputElement).value;
            const now = new Date();
            const chosenDate = new Date(selectedDate);

            if (chosenDate > now) {
              // reset the value of the input element to the defaultValue
              (document.getElementById('datepicker') as HTMLInputElement).value = defaultValue;

              this.Swal3.fire({
                icon: 'error',
                title: 'Error',
                text: 'La fecha seleccionada no puede ser futura',
              });

              return false;
            } else {
              return { date: selectedDate };
            }
          }
        }).then((result) => {
          if (result.isConfirmed && typeof result.value === 'object') {
            resolve(result.value);
          } else {
            reject(new Error('User cancelled date input'));
          }
        });
      };

      const defaultDate = new Date().toISOString().split('T')[0]; // get the current date as the default value
      showInput(defaultDate); // pass the default date value to the showInput function
    });
  }






}

export class Swal3{

  Swal3 = Swal.mixin({
    customClass: {
      container: 'swalcontainer',
      popup: 'swalpopup',
      icon: 'swalicon',
      title: 'swaltitle',
      confirmButton: 'swalbutton swalaccept',
      cancelButton: 'swalbutton swalcnl',

    },
    buttonsStyling: false
  })


}
