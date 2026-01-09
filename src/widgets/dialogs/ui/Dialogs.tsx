import ImageViewer from './dialogs/ImageViewer';
import LoginDialog from './dialogs/Login';
import SignupDialog from './dialogs/Signup';

export function Dialogs() {
  return (
    <>
      <LoginDialog />
      <SignupDialog />
      <ImageViewer />
    </>
  );
}
