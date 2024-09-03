// import React, { useState, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
// import { FaBell } from 'react-icons/fa';

// const Notifications = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const { t } = useTranslation();

//   useEffect(() => {
//     // هنا يمكنك جلب الإشعارات من الخادم
//     // هذا مجرد مثال
//     setNotifications([
//       { id: 1, message: t('notificationUpdateDoc') },
//       { id: 2, message: t('notificationNewFeature') },
//     ]);
//   }, [t]);

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="fixed bottom-4 right-4 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition duration-300"
//         aria-label={t('toggleNotifications')}
//       >
//         <FaBell size={24} />
//         {notifications.length > 0 && (
//           <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white w-5 h-5 flex items-center justify-center rounded-full">
//             {notifications.length}
//           </span>
//         )}
//       </button>
//       {isOpen && (
//         <div className="fixed bottom-16 right-4 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 max-h-80 overflow-y-auto">
//           <h3 className="text-lg font-semibold mb-2 dark:text-white">{t('notifications')}</h3>
//           {notifications.length > 0 ? (
//             <ul className="space-y-2">
//               {notifications.map((notification) => (
//                 <li key={notification.id} className="text-sm dark:text-gray-200">
//                   {notification.message}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-sm text-gray-500 dark:text-gray-400">{t('noNotifications')}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default React.memo(Notifications);