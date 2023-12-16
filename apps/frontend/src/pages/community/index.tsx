import MainWrapper from 'shared/components/Wrappers/MainWrapper';
import { IEvents } from 'shared/models/IEvents';
import { CommunityEventsList } from 'widgets/community-events-list';

const CommunityPage = () => {
  const data: IEvents[] = [
    {
      title: 'Роман закончил Шаг 3 “Основы типографики”',
      author: {
        username: 'Роман Соколов',
        nickname: '@romai',
        avataruri: '',
      },
      status: 'up',
      date: '21.10.2023',
    },
  ];

  return (
    <MainWrapper>
      <CommunityEventsList events={data} />
      <></>
    </MainWrapper>
  );
};

export default CommunityPage;
