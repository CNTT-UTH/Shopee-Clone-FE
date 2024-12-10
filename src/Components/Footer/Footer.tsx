import { Link } from "react-router-dom";
import visa1 from '../../assets/images/visa1.png'
import visa2 from '../../assets/images/visa2.png'
import visa3 from '../../assets/images/visa3.png'
import visa4 from '../../assets/images/visa4.png'

export default function Footer() {
    return (
        <footer className="border-t-2 border-t-gray py-16 mt-20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-1">
                        <span>
                            © 2024 Shopee. Tất cả các quyền được bảo lưu.
                        </span>
                    </div>
                    <div className="lg:col-span-2">
                        Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan |
                        Malaysia | Việt Nam | Philippines | Brazil | México | Colombia |
                        Chile | Đài Loan
                    </div>
                    <div className="mx-auto col-span-3 flex gap-4 mt-20">
                      <Link to="#!" className="text-md">Chính sách bảo mật</Link>|
                      <Link to="#!" className="text-md">Quy chế hoạt động</Link>|
                      <Link to="#!" className="text-md">Chính sách vận chuyển</Link>|
                      <Link to="#!" className="text-md">Chính sách trả hàng và hoàn tiền</Link>
                    </div>
                    <div className="mx-auto col-span-3 flex gap-10 mt-10">
                      <Link to="#!"><img src={visa1} alt="" /></Link>
                      <Link to="#!"><img src={visa2} alt="" /></Link>
                      <Link to="#!"><img src={visa3} alt="" /></Link>
                      <Link to="#!"><img src={visa4} alt="" /></Link>
                    </div>
                    <div className="col-span-3 ext-sm text-center mt-10">
                      Công ty TNHH Shopee
                    </div>
                    <div className="col-span-3 text-sm text-center mt-6">
                        © 2015 - Bản quyền thuộc về Công ty TNHH Shopee
                    </div>
                </div>
            </div>
        </footer>
    );
}

