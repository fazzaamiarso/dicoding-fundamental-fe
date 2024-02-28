import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export default class Toast {
  static error(message) {
    return Toastify({
      text: message,
      className: "toast toast__error",
    });
  }
  static success(message) {
    return Toastify({
      text: message,
      className: "toast toast__success",
    });
  }
}
