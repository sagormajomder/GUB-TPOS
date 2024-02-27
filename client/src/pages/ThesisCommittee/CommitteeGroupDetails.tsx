import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchGroup } from "../../features/thesis-committees/thesisCommitteeSlice";
import { AccountLayout } from "../../layouts/AccountLayout";
import { GroupDetails } from "../../features/thesis-committees/components/GroupDetails/GroupDetails";

export const CommitteeGroupDetails = () => {
    const { groupId } = useParams();
    const dispatch = useAppDispatch();
    const { group } = useAppSelector(x => x.committees);


    useEffect(() => {
        if (groupId) {
            dispatch(fetchGroup(groupId))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <>
                {group && (
                    <GroupDetails group={group} />
                )}
            </>
        </AccountLayout>
    )
}