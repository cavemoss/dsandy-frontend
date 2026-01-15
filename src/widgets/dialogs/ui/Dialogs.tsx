import AlertBox from './dialogs/Alert';
import ImageViewer from './dialogs/ImageViewer';
import LoginDialog from './dialogs/Login';
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
    </>
  );
}
