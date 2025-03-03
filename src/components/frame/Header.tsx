import Link from 'next/link';
import { MobileHeader } from './MobileHeader';
import { DesktopMenubar } from './DesktopHeader';

export const Header = () => {
  return (
    <div className='fixed top-0 left-0 right-0 flex items-center justify-between w-full h-14 bg-point text-center px-10 py-4 z-30'>
      <Link href={'/'}>
        <h1 className='text-second text-lg md:text-2xl font-bold'>LOGO</h1>
      </Link>

      {/* PC Header */}
      <DesktopMenubar />
      {/* Mobile Header */}
      <MobileHeader />
    </div>
  );
};
