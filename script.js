const contextMenu = document.getElementById('contextMenu');
const display = document.getElementById('display');
const calculatorContainer = document.getElementById('calculator-container');
const calendarContainer = document.getElementById('calendar-container');
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let closeButton; // ตัวแปรสำหรับปุ่มปิดในปฏิทิน

// แสดงเมนูคลิกขวา
window.addEventListener('contextmenu', function(e) {
    e.preventDefault(); // ปิดเมนูคลิกขวาปกติ
    contextMenu.style.left = e.pageX + 'px';
    contextMenu.style.top = e.pageY + 'px';
    contextMenu.style.display = 'block'; // แสดงเมนูคลิกขวา
});

// ซ่อนเมนูคลิกขวาเมื่อคลิกที่อื่น
window.addEventListener('click', function() {
    contextMenu.style.display = 'none'; // ซ่อนเมนู
});

// ฟังก์ชันที่เรียกเมื่อคลิกที่รายการในเมนู
function customAction(action) {
    if (action === 'เครื่องคิดเลข') {
        showCalculator();
    } else if (action === 'ปฏิทิน') {
        createCalendar();
    } else if (action === 'นาฬิกา') {
        showClock();
    }
    contextMenu.style.display = 'none'; // ซ่อนเมนู
}

// ฟังก์ชันสำหรับเครื่องคิดเลข
function showCalculator() {
    calculatorContainer.style.display = 'block'; // แสดงเครื่องคิดเลข
    clearDisplay(); // เคลียร์ค่าจอแสดงผล
}

function closeCalculator() {
    calculatorContainer.style.display = 'none'; // ซ่อนเครื่องคิดเลข
    clearDisplay(); // เคลียร์ค่าจอแสดงผลเมื่อปิด
}

function appendToDisplay(value) {
    display.value += value; // เพิ่มค่าไปที่จอแสดงผล
}

function calculateResult() {
    try {
        display.value = eval(display.value); // คำนวณผลลัพธ์
    } catch {
        display.value = 'Error'; // ถ้ามีข้อผิดพลาด
    }
}

function clearDisplay() {
    display.value = ''; // เคลียร์จอแสดงผล
}

// ฟังก์ชันสำหรับปฏิทิน
function createCalendar() {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = ''; // ล้างเนื้อหาก่อน

    // สร้างส่วนหัวสำหรับเดือนและปี
    const header = document.createElement('div');
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.marginBottom = '10px';

    const monthYearDisplay = document.createElement('div');
    monthYearDisplay.textContent = `${getMonthName(currentMonth)} ${currentYear}`;
    header.appendChild(monthYearDisplay);

    // ปุ่มเปลี่ยนเดือน
    const prevButton = document.createElement('button');
    prevButton.textContent = '<';
    prevButton.onclick = () => changeMonth(-1);
    header.appendChild(prevButton);

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.onclick = () => changeMonth(1);
    header.appendChild(nextButton);

    calendar.appendChild(header);

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    // สร้างชื่อวัน
    const weekdays = ['อา', 'จ', 'อ', 'อ', 'พ', 'พฤ', 'ศ'];
    weekdays.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    });

    // สร้างช่องว่างก่อนวันที่ 1
    for (let i = 0; i < firstDay.getDay(); i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }

    // สร้างวันที่ในเดือน
    for (let i = 1; i <= daysInMonth; i++) {
        const dayElement = document.createElement('div');
        dayElement.textContent = i;
        dayElement.classList.add('day');
        calendar.appendChild(dayElement);
    }

    // เพิ่มปุ่มปิดเพียงครั้งเดียว
    if (!closeButton) {
        closeButton = document.createElement('button');
        closeButton.textContent = 'ปิด';
        closeButton.onclick = closeCalendar;
        calendarContainer.appendChild(closeButton); // เพิ่มปุ่มปิดไปยังปฏิทิน
    }

    calendarContainer.style.display = 'block'; // แสดงปฏิทิน
}

// ฟังก์ชันเปลี่ยนเดือน
function changeMonth(direction) {
    currentMonth += direction;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    } else if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(); // สร้างปฏิทินใหม่
}

// ฟังก์ชันเพื่อแปลงหมายเลขเดือนเป็นชื่อเดือน
function getMonthName(monthIndex) {
    const monthNames = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
                        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
    return monthNames[monthIndex];
}

// ฟังก์ชันปิดปฏิทิน
function closeCalendar() {
    const calendarContainer = document.getElementById('calendar-container');
    calendarContainer.style.display = 'none'; // ซ่อนปฏิทิน
}

// ฟังก์ชันเปิดนาฬิกา
function showClock() {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.style.display = 'block';
    updateClock(); // เรียกฟังก์ชันอัปเดตนาฬิกา
    setInterval(updateClock, 1000); // อัปเดตทุกวินาที
}

// ฟังก์ชันอัปเดตนาฬิกา
function updateClock() {
    const clockDisplay = document.getElementById('clock-display');
    const now = new Date();
    clockDisplay.textContent = now.toLocaleTimeString(); // แสดงเวลาปัจจุบัน
}

// ฟังก์ชันปิดนาฬิกา
function closeClock() {
    const clockContainer = document.getElementById('clock-container');
    clockContainer.style.display = 'none';
}
