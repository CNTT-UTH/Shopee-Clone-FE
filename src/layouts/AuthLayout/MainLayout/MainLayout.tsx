import Header from "../../../Components/Header"
import Footer from "../../../Components/Footer"

interface Props {
    children?: React.ReactNode
}

export default function AuthLayout({children} : Props) {
  return (
    <div className="">
      <Header />
      {children}
      <Footer />
    </div>
  )
}