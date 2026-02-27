import React from "react";
import useDutyStore from "./../../store/useDutyStore";
import { UsersRound, Clock } from "lucide-react";
import { Icon } from "./../../../node_modules/leaflet/src/layer/marker/Icon";

const PersonList = () => {
  // ทุกอย่างที่อยู่ใน store เอามาหมด
  // const dutyStore = useDutyStore();
  // console.log('dasd', dutyStore);
  // DutyStores

  //เอาข้อมูล พนักงาน ออกมาใช้
  const personnel = useDutyStore((state) => state.personnel);

  // ฟังก์ชันเริ่มต้นการลาก
  const onDragStart = (e, personId) => {
    // คำสั่งในการลากข้อมูล แล้วจะนำไปฝากไว้ที่ตัวแปร dataTransfer
    // setData สั่งให้ฝากข้อมูลอะไรไป
    e.dataTransfer.setData("text/plain", personId);
  };
  return (
    // overflow-y-auto ให้เลื่อนขึ้นลงได้
    <div className="w-80 bg-white overflow-y-auto ">
      <div className="p-6 border-b border-gray-300">
        <div className="flex items-center gap-3 mb-1">
          {/* ใส่flex เพื่อให้รายชื่อกับไอคอนอยู่บรรทัดเดียวกันในแนวนอน*/}
          <UsersRound className="text-yellow-500" size={26} />
          <h2 className="text-2xl font-bold text-gray-700">
            รายชื่อเจ้าหน้าที่
          </h2>
        </div>
        <p className="text-base text-gray-500">ลากไปยังจุด</p>
      </div>
      {/* เพิ่มmargin top ให้กับสมาชิกทุกตัวในdivยกเว้นตัวแรก yบนล่าง xขวาซ้าย*/}
      <div className="p-4 space-y-2">
        {personnel.map((item) => {
          return (
            <div
              key={item.id}
              // เปิดคุณสมบัติพิ ให้ลากได้
              draggable={true}
              // เริ่มลากให้ทำอะไร ให้ส่งe ไป้และ id ของคนนี้ไปที่ฟังก์ชันแล้วฝากไว้
              //  ใช้ได้จะต้องมี draggable ก่อน แล้วก็ใส่ฟังก์ชันนี้ว่าจะทำอะไร
              // เมื่อคุณส่ง e เข้าไป onDragStart ใช้คำสั่ง e.dataTransfer เพื่อหย่อน item.id ลงไปในกระเป๋าใบนี้
              // e เป็นการบอกว่ากำลังถือ id คนนี้ติดไปอยู่ แล้วพอเราเอาไปปล่อยที่อื่น เราก็จะเอา id คนนี้ไปใช้ต่อได้
              onDragStart={(e) => onDragStart(e, item.id)}  
              className="flex items-center gap-3 p-3 bg-amber-100 
              border border-amber-400 rounded-lg cursor-move hover:shadow-sm hover:scale-101"
            >
              <div className="text-2xl">{item.avatar}</div>
              <div className="flex-1">
                <div className="font-semibold text-gray-600">{item.name}</div>
                <div className="font-xs text-gray-500">{item.position}</div>
              </div>
              <div className="text-gray-500">
                <Clock />
              </div>
            </div>
          );
        })}
        {/* ข้างในกรอบฟ้า */}
      </div>
    </div>
  );
};

export default PersonList;
