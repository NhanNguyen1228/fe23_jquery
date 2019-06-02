

var danhSachND = new DanhSachNguoiDung();

function Validation() {

    this.kiemTraTrungMaNV = function (input, spanId, message) {
        var check = !danhSachND.danhSachNguoiDung.some(function (item) {
            return input === item.taiKhoan;
        });

        if (check) { // Bị trùng
            getEle(spanId).innerHTML = "";
            getEle(spanId).style.display = "none";
            return true;
        }
        getEle(spanId).innerHTML = message;
        getEle(spanId).style.display = "block";
        return false;
    }

    this.kiemTraRong = function (input, spanId, message) {
        if (input === "") {
            getEle(spanId).innerHTML = message;
            getEle(spanId).style.display = "block";
            getEle(spanId).style.color = "red";
            return false;
        } else {
            getEle(spanId).innerHTML = "";
            getEle(spanId).style.display = "none";
            return true;
        }
    };

    this.kiemTraChuoi = function (input, spanId, message) {
        var pattern = new RegExp(
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
        if (pattern.test(input)) {
            getEle(spanId).innerHTML = "";
            getEle(spanId).style.display = "none";
            return true;
        }
        getEle(spanId).innerHTML = message;
        getEle(spanId).style.display = "block";
        return false;
    };

    this.kiemTraEmail = function (input, spanId, message) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (input.match(mailformat)) {
            getEle(spanId).innerHTML = "";
            getEle(spanId).style.display = "none";
            return true;
        }
        getEle(spanId).innerHTML = message;
        getEle(spanId).style.display = "block";
        return false;
    };

    this.kiemTraSo = function (input, spanId, message) {
        var numbers = /^[0-9]+$/;
        if (input.match(numbers)) {
            getEle(spanId).innerHTML = "";
            getEle(spanId).style.display = "none";
            return true;
        }
        getEle(spanId).innerHTML = message;
        getEle(spanId).style.display = "block";
        return false;
    }

}

function getEle(id) {
    return document.getElementById(id);
}

