import React from 'react';
import {
    Box,
} from '@chakra-ui/react';
import { GroupDto } from '../../../common/dtos';
import GroupList from '../GroupList';

interface GroupDetailsProps {
    group: GroupDto;
}

const GroupDetails: React.FC<GroupDetailsProps> = ({ group }) => {
    return (
        <>
            <GroupList groups={[group]}/>
        </>
    );
};

export default GroupDetails;





