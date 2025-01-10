import Header from "../../components/Header"
import Footer from "../../components/Footer"

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