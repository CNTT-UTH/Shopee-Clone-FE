import HeaderRegisterShop from "@uth/components/HeaderRegisterShop"
import Footer from "../../components/Footer"

interface Props {
    children?: React.ReactNode
}

export default function SellerLayout({children} : Props) {
  return (
    <div className="">
      <HeaderRegisterShop />
      {children}
      <Footer />
    </div>
  )
}