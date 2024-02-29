import { Box } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { CreateBoardMemberForm } from "../../features/thesis-committees/components/CreateBoardMemberForm";

export const CommitteeBoardMemberCreate = () => {


    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <CreateBoardMemberForm />
            </Box>
        </AccountLayout>
    )
}