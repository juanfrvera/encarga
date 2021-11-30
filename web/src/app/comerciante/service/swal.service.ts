import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class SwalService {
  private static readonly defaultOptions: SweetAlertOptions = {
    buttonsStyling: false,
    customClass: {
      cancelButton: 'btn btn-outline-secondary m-1 cancel-button',
      confirmButton: 'btn btn-primary bg-gradient text-white fw-bold m-1 confirm-button',
    },
    reverseButtons: true,
  };

  public static readonly errorColor = 'red';

  /**
  * Function to display a SweetAlert2 popup, with an object of options, all being optional.
  * See the `SweetAlertOptions` interface for the list of accepted fields and values.
  *
  * Example:
  * ```
  * Swal.fire({
  *   title: 'Auto close alert!',
  *   text: 'I will close in 2 seconds.',
  *   timer: 2000
  * })
  * ```
  */
  fire<T = any>(options: SweetAlertOptions<T>) {
    // If objects have a property with the same name,
    // then the right-most object property overwrites the previous one.
    const mergedOptions: SweetAlertOptions<T> = {
      ...SwalService.defaultOptions,
      ...options
    }

    return Swal.fire<T>(mergedOptions);
  }

  /**
     * Function to display a simple SweetAlert2 popup.
     *
     * Example:
     * ```
     * Swal.fire('The Internet?', 'That thing is still around?', 'question');
     * ```
     */
  fireDefault<T = any>(title?: string, html?: string, icon?: SweetAlertIcon) {
    return Swal.fire<T>(title, html, icon);
  }
}
