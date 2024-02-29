import './App.css';
import { history } from "./helpers";
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Header } from './layouts/Header';
import { Footer } from './layouts/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { Notifications, Profile } from './pages/Account';
import { useEffect } from 'react';
import { useCurrentUserQuery } from './features/account/api/accountApi';
import { useAppDispatch, useAppSelector } from './store';
import { setUser } from './features/account/accountSlice';
import {
  StudentChats,
  StudentGroupInformations,
  StudentGroupRequest,
  StudentNotices,
  StudentTaskSubmission,
  StudentTasks
} from './pages/Student';
import {
  SupervisorCreateTask,
  SupervisorGroupRequests,
  SupervisorGroupTasks,
  SupervisorGroups,
  SupervisorGroupChats,
  SupervisorGroupDetails
} from './pages/Supervisor';
import { getUnreadNotifications } from './features/notifications/notificationSlice';
import { CommitteeBoardMemberCreate, CommitteeBoardMembers, CommitteeGroupRequests, CommitteeGroups, CommitteeNoticeCreate, CommitteeNotices, CommitteeSupervisorCreate, CommitteeSupervisors } from './pages/ThesisCommittee';
import { fetchLatestSemester } from './features/thesis-committees/thesisCommitteeSlice';
import { BoardSupervisors } from './pages/BoardMember/BoardSupervisors';
import { BoardMemberGroups } from './pages/BoardMember/BoardMemberGroups';
import { BoardNotices } from './pages/BoardMember/BoardNotices';
import { BoardMemberGroupDetails } from './pages/BoardMember/BoardMemberGroupDetails';
import { BoardInformation } from './pages/BoardMember/BoardInformation';
import { CommitteeGroupDetails } from './pages/ThesisCommittee/CommitteeGroupDetails';
import RegisterSupervisor from './pages/RegisterSupervisor';
import { CommitteeSupervisorContact } from './pages/ThesisCommittee/CommitteeSupervisorContact';
import { CommitteeBoardContact } from './pages/ThesisCommittee/CommitteeBoardContact';
import { SupervisorContactCommittee } from './pages/Supervisor/SupervisorContactCommittee';
import { BoardContactCommittee } from './pages/BoardMember/BoardContactCommittee';
import { SupervisorNotices } from './pages/Supervisor/SupervisorNotices';

function App() {
  // const theme = useTheme()
  // console.log(theme);
  // anywhere in the React app (inside or outside components)
  history.navigate = useNavigate();
  history.location = useLocation();
  const { data, error, isLoading } = useCurrentUserQuery({
    refetchOnWindowFocus: true,
  });

  const { user } = useAppSelector(x => x.account);

  const dispatch = useAppDispatch();

  useEffect(() => {
    // send the GetUser request
    if (data) {
      dispatch(setUser(data.currentUser));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if(user) {
      dispatch(getUnreadNotifications())
      dispatch(fetchLatestSemester());
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/supervisor" element={<RegisterSupervisor />} />
        <Route path="/register" element={<Register />} />

        {/* Should have access to all authenticated users */}
        <Route element={<ProtectedRoute isLoading={isLoading} roles={['Student', 'Supervisor', 'ThesisCommittee', 'BoardMember']} />}>
          <Route path="/account/profile" element={<Profile />} />
          <Route path="/account/notifications" element={<Notifications />} />
        </Route>

        {/* STUDENT ROUTE GROUPS */}
        <Route element={<ProtectedRoute isLoading={isLoading} roles={['Student']} />}>
          <Route path="/student/chats" element={<StudentChats />} />
          <Route path="/student/tasks" element={<StudentTasks />} />
          <Route path="/student/tasks/:id" element={<StudentTaskSubmission />} />
          <Route path="/student/group-request" element={<StudentGroupRequest />} />
          <Route path="/student/group-informations" element={<StudentGroupInformations />} />
          <Route path="/student/notices" element={<StudentNotices />} />
        </Route>

        {/* SUPERVISOR ROUTE GROUPS */}
        <Route element={<ProtectedRoute isLoading={isLoading} roles={['Supervisor']} />}>
          <Route path="/supervisor/create-task" element={<SupervisorCreateTask />} />
          <Route path="/supervisor/group-requests" element={<SupervisorGroupRequests />} />
          <Route path="/supervisor/groups/:groupId" element={<SupervisorGroupDetails />} />
          <Route path="/supervisor/groups" element={<SupervisorGroups />} />
          <Route path="/supervisor/group-tasks" element={<SupervisorGroupTasks />} />
          <Route path="/supervisor/group-chats" element={<SupervisorGroupChats />} />
          <Route path="/supervisor/contact-committee" element={<SupervisorContactCommittee />} />
          <Route path="/supervisor/notices" element={<SupervisorNotices />} />
        </Route>

        {/* THESIS COMMITTEE ROUTE GROUPS */}
        <Route element={<ProtectedRoute isLoading={isLoading} roles={['ThesisCommittee']} />}>
          <Route path="/committee/supervisors" element={<CommitteeSupervisors />} />
          <Route path="/committee/supervisor-create" element={<CommitteeSupervisorCreate />} />
          <Route path="/committee/supervisor-edit/:userId" element={<CommitteeSupervisorCreate />} />
          <Route path="/committee/board-members" element={<CommitteeBoardMembers />} />
          <Route path="/committee/board-member-create" element={<CommitteeBoardMemberCreate />} />
          <Route path="/committee/board-member-edit/:boardId" element={<CommitteeBoardMemberCreate />} />
          <Route path="/committee/notices" element={<CommitteeNotices />} />
          <Route path="/committee/notice-create" element={<CommitteeNoticeCreate />} />
          <Route path="/committee/group-requests" element={<CommitteeGroupRequests />} />
          <Route path="/committee/groups/:groupId" element={<CommitteeGroupDetails />} />
          <Route path="/committee/groups" element={<CommitteeGroups />} />
          <Route path="/committee/contact-supervisor" element={<CommitteeSupervisorContact />} />
          <Route path="/committee/contact-board" element={<CommitteeBoardContact />} />
        </Route>

          {/* BOARD MEMBER ROUTE GROUPS */}
          <Route element={<ProtectedRoute isLoading={isLoading} roles={['BoardMember']} />}>
          <Route path="/board/supervisors" element={<BoardSupervisors />} />
          <Route path="/board/info" element={<BoardInformation />} />
          <Route path="/board/notices" element={<BoardNotices />} />
          <Route path="/board/groups/:groupId" element={<BoardMemberGroupDetails />} />
          <Route path="/board/groups" element={<BoardMemberGroups />} />
          <Route path="/board/contact-committee" element={<BoardContactCommittee />} />
        </Route>

      </Routes>
      <Footer />
    </>
  );
}

export default App;
