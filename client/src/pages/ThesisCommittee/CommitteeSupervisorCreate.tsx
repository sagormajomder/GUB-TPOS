import { Box } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import { CreateSupervisorForm } from "../../features/thesis-committees/components/CreateSupervisorForm/CreateSupervisorForm";

export const CommitteeSupervisorCreate = () => {


    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <CreateSupervisorForm />
            </Box>
        </AccountLayout>
    )
}