import {useEffect, useState} from 'react'
import { AccountLayout } from '../../layouts/AccountLayout';
import { ProfileForm } from '../../features/account/components/ProfileForm';

export const Profile = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // dispatch(closeMenu());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <ProfileForm/>
        </AccountLayout>
    )
}
