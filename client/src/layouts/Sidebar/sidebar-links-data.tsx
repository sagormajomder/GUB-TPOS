import { FaCalendar, FaPhone, FaTeamspeak, FaUser, FaUsers } from 'react-icons/fa'
import { MdChecklist, MdNote, MdNotificationsActive } from 'react-icons/md'
import { IconType } from "react-icons";
import { HiChat, HiPhone } from 'react-icons/hi';

export interface Link {
    href: string
    title: string
    icon: IconType,
    children?: Link[]
}

export const studentLinks: Link[] = [
    {
        href: '/account/profile',
        title: 'Profile',
        icon: FaUser,
    },
    {
        href: '/student/group-request',
        title: 'Group Request',
        icon: FaUsers,
    },
    {
        href: '/student/group-informations',
        title: 'Group Informations',
        icon: FaTeamspeak,
    },
    {
        href: '/student/tasks',
        title: 'Todo of the week',
        icon: MdChecklist,
    },
    {
        href: '/student/chats',
        title: 'Chat with Supervisor',
        icon: HiChat,
    },
    {
        href: '/account/notifications',
        title: 'Notifications',
        icon: MdNotificationsActive,
    },
    {
        href: '/student/notices',
        title: 'Notices',
        icon: MdNotificationsActive,
    }
]

export const supervisorLinks: Link[] = [
    {
        href: '/account/profile',
        title: 'Profile',
        icon: FaUser,
    },
    {
        href: '/supervisor/groups',
        title: 'Groups Information',
        icon: FaUsers,
    },
    {
        href: '/supervisor/group-requests',
        title: 'Group Requests',
        icon: FaUsers,
    },
    {
        href: '/supervisor/group-tasks',
        title: 'Tasks',
        icon: MdNote,
    },
    {
        href: '/supervisor/group-chats',
        title: 'Chats',
        icon: HiChat,
    },
    {
        href: '/supervisor/contact-committee',
        title: 'Contact With Committee',
        icon: HiPhone,
    },
    {
        href: '/account/notifications',
        title: 'Notifications',
        icon: MdNotificationsActive,
    },
    {
        href: '/supervisor/notices',
        title: 'Notices',
        icon: MdNotificationsActive,
    }
]

export const thesisCommitteeLinks: Link[] = [
    {
        href: '/account/profile',
        title: 'Profile',
        icon: FaUser,
    },
    {
        href: '/committee/supervisors',
        title: 'Supervisors',
        icon: FaUsers,
    },
    {
        href: '/committee/board-members',
        title: 'Board Members',
        icon: FaUsers,
    },
    {
        href: '/committee/groups',
        title: 'Groups',
        icon: MdNote,
    },
    {
        href: '/committee/group-requests',
        title: 'Pending Groups',
        icon: HiChat,
    },
    {
        href: '/committee/contact-supervisor',
        title: 'Contact With Supervisor',
        icon: HiPhone,
    },
    {
        href: '/committee/contact-board',
        title: 'Contact With Board',
        icon: HiPhone,
    },
    {
        href: '/account/notifications',
        title: 'Notifications',
        icon: MdNotificationsActive,
    },
    {
        href: '/committee/notices',
        title: 'Notices',
        icon: FaCalendar,
    }
]

export const boardMemberLinks: Link[] = [
    {
        href: '/account/profile',
        title: 'Profile',
        icon: FaUser,
    },
    {
        href: '/board/info',
        title: 'Board Information',
        icon: FaUsers,
    },
    {
        href: '/board/groups',
        title: 'Groups',
        icon: FaUsers,
    },
    {
        href: '/board/contact-committee',
        title: 'Contact With Committee',
        icon: FaPhone,
    },
    {
        href: '/account/notifications',
        title: 'Notices',
        icon: MdNotificationsActive,
    },
    {
        href: '/board/notices',
        title: 'Notices',
        icon: MdNotificationsActive,
    }
]


