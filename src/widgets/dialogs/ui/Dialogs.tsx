import AlertBox from './dialogs/Alert';
import EditPersonalInfoModal from './dialogs/EditPersonalInfo';
import ImageViewer from './dialogs/ImageViewer';
import LoginDialog from './dialogs/Login';
import OrderTrackingModal from './dialogs/OrderTracking';
import PasswordReset from './dialogs/PasswordReset';
import SignupDialog from './dialogs/Signup';

export function Dialogs() {
  return (
    <>
      <LoginDialog />
      <SignupDialog />
      <PasswordReset />
      <AlertBox />
      <ImageViewer />
      <OrderTrackingModal />
      <EditPersonalInfoModal />
    </>
  );
}
