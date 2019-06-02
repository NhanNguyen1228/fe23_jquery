$(document).ready(function () {

    var danhSachND = new DanhSachNguoiDung();
    
    var validation = new Validation();

    getLocalStorage();

    $("#btnThemNguoiDung").click(function () {
        // Thay đổi title của modal.
        var title = "thêm người dùng";
        $(".modal-title").html(title);

        $("#TaiKhoan").removeAttr("disabled");

        // footer modal.
        var footer = `
            <button class='btn btn-success' id="btnThem"> Thêm </button>
            <button class="btn btn-danger" data-dismiss="modal" id="btnDong">Đóng</button>
        `
        $(".modal-footer").html(footer);
    })

    // $("#btnThem").click(function(){
    //     console.log(211412);
    // })

    // Vì button dc tạo sau khi trang index chạy nên phải ủy quyền lại cho body.
    $("body").delegate("#btnThem", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();

        var isValid = true;

        isValid &= validation.kiemTraRong(taiKhoan, "tbTaiKhoan", "(*) Vui lòng nhập tài khoản")
            && validation.kiemTraTrungMaNV(taiKhoan, "tbTaiKhoan", "(*) Ma nhan vien bi trung");
        isValid &= validation.kiemTraRong(hoTen, "tbHoTen", "(*) Vui lòng nhập họ tên")
            && validation.kiemTraChuoi(hoTen, "tbHoTen", "(*) Vui lòng không nhập số.");
        isValid &= validation.kiemTraRong(matKhau, "tbMatKhau", "(*) Vui lòng nhập mật khẩu");
        isValid &= validation.kiemTraRong(email, "tbEmail", "(*) Vui lòng nhập email")
            && validation.kiemTraEmail(email, "tbEmail", "(*) Email không hợp lệ.");
        isValid &= validation.kiemTraRong(sdt, "tbSoDT", "(*) Vui lòng nhập SDT")
            && validation.kiemTraSo(sdt, "tbSoDT", "(*) Vui lòng nhập ký tự là số");

        if(isValid){
            var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);
            danhSachND.themNguoiDung(nguoiDung);
    
            taoBang(danhSachND.danhSachNguoiDung);
    
            setLocalStorage();
    
            $("#btnDong").click();
    
            $("#TaiKhoan").val("");
            $("#HoTen").val("");
            $("#MatKhau").val("");
            $("#Email").val("");
            $("#SoDienThoai").val("");
        }  
    });

    function taoBang(danhsach) {
        var content = ``;
        danhsach.map(function (item, index) {
            content += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${item.taiKhoan}</td>
                    <td>${item.matKhau}</td>
                    <td>${item.hoTen}</td>
                    <td>${item.email}</td>
                    <td>${item.sdt}</td>
                    <td>
                        <button class="btn btn-primary" id="btnSua" 
                            data-taikhoan="${item.taiKhoan}" data-toggle="modal" data-target="#myModal">Sửa
                        </button>
                        <button class="btn btn-danger" id="btnXoa" 
                            data-taikhoan="${item.taiKhoan}">Xóa
                        </button>
                    </td>
                </tr>
            `
        })
        $("#tblDanhSachNguoiDung").html(content);
    }

    $("body").delegate("#btnSua", "click", function () {
        var title = "Cập nhật người dùng";
        $(".modal-title").html(title);

        var footer = `
            <button class="btn btn-primary" id="btnCapNhat">Cập nhật</button>
            <button class="btn btn-danger" id="btnHuy" data-dismiss="modal" >Đóng</button>
        `
        $(".modal-footer").html(footer);

        var taiKhoan = $(this).data("taikhoan");
        var nguoiDung = danhSachND.layThongTinNguoiDung(taiKhoan);

        $("#TaiKhoan").val(nguoiDung.taiKhoan);
        $("#HoTen").val(nguoiDung.hoTen);
        $("#MatKhau").val(nguoiDung.matKhau);
        $("#Email").val(nguoiDung.email);
        $("#SoDienThoai").val(nguoiDung.sdt);

        $("#TaiKhoan").attr("disabled", "true");
    })

    $("body").delegate("#btnCapNhat", "click", function () {
        var taiKhoan = $("#TaiKhoan").val();
        var hoTen = $("#HoTen").val();
        var matKhau = $("#MatKhau").val();
        var email = $("#Email").val();
        var sdt = $("#SoDienThoai").val();

        var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, sdt);

        danhSachND.capNhatNguoiDung(nguoiDung);

        taoBang(danhSachND.danhSachNguoiDung);

        setLocalStorage();

        $("#btnHuy").click();
    })

    $("body").delegate("#btnXoa", "click", function () {
        var taiKhoan = $(this).data("taikhoan");
        danhSachND.xoaNguoiDung(taiKhoan);
        
        taoBang(danhSachND.danhSachNguoiDung);
        setLocalStorage();
    })

    $("#txtSearch").keyup(function () {
        var textFind = $("#txtSearch").val();
        var result = danhSachND.timKiemNguoiDung(textFind);
        taoBang(result);
    })

    // Lưu dữ liệu xuống LocalStorage.
    function setLocalStorage() {
        localStorage.setItem("DSNguoiDung", JSON.stringify(danhSachND.danhSachNguoiDung));
    }

    function getLocalStorage() {
        if (localStorage.getItem("DSNguoiDung") != null) {
            danhSachND.danhSachNguoiDung = JSON.parse(localStorage.getItem("DSNguoiDung"));
            
            taoBang(danhSachND.danhSachNguoiDung);
        }
    }
})


// $("#id").css("display", "block");