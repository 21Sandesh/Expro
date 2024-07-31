import Link from 'next/link';
import { Button } from '../../components/ui/button';
import { authOptions } from '../../lib/auth';
import { getServerSession } from 'next-auth';
import UserAccountNav from './UserAccountNav';

const Navbar = async () => {
    const session = await getServerSession(authOptions);
    return (
        <div className="p-5 flex justify-between items-center border shadow-sm">
          <Link href={"/"}>
            {/* <Image src={'./chart-donut.svg'} alt='logo' width={40} height={25}/> */}
            <span className='text-blue-800 font-bold text-xl'>Expro</span>
          </Link>
        <div className="flex gap-3  items-center">
          <Link href={"/dashboard"}>
            <Button variant="outline" className="rounded-full">
              Dashboard
            </Button>
          </Link>
          {session?.user?.email ? (
            <UserAccountNav />
              ) : (<Link href={"/sign-in"}>
                <Button className="rounded-full">Get Started</Button>
          </Link>) }
        </div>
    </div>
    );
}

export default Navbar;