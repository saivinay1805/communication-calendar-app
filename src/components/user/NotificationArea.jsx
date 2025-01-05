    // src/components/user/NotificationArea.jsx
    import React from 'react';
    import OverdueCommunicationsGrid from './OverdueCommunicationsGrid';
    import TodaysCommunicationsGrid from './TodaysCommunicationsGrid';
    import { add, isPast, isToday } from 'date-fns';


    const NotificationArea = ({ companies, communications }) => {

      const overdueCompanies = companies.filter(company => {
          const companyCommunications = communications.filter(log => log.companyId === company.id);
           const lastCommunication = companyCommunications.slice(-1)[0];
            if (!lastCommunication) {
                return false;
            }
            const lastCommunicationDate = new Date(lastCommunication.date);
            const [value, unit] = company.communicationPeriodicity.split(" ");
            const nextScheduledCommunication = add(lastCommunicationDate, { [unit]: parseInt(value) });
            return isPast(nextScheduledCommunication) && !isToday(nextScheduledCommunication)

        })
          const dueTodayCompanies = companies.filter(company => {
              const companyCommunications = communications.filter(log => log.companyId === company.id);
              const lastCommunication = companyCommunications.slice(-1)[0];
              if (!lastCommunication) {
                  return false;
              }
              const lastCommunicationDate = new Date(lastCommunication.date);
              const [value, unit] = company.communicationPeriodicity.split(" ");
              const nextScheduledCommunication = add(lastCommunicationDate, { [unit]: parseInt(value) });
              return isToday(nextScheduledCommunication);

          })
        const totalNotifications = overdueCompanies.length + dueTodayCompanies.length

      return (
          <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-2xl font-semibold">Notifications </h2>
                  {totalNotifications > 0 &&  <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs">{totalNotifications}</span>}
             </div>
          <div className="flex gap-5">
            <OverdueCommunicationsGrid companies={overdueCompanies} communications={communications} />
            <TodaysCommunicationsGrid companies={dueTodayCompanies} communications={communications}/>
          </div>
        </div>
      );
    };

    export default NotificationArea;