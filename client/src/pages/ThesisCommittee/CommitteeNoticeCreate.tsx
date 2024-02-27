import { useEffect } from "react";
import { Box, useToast } from "@chakra-ui/react";
import { AccountLayout } from "../../layouts/AccountLayout";
import CreateNoticeForm from "../../features/thesis-committees/components/CreateNoticeForm/CreateNoticeForm";
import { Notice } from "../../features/thesis-committees/thesisCommitteeSlice";
import { history } from "../../helpers";
import { useCreateNoticeMutation } from "../../features/common/api/committeesApi";
import { ErrorModel } from "../../features/common/models/ErrorModel";

export const CommitteeNoticeCreate = () => {
    const [createNotice, { data, isSuccess, isError, error }] = useCreateNoticeMutation();
    const toast = useToast();

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: 'Task created.',
                position: 'top-right',
                description: "Task successfully created!.",
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
            history.navigate('/committee/notices');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    const onCreateNotice = async (notice: Notice) => {
        await createNotice(notice);
    }

    useEffect(() => {
        if (error) {
            const errors = error.data.errors as ErrorModel[];
            errors.forEach(err => {
                toast({
                    title: 'Error!',
                    position: 'top-right',
                    description: err.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [error])

    return (
        <AccountLayout loading={false}>
            <Box maxW={{ base: 'xl', md: '4xl' }} mx="auto" px={{ base: '6', md: '8' }}>
                <CreateNoticeForm onCreateNotice={(notice) => onCreateNotice(notice)}/>
            </Box>
        </AccountLayout>
    )
}