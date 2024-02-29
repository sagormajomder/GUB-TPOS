import express from 'express';
import { currentUser } from '../middlewares/current-user';
import { CurrentUser, Login, Logout, Register, RegisterSupervisor, SupervisorList, UpdateProfile } from '../controllers/account-controller';

const router = express.Router();

router.get('/current-user', currentUser, CurrentUser);

router.post('/login',Login);

router.post('/register/supervisor',RegisterSupervisor);

router.post('/register',Register);

router.put('/update-profile',UpdateProfile);

router.post('/logout', Logout);

router.get('/supervisors', SupervisorList);

export default router;