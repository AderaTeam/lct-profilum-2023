import {
  ASSISTANT_ROUTE,
  COMMUNITY_ROUTE,
  EDUCATIONS_ROUTE,
  LOGIN_ROUTE,
  MAGE_ROUTE,
  MY_PATH_ROUTE,
  MY_SOCIALS_ROUTE,
  NO_PAGE_ROUTE,
  PROFILE_ROUTE,
  REGISTRATION_ROUTE,
  TRAINING_ROUTE,
} from 'shared/constants/const';
import { lazy } from 'react';
import {
  IconChessRook,
  IconMessageChatbot,
  IconMessages,
  IconRoute,
  IconSchool,
} from '@tabler/icons-react';

const auth = lazy(() => import('pages/auth'));
const myPath = lazy(() => import('pages/my-path'));
const community = lazy(() => import('pages/community'));
const educations = lazy(() => import('pages/educations'));
const assistant = lazy(() => import('pages/assistant'));
const training = lazy(() => import('pages/training'));
const profile = lazy(() => import('pages/profile'));
const mySocials = lazy(() => import('pages/my-socials'));
const mage = lazy(() => import('pages/mage'));
const noPage = lazy(() => import('pages/no-page'));

export const authRoutes = [
  {
    path: MY_PATH_ROUTE,
    Component: myPath,
    title: 'Мой путь',
    isAdmin: true,
    icon: IconRoute,
  },
  {
    path: COMMUNITY_ROUTE,
    Component: community,
    title: 'Сообщества',
    isAdmin: true,
    icon: IconMessages,
  },
  {
    path: TRAINING_ROUTE,
    Component: training,
    title: 'Тренажер',
    isAdmin: true,
    icon: IconChessRook,
  },
  {
    path: EDUCATIONS_ROUTE,
    Component: educations,
    title: 'Уч. заведения',
    isAdmin: true,
    icon: IconSchool,
  },
  {
    path: ASSISTANT_ROUTE,
    Component: assistant,
    title: 'Ассистент',
    isAdmin: true,
    icon: IconMessageChatbot,
  },
  {
    path: PROFILE_ROUTE,
    Component: profile,
    title: 'Профиль',
    isAdmin: true,
    isHide: true,
  },
  {
    path: MY_SOCIALS_ROUTE,
    Component: mySocials,
    title: 'Мои соц. сети',
    isAdmin: true,
    isHide: true,
  },
  {
    path: MAGE_ROUTE,
    Component: mage,
    title: 'Маг',
    isAdmin: true,
    isHide: true,
  },
  {
    path: NO_PAGE_ROUTE,
    Component: noPage,
    title: 'Пустая страница',
    isAdmin: true,
    isHide: true,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: auth,
    title: 'login',
  },
  {
    path: REGISTRATION_ROUTE,
    Component: auth,
    title: 'registration',
  },
];
