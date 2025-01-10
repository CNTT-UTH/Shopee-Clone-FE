import Footer from "../../components/Footer"
import AuthHeader from "../../components/AuthHeader"

interface Props {
    children?: React.ReactNode
}

export default function AuthLayout({children} : Props) {
  return (
    <div className="">
      <AuthHeader />
      {children}
      <Footer />
    </div>
  )
}
