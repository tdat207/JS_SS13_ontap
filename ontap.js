// Dữ liệu ban đầu
let bookings = [
  {
    bookingCode: "CIN-001",
    customerName: "Nguyễn Văn An",
    movieTitle: "Ánh Trăng Cuối Phố",
    ticketCount: 2,
    pricePerTicket: 90000,
    totalAmount: 194400,
  },
  {
    bookingCode: "CIN-002",
    customerName: "Trần Thị Bình",
    movieTitle: "Biệt Đội Sao Băng",
    ticketCount: 4,
    pricePerTicket: 90000,
    totalAmount: 349920,
  },
  {
    bookingCode: "CIN-003",
    customerName: "Lê Minh Châu",
    movieTitle: "Mùa Hè Rực Lửa",
    ticketCount: 6,
    pricePerTicket: 110000,
    totalAmount: 641520,
  },
];

// Hàm validate mã
const validateBookingCode = (code) => {
  if (!code || code.trim() === "") {
    return false;
  }
  const isDuplicate = bookings.some(
    (b) => b.bookingCode.toUpperCase() === code.trim().toUpperCase()
  );
  return !isDuplicate;
};

// Hàm tìm kiếm mã trong danh sách
const findBookingIndex = (code) => {
  if (!code) return -1;
  return bookings.findIndex(
    (b) => b.bookingCode.toUpperCase() === code.trim().toUpperCase()
  );
};

// Hàm Yêu cầu nhập đến khi được số nguyên > 0
const inputPositiveInteger = (message) => {
  while (true) {
    const input = prompt(message);
    if (input === null) {
      return null;
    }
    const value = Number(input);
    if (Number.isInteger(value) && value > 0) {
      return value;
    }
    alert("Vui lòng nhập một số nguyên lớn hơn 0!");
  }
};

// Hàm tính toán tổng số tiền
const calculateTotal = (ticketCount, pricePerTicket) => {
  return Math.round(ticketCount * pricePerTicket * 1.08);
};

// Hàm hiển thị danh sách
const displayBookings = (bookings) => {
  // Kiểm tra danh sách trống
  if (bookings.length === 0) {
    console.log("Danh sách đơn đặt vé trống");
    return;
  }

  //    Duyệt mảng
  //    1. CIN-001 - Nguyễn Văn An - Ánh Trăng Cuối Phố
  //     SL: 2 | Giá: 90000 | Tổng TT: 194400
  //    Tổng: 3 đơn đặt vé – Doanh thu: 1185840

  let total = 0;
  for (let i = 0; i < bookings.length; i++) {
    // In ra thông tin
    console.log(
      `${i + 1}. ${bookings[i].bookingCode} - ${bookings[i].customerName} - ${bookings[i].movieTitle}
         SL: ${bookings[i].ticketCount} | Giá: ${bookings[i].pricePerTicket} | Tổng TT: ${bookings[i].totalAmount}
      `,
    );

    // Cộng dồn tiền
    total += bookings[i].totalAmount;
    // Lần 1: total = 0 + 194400
    // Lần 2: total = 194400 + 349920
  }

  //    Tin ra tổng vé kèm theo tổng tiền
  console.log(`Tổng vé: ${bookings.length} - Doanh thu: ${total}`);
};

// Hàm thêm mới
const handleCreateBooking = () => {
  const code = prompt("Nhập mã đặt vé (ví dụ: CIN-004):");
  if (!validateBookingCode(code)) {
    alert("Mã đặt vé không hợp lệ hoặc đã tồn tại!");
    return;
  }

  const customerName = prompt("Nhập tên khách hàng:");
  if (!customerName || customerName.trim() === "") {
    alert("Tên khách hàng không được để trống!");
    return;
  }

  const movieTitle = prompt("Nhập tên phim:");
  if (!movieTitle || movieTitle.trim() === "") {
    alert("Tên phim không được để trống!");
    return;
  }

  const ticketCount = inputPositiveInteger("Nhập số lượng vé (số nguyên > 0):");
  if (ticketCount === null) return;

  const pricePerTicket = inputPositiveInteger("Nhập giá mỗi vé (VNĐ):");
  if (pricePerTicket === null) return;

  const totalAmount = calculateTotal(ticketCount, pricePerTicket);

  bookings.push({
    bookingCode: code.trim().toUpperCase(),
    customerName: customerName.trim(),
    movieTitle: movieTitle.trim(),
    ticketCount: ticketCount,
    pricePerTicket: pricePerTicket,
    totalAmount: totalAmount,
  });

  console.log("Thêm đơn đặt vé mới thành công!");
};

// Hàm cập nhật
const handleUpdateBooking = () => {
  const code = prompt("Nhập mã đặt vé cần cập nhật:");
  const index = findBookingIndex(code);

  if (index === -1) {
    alert("Không tìm thấy mã đơn đặt vé!");
    return;
  }

  const newCustomerName = prompt("Nhập tên khách hàng mới (để trống nếu giữ nguyên):");
  const newMovieTitle = prompt("Nhập tên phim mới (để trống nếu giữ nguyên):");
  const newTicketCountInput = prompt("Nhập số vé mới (để trống nếu giữ nguyên):");

  if (newCustomerName && newCustomerName.trim() !== "") {
    bookings[index].customerName = newCustomerName.trim();
  }

  if (newMovieTitle && newMovieTitle.trim() !== "") {
    bookings[index].movieTitle = newMovieTitle.trim();
  }

  if (newTicketCountInput && newTicketCountInput.trim() !== "") {
    const newTicketCount = Number(newTicketCountInput);
    if (Number.isInteger(newTicketCount) && newTicketCount > 0) {
      bookings[index].ticketCount = newTicketCount;
      bookings[index].totalAmount = calculateTotal(
        bookings[index].ticketCount,
        bookings[index].pricePerTicket
      );
    } else {
      alert("Số vé nhập không hợp lệ, giữ nguyên giá trị cũ.");
    }
  }

  console.log("Cập nhật đơn đặt vé thành công!");
};

// Hàm xóa
const handleDeleteBooking = () => {
  const code = prompt("Nhập mã đơn đặt vé cần xóa:");
  const index = findBookingIndex(code);

  if (index === -1) {
    alert("Không tìm thấy mã đặt vé cần xóa!");
    return;
  }

  bookings.splice(index, 1);
  console.log(`Đã xóa đơn đặt vé ${code.trim().toUpperCase()} thành công!`);
};

// Hàm tìm kiếm
const handleSearchBooking = () => {
  const keyword = prompt("Nhập tên phim cần tìm kiếm:");
  if (!keyword || keyword.trim() === "") {
    alert("Vui lòng nhập từ khóa tìm kiếm!");
    return;
  }

  const results = bookings.filter((b) =>
    b.movieTitle.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  if (results.length === 0) {
    console.log(`Không tìm thấy đơn đặt vé nào cho phim "${keyword}".`);
    return;
  }

  console.log(`=== KẾT QUẢ TÌM KIẾM THEO PHIM: "${keyword}" ===`);
  displayBookings(results);
};

// Hàm chạy chương trình
const runCinemaSystem = () => {
  let choice;
  do {
    choice = +prompt(`
        ===========================================
            HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
        ===========================================
        1. Hiển thị danh sách đơn đặt vé
        2. Thêm đơn đặt vé mới
        3. Cập nhật đơn đặt vé
        4. Xóa đơn đặt vé
        5. Tìm kiếm đơn đặt vé theo tên phim
        0. Thoát chương trình
        ===========================================
        Vui lòng nhập lựa chọn của bạn (0 - 5):
    
    `);

    switch (choice) {
      case 1:
        displayBookings(bookings);
        break;

      case 2:
        handleCreateBooking();
        break;

      case 3:
        handleUpdateBooking();
        break;

      case 4:
        handleDeleteBooking();
        break;

      case 5:
        handleSearchBooking();
        break;

      case 0:
        console.log("0. Thoát chương trình");

        break;

      default:
        alert("Lựa chọn không hợp lệ.");
        break;
    }
  } while (choice !== 0);
};

runCinemaSystem();