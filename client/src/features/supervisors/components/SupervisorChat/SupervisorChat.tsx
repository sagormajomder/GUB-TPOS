import React, { useState, useEffect, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Divider,
  Flex,
  Input,
  Select,
  Text,
} from '@chakra-ui/react';
import { ChatMessageDto } from '../../../common/dtos';

interface Group {
  _id: string;
  name: string;
}

interface ChatProps {
  groups: Group[];
  messages: ChatMessageDto[];
  selectedGroup?: string;
  onSelectGroup: (groupId: string) => void;
  onSendMessage: (message: string) => void;
}

const SupervisorChat: React.FC<ChatProps> = ({ groups, messages, selectedGroup, onSelectGroup, onSendMessage }) => {

  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <Box mx="auto" px={{ base: '6', md: '8' }}>
      <Flex>
        {/* Left side - Group Selector */}
        <Box flex="1" border="1px solid #ccc" padding="4">
          <Select
            placeholder="Select a group"
            value={selectedGroup}
            onChange={(e) => onSelectGroup(e.target.value)}
          >
            {groups.map((group) => (
              <option key={group._id} value={group._id}>
                {group.name}
              </option>
            ))}
          </Select>
        </Box>

        {/* Right side - Chat Interface */}
        <Box flex="2" border="1px solid #ccc" display="flex" flexDirection="column" minHeight="300px" padding="4" h="80vh" maxH="80vh">
          {selectedGroup ? (
            <Box flex="1" overflowY="auto">
              {messages.map((message, index) => (
                <Box key={index}>
                  <Text fontSize="sm" color="gray.500">
                    {message.user.name} - {message.timestamp.toLocaleString()}
                  </Text>
                  <Text>{message.content}</Text>
                </Box>
              ))}
            </Box>
          ) : (
            <Text>Select a group to start chatting</Text>
          )}

          {selectedGroup && (
            <Flex p="4" flex="none">
              <Input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value)}
              />
              <Button onClick={handleSendMessage} colorScheme="green">
                Send
              </Button>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default SupervisorChat;
