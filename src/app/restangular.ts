import { CONFIG } from './consts/config';
import { TokenNotVerifiedModalComponent } from './modals/token-not-verified-modal.component';

export function RestangularConfigFactory(RestangularProvider, modalService, authService) {
    RestangularProvider.setBaseUrl(API_URL);
    RestangularProvider.setDefaultHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('idToken'),
        IsStudent: authService.isAccTypeStudent
    });

    // Interceptor for all REST API calls
    RestangularProvider.addResponseInterceptor((data) => {
        if (data.success !== false) {
            return data;
        }
        // If token expired or related - show modal and logout
        if (data.errorCode === CONFIG.ERRORS.TOKEN_NOT_VERIFIED) {
            const modalRef = modalService.open(
                TokenNotVerifiedModalComponent,
                {backdrop: 'static', keyboard: false}
            );
            modalRef.result.then(() => {
                authService.doLogOut();
            });
            modalRef.componentInstance.body = data.errorMessage;
        }
        return [];
    });
}
