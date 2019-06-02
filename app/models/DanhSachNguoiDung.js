function DanhSachNguoiDung() {
    this.danhSachNguoiDung = [];

    this.themNguoiDung = function (nguoiDung) {
        this.danhSachNguoiDung.push(nguoiDung);
    };

    this.layThongTinNguoiDung = function (taiKhoan) {
        return this.danhSachNguoiDung.find(function (item) {
            return taiKhoan === item.taiKhoan;
        })
    };

    this.capNhatNguoiDung = function (nguoiDung) {
        this.danhSachNguoiDung.map(function (item) {
            if (nguoiDung.taiKhoan === item.taiKhoan) {
                item.hoTen = nguoiDung.hoTen;
                item.matKhau = nguoiDung.matKhau;
                item.email = nguoiDung.email;
                item.sdt = nguoiDung.sdt;
            }
        })
    };

    this.xoaNguoiDung = function (taiKhoan) {
        let index = this.danhSachNguoiDung.findIndex(function (item) {
            return taiKhoan === item.taiKhoan;
        })
        
        this.danhSachNguoiDung.splice(index, 1);
    };

    this.timKiemNguoiDung = function (textFind) {
        var result = [];
        this.danhSachNguoiDung.map(function (item) {
            if (item.hoTen.toLowerCase().indexOf(textFind.toLowerCase()) > -1) {
                result.push(item);
            }
        })
        return result;
    };
}