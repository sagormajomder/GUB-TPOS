import { useEffect } from "react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchBoardMember } from "../../features/board-members/boardMemberSlice";
import { BoardDetails } from "../../features/board-members/components/BoardDetails/BoardDetails";

export const BoardInformation = () => {
    const { boardMember } = useAppSelector(x => x.boards);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchBoardMember());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AccountLayout loading={false}>
            <>
            {boardMember && (
                <BoardDetails board={boardMember}/>
            )}
            </>
        </AccountLayout>
    )
}
