import { Injectable } from "@angular/core";
import Swal from "sweetalert2";

@Injectable({ providedIn: 'root' })
export class SwalService {

    constructor() { }

    alertQuestion() {

    }

   infoError(title: string, message: string, method: any) {
        return Swal.fire({
            title: title,
            text: message,
            icon: "error",
            showCloseButton: false,
            showCancelButton: false,
            allowOutsideClick: false
        }).then(result => {
            if (result.isConfirmed && method) {
                method();
            }
        });
    }
}