import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

export const Header = () => {
  return (
    <div>
      {/* PC Header */}
      <DesktopHeader />
      {/* Mobile Header */}
      <MobileHeader />
    </div>
  );
};
