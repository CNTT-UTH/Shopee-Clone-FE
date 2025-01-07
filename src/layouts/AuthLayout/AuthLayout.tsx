import Footer from "../../Components/Footer"
import AuthHeader from "../../Components/RegisterHeader"

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
