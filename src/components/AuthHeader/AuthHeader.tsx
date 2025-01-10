import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo_auth.svg'
export default function AuthHeader() {
  return (
    <header className="py-5">
      <div className="mx-auto px-4 max-w-7xl">
        <nav className="flex items-center">
          <Link to="/" className='flex items-center gap-4'>
            <img src={logo} alt="" className='h-10 lg:h-14' />
            <p className="text-xl lg:text-2xl text-orange">Shopee</p>
          </Link>
        </nav>
      </div>
    </header>
  )
}